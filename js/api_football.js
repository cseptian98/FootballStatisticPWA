const base_url = 'https://api.football-data.org/v2/';
const token = 'YOUR_API_KEY';
const inggris = 2021;
const perancis = 2015;

const premier_standing = `${base_url}competitions/${inggris}/standings`;
const ligue_standing = `${base_url}competitions/${perancis}/standings`;
const team_detail = `${base_url}teams/`;

const fetchApi = (url) => {
   return fetch(url, {
      method: 'get',
      mode: 'cors',
      headers: {
         'X-Auth-Token': token,
      },
   })
      .then(status)
      .then(json)
      .catch(error);
};

function status(response) {
   if (response.status !== 200) {
      console.log('Error : ' + response.status);
      return Promise.reject(new Error(response.statusText));
   } else {
      return Promise.resolve(response);
   }
}

function json(response) {
   return response.json();
}

function error(error) {
   console.log('Error : ' + error);
}

function getStandings(league) {
   showLoader();
   if ('caches' in window) {
      caches.match(league).then((response) => {
         if (response) {
            response.json().then((data) => {
               showStandings(data);
            });
         }
      });
   }

   fetchApi(league).then((data) => {
      showStandings(data);
   });
}

function showStandings(data) {
   hideLoader();
   var standingsHTML = '';
   data.standings[0].table.forEach((dt) => {
      standingsHTML += `
                <td width="10%" class="center">${dt.position}</td>
                <td><a href="team.html?id=${dt.team.id}"><img src="${dt.team.crestUrl}" onError="this.onerror=null;this.src='/images/default.png';" class="responsive-img" style="margin: 0 15px -3px 0; width:40px; height:40px">${dt.team.name}</a></td>
                <td>${dt.playedGames}</td>
                <td>${dt.won}</td>
                <td>${dt.draw}</td>
                <td>${dt.lost}</td>
                <td>${dt.goalDifference}</td>
                <td><b>${dt.points}</b></td>
              </tr>
          `;
   });
   document.getElementById('standings').innerHTML = standingsHTML;
}

function getTeam(team) {
   showLoader();
   if ('caches' in window) {
      caches.match(team).then((response) => {
         if (response) {
            response.json().then((data) => {
               showTeam(data);
               buttonAction(data);
            });
         }
      });
   }

   fetchApi(team).then((data) => {
      showTeam(data);
      buttonAction(data);
   });
}

function showTeam(data) {
   hideLoader();
   var teamHTML = '';

   teamHTML += `<img src=${data.crestUrl.replace(
      /^http:\/\//i,
      'https://'
   )} onError="this.onerror=null;this.src='/images/default.png';" width="180" height="180" class="responsive-img center"><br>
                  <h5>${data.name}</h5>
                  <center>
                  <button class="btn red waves-effect waves-light" id="btnDelete"><i class="material-icons left">delete</i>Delete from favorite</button>
                  <button class="btn indigo waves-effect waves-light" id="btnSave"><i class="material-icons left">add</i>Add to favorite</button>
                  </center>
                  <br>
                <br> `;

   teamHTML += `
        <table class="responsive-table highlight" width=500>
            <thead class="indigo lighten-4">
                <tr>
                    <td>Name</td>
                    <td>Position</td>
                    <td>Nationality</td>
                </tr>
            </thead>
        <tbody>`;

   data.squad.forEach((dt) => {
      teamHTML += `
              <tr>
                <td>${dt.name}</td>
                <td>${dt.position}</td>
                <td>${dt.nationality}</td>
              </tr>
          `;
   });

   teamHTML += `</tbody></table>`;

   document.getElementById('teamDetail').innerHTML = teamHTML;
}

function getFavoriteTeam() {
   var dbData = getFavData();
   dbData.then((data) => {
      var timBodyHtml = '';
      if (data.length > 0) {
         data.forEach((team) => {
            timBodyHtml += `
            <div>
              <a href="team.html?id=${team.id}"><b>${team.name}</b></a><br>
              <img src=${team.crestUrl.replace(
                 /^http:\/\//i,
                 'https://'
              )} alt="" class="responsive-img" width="220">
            </div>
            <br><br>`;
         });
      } else {
         timBodyHtml = '<h6>Tidak ada Tim Favorite yang ditambahkan</h6>';
      }
      document.getElementById('favoriteBody').innerHTML = timBodyHtml;
   });
}

function buttonAction(data) {
   let btnSave = document.getElementById('btnSave');
   let btnDelete = document.getElementById('btnDelete');

   btnSave.onclick = () => {
      addFavorite(data);
      btnSave.style.display = 'none';
      btnDelete.style.display = 'block';
   };

   btnDelete.onclick = () => {
      deleteFavorite(data);
      btnSave.style.display = 'block';
      btnDelete.style.display = 'none';
   };

   checkData(data.id)
      .then(() => {
         btnSave.style.display = 'none';
         btnDelete.style.display = 'block';
      })
      .catch(() => {
         btnSave.style.display = 'block';
         btnDelete.style.display = 'none';
      });
}

function showLoader() {
   var loader = `<div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-blue-only" >
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div> <div class="gap-patch">
        <div class="circle"></div>
      </div> <div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>`;

   document.getElementById('loader').innerHTML = loader;
}

function hideLoader() {
   document.getElementById('loader').innerHTML = '';
}

import {
  addFavorite,
  deleteFavorite,
  checkData,
  getFavData,
} from "./db_football";

const base_url = "https://api.football-data.org/v2/";
const token = "5652e38754df4fe5ae30adf26099d344";
const inggris = 2021;
const perancis = 2015;

const premier_standing = `${base_url}competitions/${inggris}/standings`;
const ligue_standing = `${base_url}competitions/${perancis}/standings`;
const team_detail = `${base_url}teams/`;

const fetchApi = (url) => {
  return fetch(url, {
    method: "get",
    mode: "cors",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .then(status)
    .then(json)
    .catch(error);
};

const status = (response) => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
};

const json = (response) => {
  return response.json();
};

const error = (error) => {
  console.log("Error : " + error);
};

const getStandings = (league) => {
  console.log("url", league);
  showLoader();
  if ("caches" in window) {
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
};

const showStandings = (data) => {
  let standingsHTML = "";
  data.standings[0].table.forEach((dt) => {
    standingsHTML += `
      <tr>
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
  document.getElementById("standings").innerHTML = standingsHTML;
};

const getTeam = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  const team = `${team_detail}${idParam}`;

  showLoader();
  if (idParam !== null) {
    if ("caches" in window) {
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
};

const showTeam = (data) => {
  let teamHTML = "";

  teamHTML += `<img src=${data.crestUrl.replace(/^http:\/\//i, "https://")} 
   onError="this.onerror=null;this.src='/images/default.png';" 
   width="180" height="180" class="responsive-img center">
   <br>
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

  data.squad.forEach((player) => {
    teamHTML += `
      <tr>
         <td>${player.name}</td>
         <td>${player.position}</td>
         <td>${player.nationality}</td>
      </tr>
      `;
  });

  teamHTML += "</tbody></table>";

  document.getElementById("team-detail").innerHTML = teamHTML;
};

const getFavoriteTeam = () => {
  const dbData = getFavData();
  dbData.then((data) => {
    let timBodyHtml = "";
    if (data.length > 0) {
      data.forEach((team) => {
        timBodyHtml += `
            <div>
              <a href="team.html?id=${team.id}"><b>${team.name}</b></a><br>
              <img src=${team.crestUrl.replace(
                /^http:\/\//i,
                "https://"
              )} alt="" class="responsive-img" width="220">
            </div>
            <br><br>`;
      });
    } else {
      timBodyHtml = "<h6>Tidak ada Tim Favorite yang ditambahkan</h6>";
    }
    document.getElementById("favoriteBody").innerHTML = timBodyHtml;
  });
};

const buttonAction = (data) => {
  let btnSave = document.getElementById("btnSave");
  let btnDelete = document.getElementById("btnDelete");

  btnSave.onclick = () => {
    addFavorite(data);
    btnSave.style.display = "none";
    btnDelete.style.display = "block";
  };

  btnDelete.onclick = () => {
    deleteFavorite(data);
    btnSave.style.display = "block";
    btnDelete.style.display = "none";
  };

  checkData(data.id)
    .then(() => {
      btnSave.style.display = "none";
      btnDelete.style.display = "block";
    })
    .catch(() => {
      btnSave.style.display = "block";
      btnDelete.style.display = "none";
    });
};

const showLoader = () => {
  const loader = `<div class="preloader-wrapper big active">
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

  document.getElementById("loader").innerHTML = loader;
};

const hideLoader = () => {
  document.getElementById("loader").innerHTML = "";
};

export {
  getTeam,
  getStandings,
  getFavoriteTeam,
  premier_standing,
  ligue_standing,
};

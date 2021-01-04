class GetTeam extends HTMLElement {
   set teams(team) {
      this._teams = team;
      this.render();
   }

   render() {
      this.innerHTML = `
      let teamHTML = '';

      teamHTML += '<img src=${this._teams.crestUrl.replace(
         /^http:\/\//i,
         'https://'
      )} onError="this.onerror=null;this.src='/images/default.png';" width="180" height="180" class="responsive-img center"><br>
                   <h5>${this._teams.name}</h5>
                   <center>
                   <button class="btn red waves-effect waves-light" id="btnDelete"><i class="material-icons left">delete</i>Delete from favorite</button>
                   <button class="btn indigo waves-effect waves-light" id="btnSave"><i class="material-icons left">add</i>Add to favorite</button>
                   </center>
                   <br>
                 <br> ';

      teamHTML += '
         <table class="responsive-table highlight" width=500>
             <thead class="indigo lighten-4">
                 <tr>
                     <td>Name</td>
                     <td>Position</td>
                     <td>Nationality</td>
                 </tr>
             </thead>
         <tbody>';

      this._teams.squad.forEach((player) => {
         teamHTML += '
               <tr>
                 <td>${player.name}</td>
                 <td>${player.position}</td>
                 <td>${player.nationality}</td>
               </tr>
           ';
      });

      teamHTML += '</tbody></table>';
      `;
   }
}

customElements('get-team', GetTeam);

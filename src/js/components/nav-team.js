class NavTeam extends HTMLElement {
   connectedCallback() {
      this.render();
   }

   render() {
      this.innerHTML = `
        <div class="navbar-fixed">
         <nav class="indigo" role="navigation">
            <div class="nav-wrapper container">
               <a href="./" class="brand-logo" id="logo-container"
                  >Footballers</a
               >
            </div>
         </nav>
        </div>
        `;
   }
}

customElements.define('nav-team', NavTeam);

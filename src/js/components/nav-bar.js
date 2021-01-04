class NavBar extends HTMLElement {
   connectedCallback() {
      this.render();
   }

   render() {
      this.innerHTML = `
        <nav class="blue darken-3" role="navigation">
            <div class="nav-wrapper container">
            <a id="logo-container" href="#" class="brand-logo">
                <img class="materialboxed" width="100" src="" alt="logo">
            </a>
            <a href="#" data-target="nav-mobile" class="sidenav-trigger">&#9776;</a>
               <ul class="topnav right hide-on-med-and-down"></ul>
               <ul id="nav-mobile" class="sidenav"></ul>
            </div>
        </nav>
        `;
   }
}

customElements.define('nav-bar', NavBar);

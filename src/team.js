import 'regenerator-runtime';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.js';
import './css/style.css';
import './js/register-push';
import './js/components/nav-team';
import { getTeam } from './js/api_football';
import './js/db_football';

document.addEventListener('DOMContentLoaded', function () {
   getTeam();
});

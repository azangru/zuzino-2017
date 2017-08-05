import {
  showStreets
} from './controllers';
import {
  addListeners
} from './controllers';

document.addEventListener("DOMContentLoaded", () => {
  addListeners();
  showStreets();
});

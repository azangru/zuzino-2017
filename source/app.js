import {
  start
} from './controllers';
import {
  addListeners
} from './controllers';

document.addEventListener("DOMContentLoaded", () => {
  addListeners();
  start();
});

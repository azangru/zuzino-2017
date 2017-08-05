import {
  renderStreets,
  renderBuildings,
  renderResult
} from './renderers';

export function addListeners() {
  addStreetsContainerListeners();
  addBuildingsContainerListeners();
}

const views = {
  current: null,
  order: ['streets-list', 'buildings-list', 'result'],
  controllers: {
    'streets-list': showStreets,
    'buildings-list': showBuildings,
    'result': showResult
  }
}


function addStreetsContainerListeners() {
  const streetsContainer = document.getElementById('streets-list');
  streetsContainer.addEventListener('click', (event) => {
    if (isStreetName(event.target)) {
      const streetId = getStreetId(event.target);
      showBuildings(streetId);
    }
  })
}

function addBuildingsContainerListeners() {
  const buildingsContainer = document.getElementById('buildings-list');
  buildingsContainer.addEventListener('click', (event) => {
    if (isBuilding(event.target)) {
      const variantId = getVotingOptionsId(event.target);
      showResult(variantId);
    }
  })
}


export function showStreets() {
  renderStreets();
}

function showBuildings(streetId) {
  if (streetId) {
    renderBuildings(streetId);
  }
}

function showResult(variantId) {
  renderResult(variantId);
}



function isStreetName(element) {
  return !!getStreetId(element);
}

function getStreetId(element) {
  return element.getAttribute('data-street-id');
}

function isBuilding(element) {
  return !!getVotingOptionsId(element);
}

function getVotingOptionsId(element) {
  return element.getAttribute('data-voting-options');
}

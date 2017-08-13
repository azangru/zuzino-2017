import find from 'lodash/find';
import {
  renderStreets,
  renderBuildings,
  renderResult
} from './renderers';
import store from './store';

export function addListeners() {
  addStreetsContainerListeners();
  addBuildingsContainerListeners();
  addResultContainerListeners();
}

const views = {
  current: null,
  order: ['streets-list', 'buildings-list', 'result']
}


function addStreetsContainerListeners() {
  const streetsContainer = document.getElementById('streets-list');
  streetsContainer.addEventListener('click', (event) => {
    if (isStreetName(event.target)) {
      storeStreetInfo(event.target);
      const streetId = getStreetId(event.target);
      showBuildings(streetId);
      switchTo('buildings-list');
    }
  })
}

function addBuildingsContainerListeners() {
  const buildingsContainer = document.getElementById('buildings-list');
  buildingsContainer.addEventListener('click', (event) => {
    if (isBuilding(event.target)) {
      storeBuildingInfo(event.target);
      const variantId = getVotingOptionsId(event.target);
      showResult(variantId);
      switchTo('result');
    } else if (isBackLink(event.target)) {
      switchTo('streets-list');
    }
  })
}

function addResultContainerListeners() {
  const resultContainer = document.getElementById('result');
  resultContainer.addEventListener('click', (event) => {
    if (isBackLink(event.target)) {
      switchTo('buildings-list');
    }
  })
}

export function start() {
  const id = views.order[0];
  views.current = id;
  renderStreets();
  switchTo(id);
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


function switchTo(containerId) {
  const containers = views.order.map(id => document.getElementById(id));
  const currentContainer = find(containers, (container) => container.id === views.current);
  const nextContainer = find(containers, (container) => container.id === containerId);
  if (isContainerOpen(currentContainer)) {
    hideContainer(currentContainer);
    setTimeout(() => {
      showContainer(nextContainer);
      views.current = containerId;
    }, 300);
  } else {
    showContainer(nextContainer);
    views.current = containerId;
  }
}


function isStreetName(element) {
  return !!getStreetId(element);
}

function getStreetId(element) {
  return element.getAttribute('data-street-id');
}

function storeStreetInfo(element) {
  const streetId = element.getAttribute('data-street-id');
  const streetName = element.innerHTML;
  store.street.id = streetId;
  store.street.name = streetName;
}

function isBuilding(element) {
  return !!getVotingOptionsId(element);
}

function storeBuildingInfo(element) {
  const buildingId = element.getAttribute('data-voting-options');
  const buildingNumber = element.innerHTML;
  store.building.id = buildingId;
  store.building.number = buildingNumber;
}

function getVotingOptionsId(element) {
  return element.getAttribute('data-voting-options');
}

function isContainerOpen(container) {
  return !container.classList.contains('hidden');
}

function hideContainer(container) {
  container.addEventListener('animationend', onHideAnimationEnd);
  container.classList.add('hiding');
}

function onHideAnimationEnd(event) {
  const element = event.target;
  element.removeEventListener('animationend', onHideAnimationEnd);
  element.classList.add('hidden');
  element.classList.remove('hiding');
}

function showContainer(container) {
  container.addEventListener('animationend', onShowAnimationEnd);
  container.classList.remove('hidden');
  container.classList.add('showing');
}

function onShowAnimationEnd(event) {
  const element = event.target;
  element.removeEventListener('animationend', onShowAnimationEnd);
  element.classList.remove('showing');
}

function isBackLink(element) {
  const elementId = element.id;
  return elementId === 'back-to-streets' || elementId === 'back-to-buildings';
}

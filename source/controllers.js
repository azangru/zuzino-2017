import find from 'lodash/find';
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
  order: ['streets-list', 'buildings-list', 'result']
}


function addStreetsContainerListeners() {
  const streetsContainer = document.getElementById('streets-list');
  streetsContainer.addEventListener('click', (event) => {
    if (isStreetName(event.target)) {
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
      const variantId = getVotingOptionsId(event.target);
      showResult(variantId);
      switchTo('result');
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

function isBuilding(element) {
  return !!getVotingOptionsId(element);
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
  event.target.classList.add('hidden');
  event.target.classList.remove('hiding');
}

function showContainer(container) {
  container.addEventListener('animationend', onShowAnimationEnd);
  container.classList.remove('hidden');
  container.classList.add('showing');
}

function onShowAnimationEnd(event) {
  event.target.classList.remove('showing');
}

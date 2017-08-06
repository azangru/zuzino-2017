import {
  getStreets,
  getBuildingsForStreet,
  getResult
} from './data-selectors';

/** RENDERERS FOR STREETS **/

export function renderStreets() {
  const streetsListContainer = document.getElementById('streets-list');
  const header = renderStreetsBlockHeader();
  const streetsList = document.createElement('ul');
  streetsList.classList.add('streets-list');
  const streets = getStreets().map(street => renderStreet(street));
  streets.forEach((street) => streetsList.appendChild(street));
  streetsListContainer.appendChild(header);
  streetsListContainer.appendChild(streetsList);
}

function renderStreet(street) {
  const streetElementContainer = document.createElement('li');
  const streetElement = document.createElement('a');
  streetElement.text = street.streetName;
  streetElement.setAttribute('data-street-id', street.id);
  streetElement.classList.add('internal-link');
  streetElementContainer.appendChild(streetElement);
  return streetElementContainer;
}

function renderStreetsBlockHeader() {
  const header = document.createElement('div');
  header.innerHTML = 'Нажмите на название своей улицы';
  header.classList.add('section-header');
  return header;
}

/** RENDERERS FOR STREET BUILDINGS **/

export function renderBuildings(streetId) {
  const buildingsListContainer = document.getElementById('buildings-list');
  buildingsListContainer.innerHTML = ''; // clear the container

  const header = renderBuildingsBlockHeader();
  const buildingsList = document.createElement('ul');
  buildingsList.classList.add('buildings-list');
  const buildings = getBuildingsForStreet(streetId).map(building => renderBuilding(building));
  buildings.forEach((building) => buildingsList.appendChild(building));
  buildingsListContainer.appendChild(header);
  buildingsListContainer.appendChild(buildingsList);
}

function renderBuilding({building, votingOptions}) {
  const buildingElementContainer = document.createElement('li');
  const buildingElement = document.createElement('a');
  buildingElement.text = building;
  buildingElement.classList.add('internal-link');
  buildingElement.setAttribute('data-voting-options', votingOptions);
  buildingElementContainer.appendChild(buildingElement);
  return buildingElementContainer;
}

function renderBuildingsBlockHeader() {
  const header = document.createElement('div');
  header.innerHTML = 'Нажмите на номер своего дома';
  header.classList.add('section-header');
  return header;
}

/** RENDERERS FOR POLLING STATION AND CANDIDATES **/
export function renderResult(variantId) {
  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = ''; // clear the container

  const { district, candidates, pollingStationId, pollingStationAddress } = getResult(variantId);
  const districtElement = renderDistrictName(district);
  const candidatesElement = renderCandidates(candidates);
  const pollingStationElement = renderPollingStation({pollingStationId, pollingStationAddress});
  const thankYouElement = renderThankYou();

  resultContainer.appendChild(districtElement);
  resultContainer.appendChild(candidatesElement);
  resultContainer.appendChild(pollingStationElement);
  resultContainer.appendChild(thankYouElement);
}

function renderDistrictName(district) {
  const districtNameContainer = document.createElement('div');
  districtNameContainer.innerHTML = district;
  districtNameContainer.classList.add('district-name');
  return districtNameContainer;
}

function renderCandidates(candidates) {
  const candidatesContainer = document.createElement('div');
  const header = document.createElement('div');
  header.innerHTML = 'Ваши кандидаты:';

  const candidatesListContainer = document.createElement('ul');
  const candidateElements = candidates.map(candidate => renderCandidate(candidate));
  candidateElements.forEach(element => candidatesListContainer.appendChild(element));

  candidatesContainer.appendChild(header);
  candidatesContainer.appendChild(candidatesListContainer);
  return candidatesContainer;
}

function renderCandidate(candidate) {
  const candidateElementContainer = document.createElement('li');
  const candidateElement = document.createElement('a');
  candidateElement.text = `${candidate.lastName} ${candidate.firstName}`;
  candidateElement.setAttribute('href', candidate.link);
  candidateElement.setAttribute('target', '_blank');
  candidateElement.classList.add('candidate');
  candidateElementContainer.appendChild(candidateElement);
  return candidateElementContainer;
}

function renderPollingStation({pollingStationId, pollingStationAddress}) {
  const pollingStationElementContainer = document.createElement('div');
  const pollingStationIdElement = document.createElement('div');
  pollingStationIdElement.innerHTML = pollingStationId;
  const pollingStationAddressElement = document.createElement('div');
  pollingStationAddressElement.innerHTML = pollingStationAddress;
  const pollingStationOpenTimeElement = document.createElement('div');
  pollingStationOpenTimeElement.innerHTML = 'Время работы УИК: 8:00 — 20:00';

  pollingStationElementContainer.appendChild(pollingStationIdElement);
  pollingStationElementContainer.appendChild(pollingStationAddressElement);
  pollingStationElementContainer.appendChild(pollingStationOpenTimeElement);
  return pollingStationElementContainer;
}

function renderThankYou() {
  const thankYouElement = document.createElement('div');
  thankYouElement.innerHTML = 'Спасибо за вашу поддержку! Приходите на выборы 10 сентября!';
  return thankYouElement;
}

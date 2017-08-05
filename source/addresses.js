import addressesSource from '../data/addresses.json';
import compose from 'lodash/fp/compose';
import map from 'lodash/fp/map';
import uniqBy from 'lodash/fp/uniqBy';
import pick from 'lodash/fp/pick';
import property from 'lodash/fp/property';

const { addresses } = addressesSource;

export function getStreets() {
  return uniqueStreetsGetter(addresses);
}

const uniqueStreetsGetter = compose(
  uniqBy(property('id')),
  map(pick(['id', 'streetName']))
);

export function renderStreets() {
  const streetsListContainer = document.getElementById('streets-list');
  const streetsList = document.createElement('ul');
  const streets = getStreets().map(street => renderStreet(street));
  streets.forEach((street) => streetsList.appendChild(street));
  streetsListContainer.appendChild(streetsList);
}

function renderStreet(street) {
  const streetElementContainer = document.createElement('li');
  const streetElement = document.createElement('a');
  streetElement.text = street.streetName;
  streetElement.setAttribute('data-street-id', street.id);
  streetElementContainer.appendChild(streetElement);
  return streetElementContainer;
}

import compose from 'lodash/fp/compose';
import map from 'lodash/fp/map';
import find from 'lodash/fp/find';
import filter from 'lodash/fp/filter';
import uniqBy from 'lodash/fp/uniqBy';
import pick from 'lodash/fp/pick';
import property from 'lodash/fp/property';
import clone from 'lodash/fp/clone';
import merge from 'lodash/merge';

import addressesSource from '../data/addresses.json';
import variants from '../data/variants.json';
import candidates from '../data/candidates';

const { addresses } = addressesSource;

export function getStreets() {
  return uniqueStreetsGetter(addresses);
}

const uniqueStreetsGetter = compose(
  uniqBy(property('id')),
  map(pick(['id', 'streetName']))
);

export function getBuildingsForStreet(streetId) {
  return compose(
    map(pick(['building', 'votingOptions'])),
    filter(address => address.id === streetId)
  )(addresses);
}

export function getResult(variantId) {
  const variant = compose(
    clone,
    find((variant) => variant.id === variantId)
  )(variants);
  variant.candidates = mapCandidates(variant.candidates);
  return variant;
}

// map array of candidate ids to array of full candidate records
function mapCandidates(candidateIds) {
  return map(candidateId => find(candidate => candidate.id === candidateId)(candidates))(candidateIds)
}

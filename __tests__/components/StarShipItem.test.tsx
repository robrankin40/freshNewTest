/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {StarShipItem} from '../../src/components/StarShipItem';
import {StarShipInfo} from '../../src/types';

const StartShipTestData: StarShipInfo = {
  MGLT: null,
  __typename: 'Starship',
  cargoCapacity: 60,
  consumables: '15 hours',
  costInCredits: 102500,
  created: '2014-12-20T20:43:04.349000Z',
  crew: '1',
  hyperdriveRating: 1,
  id: 'c3RhcnNoaXBzOjc1',
  length: 7.9,
  manufacturers: ['Kuat Systems Engineering'],
  maxAtmospheringSpeed: 1050,
  model: 'Alpha-3 Nimbus-class V-wing starfighter',
  name: 'V-wing',
  passengers: '0',
  starshipClass: 'starfighter',
};

it('StarShipItem renders correctly', () => {
  renderer.create(<StarShipItem info={StartShipTestData} />);
});

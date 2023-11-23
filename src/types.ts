import type {PropsWithChildren} from 'react';

import {ApolloError} from '@apollo/client';

export interface StarShipInfo {
  MGLT: number;
  cargoCapacity: number;
  consumables: string;
  costInCredits: number;
  created: string;
  crew: string;
  hyperdriveRating: number;
  id: string;
  length: number;
  manufacturers: string[];
  maxAtmospheringSpeed: number;
  model: string;
  name: string;
  passengers: string;
  starshipClass: string;
}

export interface StarShipsData {
  allStarships: {
    __typename: 'StarshipsConnection';
    starships: StarShipInfo[];
  };
}

export interface StarShipItemProps {
  info: StarShipInfo;
}

export interface EmptyListProps {
  loading: boolean;
  error?: ApolloError;
}

export type SectionProps = PropsWithChildren<{
  title: string;
}>;

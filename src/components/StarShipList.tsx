import React from 'react';
import {FlatList, Text, View} from 'react-native';

import {useQuery, ApolloError} from '@apollo/client';
import {GET_STARSHIPS} from '../gql';
import {StarShipInfo, StarShipsData} from '../types';
import {StarShipItem} from './StarShipItem';

export interface EmptyListProps {
  loading: boolean;
  error?: ApolloError;
}

const EmptyList: React.FC<EmptyListProps> = ({loading, error}) => (
  <View>
    {loading ? (
      <Text>Loading ...</Text>
    ) : error ? (
      <Text>Error !!!!!</Text>
    ) : (
      <Text>No Records there yet</Text>
    )}
  </View>
);

export const StarShipList: React.FC = () => {
  const {loading, error, data} = useQuery<StarShipsData>(GET_STARSHIPS);
  const renderStarShip = ({item}: {item: StarShipInfo; index: number}) => (
    <StarShipItem info={item} />
  );
  return (
    <FlatList
      data={data?.allStarships?.starships ?? []}
      ListEmptyComponent={<EmptyList loading={loading} error={error} />}
      renderItem={renderStarShip}
      keyExtractor={(item: StarShipInfo, _: number) => `starship_${item.id}`}
    />
  );
};

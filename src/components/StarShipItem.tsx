import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StarShipInfo} from '../types';

interface StarShipItemProps {
  info: StarShipInfo;
}
export const StarShipItem: React.FC<StarShipItemProps> = ({info}) => {
  return (
    <View style={styles.infoWrapper}>
      <Text>Name: {info.name}</Text>
      <Text>Model: {info.model}</Text>
      <Text>Manufacturers: {info.manufacturers.join(', ')}</Text>
      <Text>MGLT: {info.MGLT}</Text>
      <Text>Cargo Capacity: {info.cargoCapacity}</Text>
      <Text>Consumables: {info.consumables}</Text>
      <Text>Cost In Credits: {info.costInCredits}</Text>
      <Text>Crew: {info.crew}</Text>
      <Text>Hyper Drive Rating: {info.hyperdriveRating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoWrapper: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 16,
    margin: 16,
  },
});

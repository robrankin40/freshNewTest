/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import {PERMISSIONS, check, request} from 'react-native-permissions';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
  ApolloError,
} from '@apollo/client';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';

const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: new InMemoryCache(),
});

interface StarShipInfo {
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

interface StarShipsData {
  allStarships: {
    __typename: 'StarshipsConnection';
    starships: StarShipInfo[];
  };
}

interface StarShipItemProps {
  info: StarShipInfo;
}

interface EmptyListProps {
  loading: boolean;
  error?: ApolloError;
}

const GET_STARSHIPS = gql`
  query GetAllStarShips {
    allStarships {
      starships {
        MGLT
        cargoCapacity
        consumables
        costInCredits
        created
        crew
        hyperdriveRating
        id
        length
        manufacturers
        maxAtmospheringSpeed
        model
        name
        passengers
        starshipClass
      }
    }
  }
`;

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <Text>{title}</Text>
      <Text style={[styles.sectionDescription]}>{children}</Text>
    </View>
  );
}

const StarShipItem: React.FC<StarShipItemProps> = ({info}) => {
  return (
    <View
      style={{
        padding: 16,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 16,
        margin: 16,
      }}>
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

const StarShipList: React.FC = () => {
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

function App(): JSX.Element {
  const isHermes = () => !!global.HermesInternal as Boolean;
  const [hasPermission, setPermission] = useState<boolean>(false);
  const [location, setLocation] = useState<
    Geolocation.GeoCoordinates | undefined
  >();

  const checkPermission = async () => {
    const result = await check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
    if (result === 'granted') {
      setPermission(true);
    } else {
      setPermission(false);
      const requestResult = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (requestResult === 'granted') {
        setPermission(true);
      }
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  useEffect(() => {
    if (hasPermission) {
      Geolocation.getCurrentPosition((position: GeoPosition) => {
        setLocation(position.coords);
      });
    }
  }, [hasPermission]);

  return (
    <ApolloProvider client={client}>
      <SafeAreaView>
        <View>
          <Section title="Hermes Enabled">
            {isHermes ? 'Enabled' : 'Disabled'}
          </Section>
        </View>
        <StarShipList />
      </SafeAreaView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

import React, {useMemo} from 'react';
import {SafeAreaView} from 'react-native';

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {getDistance, convertDistance} from 'geolib';
import {Section} from './src/components/Section';
import {useGeoLocation} from './src/hooks/useGeoLocation';
import {StarShipList} from './src/components/StarShipList';

const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: new InMemoryCache(),
});

function App(): JSX.Element {
  const isHermes = () => !!global.HermesInternal as Boolean;
  const {location} = useGeoLocation();

  const distance = useMemo(() => {
    if (location) {
      return convertDistance(
        getDistance(
          {
            lon: location.longitude,
            lat: location.latitude,
          },
          {
            lon: 33.814831976267016,
            lat: -117.92057887641796,
          },
        ),
        'mi',
      );
    }
    return false;
  }, [location]);

  return (
    <ApolloProvider client={client}>
      <SafeAreaView>
        <Section title="Hermes Enabled">
          {isHermes ? 'Enabled' : 'Disabled'}
        </Section>
        {distance && (
          <Section title="Distance to Star Wars Land">
            {distance.toFixed(2)} miles
          </Section>
        )}
        <StarShipList />
      </SafeAreaView>
    </ApolloProvider>
  );
}

export default App;

import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {PERMISSIONS, check, request} from 'react-native-permissions';

export const useGeoLocation = (): {
  hasPermission: boolean;
  location?: Geolocation.GeoCoordinates;
} => {
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
  return {hasPermission, location};
};

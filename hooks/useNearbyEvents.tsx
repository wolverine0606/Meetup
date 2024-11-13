import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { NearbyEvent } from '~/types/db';
import { supabase } from '~/utils/supabase';

export const useNearbyEvents = () => {
  const [events, setEvents] = useState<NearbyEvent>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    if (location) fetchNearbyEvents();
  }, [location]);

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  const fetchNearbyEvents = async () => {
    if (!location) return;
    const { data } = await supabase.rpc('nearby_events', {
      lat: location?.coords.latitude,
      long: location?.coords.longitude,
    });
    if (data) {
      setEvents(data);
    }
  };

  return { events };
};

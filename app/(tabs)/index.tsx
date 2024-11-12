import * as Location from 'expo-location';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView } from 'react-native';

import { EventCard } from '~/components/EventCard';
import { NearbyEvent } from '~/types/db';
import { supabase } from '~/utils/supabase';

export default function Home() {
  const [events, setEvents] = useState<NearbyEvent>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    //fetchAllEvents();
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

  // const fetchAllEvents = async () => {
  //   const { data } = await supabase.from('events').select('*');
  //   setEvents(data);
  // };
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

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <SafeAreaView className=" flex-1 bg-white">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={events}
          renderItem={({ item }) => <EventCard event={item} />}
          keyExtractor={(item) => String(item.id)}
        />
      </SafeAreaView>
    </>
  );
}

import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';

import { EventCard } from '~/components/EventCard';
import { NearbyEvent } from '~/types/db';
import { supabase } from '~/utils/supabase';

export default function Home() {
  const [events, setEvents] = useState<NearbyEvent>([]);

  useEffect(() => {
    //fetchAllEvents();
    fetchNearbyEvents();
  }, []);

  // const fetchAllEvents = async () => {
  //   const { data } = await supabase.from('events').select('*');
  //   setEvents(data);
  // };
  const fetchNearbyEvents = async () => {
    const { data } = await supabase.rpc('nearby_events', {
      lat: 41.3,
      long: 2.1,
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

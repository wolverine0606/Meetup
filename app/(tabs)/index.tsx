import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';

import { EventCard } from '~/components/EventCard';
import { supabase } from '~/utils/supabase';

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase.from('events').select('*');
    setEvents(data);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <SafeAreaView>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={events}
          renderItem={({ item }) => <EventCard event={item} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </>
  );
}

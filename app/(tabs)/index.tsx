import { Stack } from 'expo-router';
import { FlatList, SafeAreaView } from 'react-native';

import events from '../../assets/events.json';

import { EventCard } from '~/components/EventCard';

export default function Home() {
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

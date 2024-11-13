import { Stack } from 'expo-router';
import { FlatList, SafeAreaView } from 'react-native';

import { EventCard } from '~/components/EventCard';
import { useNearbyEvents } from '~/hooks/useNearbyEvents';

export default function Home() {
  const { events } = useNearbyEvents();
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

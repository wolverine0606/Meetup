import { Feather } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';

export default function EventsTabLayout() {
  return (
    <Stack screenOptions={{ headerTintColor: 'black' }}>
      <Stack.Screen
        name="index"
        options={{
          headerRight: () => (
            <Link href="/home/map">
              <Feather name="globe" size={24} color="black" />
            </Link>
          ),
        }}
      />
    </Stack>
  );
}

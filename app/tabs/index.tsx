import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <View></View>
    </>
  );
}

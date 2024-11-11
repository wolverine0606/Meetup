import { Stack } from 'expo-router';
import FlashMessage from 'react-native-flash-message';

import AuthProvider from '~/contexts/AuthProvider';
import '../global.css';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerTintColor: 'black' }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      <FlashMessage position="top" />
    </AuthProvider>
  );
}

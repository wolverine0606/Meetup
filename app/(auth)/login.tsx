import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Text, Alert, View, AppState, TextInput, Pressable } from 'react-native';

import { supabase } from '~/utils/supabase';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <View className="flex-1 gap-3 bg-white p-5 pt-10">
      <Stack.Screen options={{ title: 'Auth' }} />
      <TextInput
        className="rounded-md border border-gray-200 p-3"
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="email@address.com"
        autoCapitalize="none"
      />
      <TextInput
        className="rounded-md border border-gray-200 p-3"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
      />
      <View className=" flex-row gap-10">
        <Pressable
          style={{ opacity: loading ? 0.7 : 1 }}
          disabled={loading}
          onPress={() => signInWithEmail()}
          className="flex-1 items-center rounded-lg bg-red-400 p-3 px-8">
          <Text className="text-lg font-bold text-white">Sign in</Text>
        </Pressable>
        <Pressable
          style={{ opacity: loading ? 0.7 : 1 }}
          disabled={loading}
          onPress={() => signUpWithEmail()}
          className="flex-1 items-center rounded-lg border-2 border-red-400 p-3 px-8">
          <Text className="text-lg font-bold text-red-400">Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
}

import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Text, Pressable, TextInput, View } from 'react-native';

import { AuthContextData, useAuth } from '~/contexts/AuthProvider';
import { User } from '~/types/db';
import { supabase } from '~/utils/supabase';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const session: AuthContextData = useAuth();

  useEffect(() => {
    if (session) getProfile();
  }, [session]);
  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates: User['Insert'] = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: String(new Date()),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <View className=" flex-1 gap-3 bg-white p-5">
      <Stack.Screen options={{ title: 'Profile' }} />

      <TextInput
        editable={false}
        className="rounded-md border border-gray-200 p-3 text-gray-600"
        value={session.user?.email}
        autoCapitalize="none"
      />

      <TextInput
        className="rounded-md border border-gray-200 p-3"
        onChangeText={(text) => setUsername(text)}
        value={username || ''}
        placeholder="username"
        autoComplete="name"
        autoCapitalize="none"
      />
      <TextInput
        className="rounded-md border border-gray-200 p-3"
        onChangeText={(text) => setWebsite(text)}
        value={website || ''}
        placeholder="website"
        autoCapitalize="none"
      />

      <Pressable
        className="items-center rounded-lg border-2 border-red-400 p-4 px-8"
        onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
        disabled={loading}>
        <Text className="text-lg font-bold text-red-400">Update profile</Text>
      </Pressable>
      <Pressable
        className="items-center p-4"
        onPress={() => supabase.auth.signOut()}
        disabled={loading}>
        <Text className="text-lg font-bold text-red-400">Sign out</Text>
      </Pressable>
    </View>
  );
}

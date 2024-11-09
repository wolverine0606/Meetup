import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { supabase } from '~/utils/supabase';

interface Profile {
  id: string;
  updated_at: string | null;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  website: string | null;
}

export default function EventAttendance() {
  const { id } = useLocalSearchParams();

  const [attendees, setAttendees] = useState<{ profiles: Profile }[] | null>(null);
  useEffect(() => {
    fetchAttendees();
  }, [id]);
  const fetchAttendees = async () => {
    const { data } = await supabase.from('attendance').select('*, profiles(*)').eq('event_id', id);

    setAttendees(data);
  };

  return (
    <View>
      <Stack.Screen
        options={{ title: 'Attendees', headerBackTitleVisible: false, headerTintColor: 'black' }}
      />
      <FlatList
        data={attendees}
        renderItem={({ item }) => (
          <View className="p-3 ">
            <Text className=" font-bold">{item.profiles.username || 'user'}</Text>
          </View>
        )}
      />
    </View>
  );
}
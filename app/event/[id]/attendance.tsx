import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { Attendees } from '~/types/db';
import { supabase } from '~/utils/supabase';

export default function EventAttendance() {
  const { id } = useLocalSearchParams();

  const [attendees, setAttendees] = useState<Attendees['ProfileIncluded'][] | null>();
  useEffect(() => {
    fetchAttendees();
  }, [id]);
  const fetchAttendees = async () => {
    const { data } = await supabase.from('attendees').select('*, profiles(*)').eq('event_id', id);

    setAttendees(data);
  };

  return (
    <View>
      <Stack.Screen options={{ title: 'Attendees', headerBackTitleVisible: false }} />
      <FlatList
        data={attendees}
        renderItem={({ item }) => (
          <View className="p-3 ">
            <Text className=" font-bold">{item.profiles?.username || 'user'}</Text>
          </View>
        )}
      />
    </View>
  );
}

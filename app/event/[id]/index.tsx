import dayjs from 'dayjs';
import { useLocalSearchParams, Stack, Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, Image, Pressable, ActivityIndicator } from 'react-native';

import { EventIn } from '~/components/EventCard';
import { useAuth } from '~/contexts/AuthProvider';
import { supabase } from '~/utils/supabase';

export default function EventPage() {
  const { id } = useLocalSearchParams();

  const [event, setEvent] = useState<EventIn | null>(null);
  const [attendance, setAttendance] = useState(null); // Fixed here
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    setLoading(true);
    const { data } = await supabase.from('events').select('*').eq('id', id).single();
    setEvent(data);

    const { data: attendanceData } = await supabase
      .from('attendance')
      .select('*')
      .eq('user_id', user?.id)
      .eq('event_id', id)
      .single();
    setAttendance(attendanceData);

    setLoading(false);
  };

  const joinEvent = async () => {
    const { data } = await supabase
      .from('attendance')
      .insert({ user_id: user?.id, event_id: event?.id })
      .select()
      .single();

    setAttendance(data);
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!event) return <Text>Event not found</Text>;
  return (
    <View className="flex-1 gap-3 bg-white p-3">
      <Stack.Screen
        options={{ title: 'Event', headerBackTitleVisible: false, headerTintColor: 'black' }}
      />
      <Image className="aspect-video w-full rounded-xl" source={{ uri: event.image_uri }} />
      <Text className="line-clamp-2 text-3xl font-bold">{event.title}</Text>
      <Text className="text-lg font-semibold uppercase text-amber-950">
        {dayjs(event.datetime).format('ddd , D MMM · h:mm A')}
      </Text>
      <Text className="line-clamp-2 text-lg">{event.description}</Text>
      <Link href={`/event/${event.id}/attendance`} className="line-clamp-2 text-lg">
        view attendance
      </Link>

      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between border-t-2 border-gray-400 p-3 pb-10">
        <Text className="text-xl font-semibold">Free</Text>
        {attendance ? (
          <Text className="p-4 px-8 font-semibold text-green-500">You are attendent</Text>
        ) : (
          <Pressable className="rounded-lg bg-red-400 p-4 px-8" onPress={() => joinEvent()}>
            <Text className="text-lg font-bold text-white">join and RSVP</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
import Feather from '@expo/vector-icons/Feather';
import dayjs from 'dayjs';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';

import SupaImage from './SupaImage';

import { Event } from '~/types/db';
import { supabase } from '~/utils/supabase';

interface EventIn extends Event {
  dist_meters: number;
}

export const EventCard: React.FC<{ event: EventIn }> = ({ event }) => {
  const [numberOfAttendees, setNumberOfAttendees] = useState<number | null>(0);
  useEffect(() => {
    fetchNumberOfAttendees();
  }, [event]);
  const fetchNumberOfAttendees = async () => {
    const { count } = await supabase
      .from('attendees')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', event.id);
    setNumberOfAttendees(count);
  };

  return (
    <Link href={`/event/${event.id}`} asChild>
      <Pressable className="gap-3 border-b-[1px] border-gray-200 bg-white p-3 pb-6">
        <View className="flex-row">
          <View className="flex-1 gap-2">
            <Text className="text-lg font-semibold uppercase text-amber-950">
              {dayjs(event.datetime).format('ddd , D MMM · h:mm A')}
            </Text>
            <Text className="line-clamp-2 text-xl font-bold">{event.title}</Text>

            <Text className="text-gray-500">{event.location}</Text>
          </View>
          <SupaImage path={event.image_uri || null} className="aspect-video w-2/5 rounded-xl" />
        </View>
        <View className="flex-row gap-3">
          <View className=" flex-row items-center justify-center gap-1">
            <Text className="mr-auto text-gray-500">{numberOfAttendees} going ·</Text>
            {event.dist_meters ? (
              <View className=" flex-row items-center justify-center gap-1">
                <Feather name="map-pin" size={24} color="gray" />
                <Text className="text-gray-500">
                  {Math.round(event.dist_meters / 1000)} km from you
                </Text>
              </View>
            ) : (
              <View className=" flex-row items-center justify-center gap-1">
                <Feather name="video" size={24} color="gray" />
                <Text className="text-gray-500"> Online event</Text>
              </View>
            )}
          </View>
          <Feather className=" ml-auto" name="share" size={24} color="gray" />
          <Feather name="bookmark" size={24} color="gray" />
        </View>
      </Pressable>
    </Link>
  );
};

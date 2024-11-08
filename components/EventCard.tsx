import Feather from '@expo/vector-icons/Feather';
import dayjs from 'dayjs';
import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';

export type Event = {
  id: string;
  title: string;
  description: string;
  datetime: string;
  location: string;
  image_uri: string;
};

export const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <Link href={`/${event.id}`} asChild>
      <Pressable className="m-3 gap-3 border-b-[1px] border-gray-200 pb-3">
        <View className="flex-row">
          <View className="flex-1 gap-2">
            <Text className="text-lg font-semibold uppercase text-amber-950">
              {dayjs(event.datetime).format('ddd , D MMM · h:mm A')}
            </Text>
            <Text className="line-clamp-2 text-xl font-bold">{event.title}</Text>

            <Text className="text-gray-500">{event.location}</Text>
          </View>
          <Image className="aspect-video w-2/5 rounded-xl" source={{ uri: event.image_uri }} />
        </View>
        <View className="flex-row gap-3">
          <Text className="mr-auto text-gray-500">16 going</Text>
          <Feather name="share" size={24} color="gray" />
          <Feather name="bookmark" size={24} color="gray" />
        </View>
      </Pressable>
    </Link>
  );
};

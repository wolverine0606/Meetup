import { Feather } from '@expo/vector-icons';
import { PostgrestError } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { showMessage } from 'react-native-flash-message';

import Avatar from '~/components/Avatar';
import { useAuth } from '~/contexts/AuthProvider';
import { supabase } from '~/utils/supabase';

export default function CreateEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [imageUrl, setImageUrl] = useState('');

  const { user } = useAuth();

  const now = dayjs(date).format('ddd , D MMM · h:mm A');

  useEffect(() => {
    const isFormFilled = title.trim() && description.trim();

    if (isFormFilled && loading) {
      setLoading(false);
    } else if (!loading && !isFormFilled) setLoading(true);
  }, [title, description, loading]);

  const createEvent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([
          {
            title,
            description,
            datetime: date.toISOString(),
            user_id: user?.id,
            image_uri: imageUrl,
            location_point: 'POINT(2.1 41.3)',
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setDescription('');
      setTitle('');
      setDate(new Date());

      router.push(`/event/${data?.id}`);

      showMessage({
        message: 'Event created!!',
        backgroundColor: '#f87171',
        type: 'success',
        titleStyle: { textAlign: 'center', flex: 1, justifyContent: 'center' },
      });
    } catch (err) {
      const error = err as PostgrestError;

      showMessage({
        message: error.message,
        backgroundColor: '#f87171',
        type: 'danger',
        titleStyle: { textAlign: 'center', flex: 1, justifyContent: 'center' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 gap-3 bg-white p-5">
      <Stack.Screen options={{ headerTitle: 'New Event' }} />
      <Avatar
        size={200}
        url={imageUrl}
        onUpload={(url: string) => {
          setImageUrl(url);
        }}
      />
      <TextInput
        value={title}
        onChangeText={(title) => setTitle(title)}
        className="rounded-md border border-gray-200 p-3"
        placeholder="Title"
        autoCapitalize="none"
      />
      <TextInput
        value={description}
        onChangeText={(descr) => setDescription(descr)}
        className=" min-h-32 rounded-md border border-gray-200 p-3"
        placeholder="Description"
        multiline
        numberOfLines={3}
        autoCapitalize="none"
      />
      <Pressable
        className=" flex-row items-center justify-between rounded-md border border-gray-200 pr-3"
        onPress={() => setOpen(true)}>
        <Text className="flex-1  p-3">{now}</Text>
        <Feather name="chevron-down" size={24} color="gray" />
      </Pressable>
      <DatePicker
        modal
        open={open}
        date={date}
        theme="dark"
        minimumDate={new Date()}
        minuteInterval={15}
        onConfirm={(date) => {
          setDate(date);
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Pressable
        style={{ opacity: loading ? 0.7 : 1, backgroundColor: loading ? '#fee2e2' : '#f87171' }}
        disabled={loading}
        onPress={() => createEvent()}
        className=" mt-auto items-center rounded-lg bg-red-400 p-3 px-8">
        <Text className="text-lg font-bold text-white  ">Create event</Text>
      </Pressable>
    </View>
  );
}

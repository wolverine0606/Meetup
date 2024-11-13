import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { useAuth } from '~/contexts/AuthProvider';
import { getSuggestions, retrieveDetails } from '~/utils/AdressAutocomplete';

export default function AddressAutocomplete({ onSelected }: any) {
  const [input, setInput] = useState('');
  const [suggestioins, setSuggestions] = useState<any>([]);
  const [selectedLocation, setSelectedLocation] = useState({});

  const { session } = useAuth();

  const search = async () => {
    const data = await getSuggestions(input, session?.access_token);
    setSuggestions(data.suggestions);
  };

  const onSuggestionClick = async (suggestion: any) => {
    setSelectedLocation(suggestion);
    setInput(suggestion.place_formatted);
    setSuggestions([]);

    const details = await retrieveDetails(suggestion.mapbox_id, session?.access_token);
    onSelected(details);
  };

  return (
    <View>
      <View className=" flex-row items-center justify-between rounded-md border border-gray-200 p-3">
        <TextInput value={input} onChangeText={setInput} placeholder="Search" />
        <Feather onPress={() => search()} name="search" size={24} color="gray" />
      </View>
      <View className=" gap-1">
        {suggestioins.map((item: any) => (
          <Pressable
            onPress={() => onSuggestionClick(item)}
            key={item.name}
            className=" rounded border border-gray-300 p-2">
            <Text className=" font-bold">{item.name}</Text>
            <Text>{item.place_formatted}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

import { Feather, FontAwesome } from '@expo/vector-icons';
import { Link, Redirect, router, Tabs } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { TabBarIcon } from '../../components/TabBarIcon';

import { useAuth } from '~/contexts/AuthProvider';

export default function TabLayout() {
  const { isAuth } = useAuth();
  const initialBgColor = 'bg-gray-500';
  const [bgColor, setBgColor] = useState(initialBgColor);
  const ChangeBgColor = () => {};

  if (!isAuth) return <Redirect href="/login" />;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'light',
        tabBarAllowFontScaling: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          //headerTitle: 'Meetup',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <View className=" mr-3">
              <Link href="/map">
                <Feather c name="globe" size={24} color="black" />
              </Link>
            </View>
          ),
        }}
        listeners={{
          tabPress: () => {
            return bgColor !== initialBgColor ? setBgColor(initialBgColor) : null;
          },
        }}
      />
      <Tabs.Screen
        name="bluff_create"
        options={{
          title: '',
          tabBarIcon: () => (
            <View
              className={`aspect-square h-5/6 items-center justify-center rounded-full ${bgColor}  align-middle`}>
              <FontAwesome size={30} name="plus" color="white" />
            </View>
          ),
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            setBgColor('bg-black');
            router.push('/create');
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
        listeners={{
          tabPress: () => {
            return bgColor !== initialBgColor ? setBgColor(initialBgColor) : null;
          },
        }}
      />
      <Tabs.Screen name="map" options={{ href: null }} />
      <Tabs.Screen name="create" options={{ href: null }} />
    </Tabs>
  );
}

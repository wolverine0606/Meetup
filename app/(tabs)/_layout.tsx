import { Redirect, Tabs } from 'expo-router';

import { TabBarIcon } from '../../components/TabBarIcon';

import { useAuth } from '~/contexts/AuthProvider';

export default function TabLayout() {
  const { isAuth } = useAuth();

  if (!isAuth) return <Redirect href="/login" />;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'light',
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}

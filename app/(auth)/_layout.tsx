import { Redirect, Stack } from 'expo-router';

import { useAuth } from '~/contexts/AuthProvider';

export default function AuthLayout() {
  const { isAuth } = useAuth();

  if (isAuth) return <Redirect href="/" />;

  return <Stack />;
}

import { StatusBar } from 'expo-status-bar';

import { ScreenContent } from '~/components/ScreenContent';

export default function Modal() {
  return (
    <>
      <ScreenContent path="app/modal.tsx" title="Modal" />
      <StatusBar style="auto" />
    </>
  );
}

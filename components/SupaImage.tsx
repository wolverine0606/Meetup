import { useEffect, useState } from 'react';
import { Image } from 'react-native';

import { supabase } from '~/utils/supabase';

type SupaImageProps = {
  className: string;
  path: string | null;
};

export default function SupaImage({ path, className }: SupaImageProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  useEffect(() => {
    if (path) downloadImage(path);
  }, [path]);
  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message);
      }
    }
  }
  return <Image className={className} source={{ uri: avatarUrl || undefined }} />;
}

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import Constants from 'expo-constants';

export const supabase = createClient(
  Constants.expoConfig.extra.apiUrl,
  Constants.expoConfig.extra.apiKey,
   {
    auth: {
      detectSessionInUrl: false,
      storage: AsyncStorage,
    },
  }
);

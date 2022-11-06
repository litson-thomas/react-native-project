import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import Constants from 'expo-constants';

const SUPABASE_APIURL = "https://otbvakzehdxkmuvrelzr.supabase.co";
const SUPABASE_APIKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90YnZha3plaGR4a211dnJlbHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY4MTU2MzksImV4cCI6MTk4MjM5MTYzOX0.xqP7BnPfEmxyb7aUNB_ojH9phGXw2AThIQQtarRQJr8";

export const supabase = createClient(SUPABASE_APIURL, SUPABASE_APIKEY,
   {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
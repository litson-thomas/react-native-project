import { useFonts } from "expo-font";
import { AppNavigation } from "./navigation/navigation";
import { fontFiles } from "./theme/fonts";
import { Store } from "./redux/store";
import { Provider } from "react-redux";

export default function App() {
  // fonts loading
  const [fontsLoaded] = useFonts(fontFiles);
  if (!fontsLoaded) return null;

  return <Provider store={Store}>
    <AppNavigation />
  </Provider>
}
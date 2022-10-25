import { useFonts } from 'expo-font';
import { fontFiles } from './theme/fonts';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/home';
import { Text } from 'react-native';
import Navbar from './components/common/navbar';

export default function App() {

  // fonts loading
  const [fontsLoaded] = useFonts(fontFiles);
  if (!fontsLoaded) return null;

  const Stack = createNativeStackNavigator();

  let navigationOptions = {
    headerBackButtonMenuEnabled: false,
    headerShown: false,
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='home' options={navigationOptions} component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
      <Navbar></Navbar>
    </>
  );
}

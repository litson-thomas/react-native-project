import { useFonts } from 'expo-font';
import { fontFiles } from './theme/fonts';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './pages/home';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { lightColors } from './theme/colors';

const Tab = createBottomTabNavigator();

export default function App() {

  // fonts loading
  const [fontsLoaded] = useFonts(fontFiles);
  if (!fontsLoaded) return null;

  // const Stack = createNativeStackNavigator();

  let navigationOptions = {
    headerBackButtonMenuEnabled: false,
    headerShown: false,
  }

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator screenOptions={
            ({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') iconName = 'home-outline';
                else if (route.name === 'Search') iconName = 'search-outline';
                else if (route.name === 'Person') iconName = 'person-outline';
                else if (route.name === 'Cart') iconName = 'cart-outline';
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: lightColors.primary,
              tabBarInactiveTintColor: lightColors.grey,
            })
          }>
          <Tab.Screen name="Home"  component={Home} options={navigationOptions} />
          <Tab.Screen name="Search" component={Home} options={navigationOptions}/>
          <Tab.Screen name="Cart" component={Home} options={navigationOptions}/>
          <Tab.Screen name="Person" component={Home} options={navigationOptions}/>
        </Tab.Navigator>
      </NavigationContainer>

      {/* <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='home' options={navigationOptions} component={Home} />
        </Stack.Navigator>
      </NavigationContainer> */}
    </>
  );
}
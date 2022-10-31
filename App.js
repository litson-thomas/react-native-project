import { useFonts } from 'expo-font';
import { fontFiles } from './theme/fonts';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './pages/home-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { lightColors } from './theme/colors';
import SearchScreen from './pages/search-screen';
import CartScreen from './pages/cart-screen';
import PersonScreen from './pages/person-screen';
import DetailScreen from './pages/details-screen';
import FilterScreen from './pages/filters-screen';
import { LightHaptics } from './helpers/common';

const Tab = createBottomTabNavigator();

let navigationOptions = {
  headerBackButtonMenuEnabled: false,
  headerShown: false,
}

export default function App() {

  // fonts loading
  const [fontsLoaded] = useFonts(fontFiles);
  if (!fontsLoaded) return null;

  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="TabNavigator" component={TabNavigator} options={navigationOptions} />
          <Stack.Group screenOptions={{  }}>
            <Stack.Screen name="DetailModal" component={DetailScreen} listeners={{focus: () => LightHaptics()}} options={{...navigationOptions, presentation: 'card'}}/>
            <Stack.Screen name="FilterModal" component={FilterScreen} options={navigationOptions}/>
          </Stack.Group>
        </Stack.Navigator>  
      </NavigationContainer>
    </>
  );
}

// Tabs navigator component
function TabNavigator(){
  return <Tab.Navigator screenOptions={
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
    <Tab.Screen name="Home"  component={HomeScreen} options={navigationOptions} />
    <Tab.Screen name="Search" component={SearchScreen} options={navigationOptions}/>
    <Tab.Screen name="Cart" component={CartScreen} options={navigationOptions}/>
    <Tab.Screen name="Person" component={PersonScreen} options={navigationOptions}/>
  </Tab.Navigator>
}
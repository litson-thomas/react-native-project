import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../pages/home-screen";
import { lightColors } from "../theme/colors";
import SearchScreen from "../pages/search-screen";
import CartScreen from "../pages/cart-screen";
import PersonScreen from "../pages/person-screen";
import DetailScreen from "../pages/details-screen";
import FilterScreen from "../pages/filters-screen";
import { getSessionInfoFromLocal, LightHaptics, removeSessionInfoFromLocal, setSessionInfoInLocal } from "../helpers/common";
import LoginScreen from "../pages/login-screen";
import SignUpScreen from "../pages/signup-screen";
import { Feather } from "@expo/vector-icons";
import AdminScreen from "../pages/admin/admin-screen";
import { useEffect, useState } from "react";
import { supabase } from "../utils/initSupabase";
import Categories from "../pages/admin/category/categories";
import AddCategory from "../pages/admin/category/add-categories";
import AddProduct from "../pages/admin/products/add-product";
import Products from "../pages/admin/products/products";
import Users from "../pages/admin/users/users";
import ViewUser from "../pages/admin/users/viewUser";
import Orders from "../pages/admin/orders/orders";
import AddOrder from "../pages/admin/orders/add-order";
import Sales from "../pages/admin/sales";
import { useSelector, useDispatch } from "react-redux";
import { setUserEmail, setUserFirstName, setUserId, setUserLastName, setUserRole, setUserImage } from "../redux/actions";
import MyProfileScreen from "../pages/my-profile-screen";
import MyFavouritesScreen from "../pages/my-favourites-screen";
import CheckOutScreen from "../pages/check-out-screen";
import MyOrders from "../pages/my-orders";

let navigationOptions = {
  headerBackButtonMenuEnabled: false,
  headerShown: false,
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const AppNavigation = () => {

  let [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {

    // check if user is logged in
    // from the local storage
    const checkSession = async () => {
      let status = await getSessionInfoFromLocal();
      // console.log("status", status);
      if (status) {
        setUser(status);
      }
    }

    checkSession(); // call the check session function

    // listen for auth changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      // if user is logged in
      if (session && session.user) {
        setUser(session.user)
        setSessionInfoInLocal(session);
      }
      // if user is not logged in
      else {
        setUser(null)
        removeSessionInfoFromLocal();
      }
    });

  }, []);

  // useEffect for listening changes to user state
  useEffect(() => {

    // function to set user info to the store
    const setUserState = async (user) => {
      const { data, error } = await supabase
        .from("user")
        .select(`*`)
        .eq("id", user?.id)
        .single();
      if (error) console.log(error);
      else {
        dispatch(setUserId(data.id));
        dispatch(setUserFirstName(data.first_name));
        dispatch(setUserLastName(data.last_name));
        dispatch(setUserRole(data.role));
        dispatch(setUserEmail(user?.email));
        dispatch(setUserImage(data.image));
      }
    }

    // if user is logged in
    if (user) {
      setUserState(user.user);
    }
    // if user is not logged in
    else {
      dispatch(setUserId(""));
      dispatch(setUserFirstName(""));
      dispatch(setUserLastName(""));
      dispatch(setUserRole(""));
      dispatch(setUserEmail(""));
      dispatch(setUserImage(""));
    }

  }, [user]);

  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Group screenOptions={{}}>
        {
          user && (
            <>
              {/* AUTHENTICATED SCREENS */}
              <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={navigationOptions}
              />
              <Stack.Screen
                name="DetailModal"
                component={DetailScreen}
                listeners={{ focus: () => LightHaptics() }}
                options={{ ...navigationOptions, presentation: "card" }}
              />
              <Stack.Screen
                name="FilterModal"
                component={FilterScreen}
                listeners={{ focus: () => LightHaptics() }}
                options={navigationOptions}
              />
              {/* <Stack.Screen
                name="AdminPanel"
                component={AdminScreen}
                listeners={{ focus: () => LightHaptics() }}
                options={navigationOptions}
              /> */}

              <Stack.Screen
                name="MyProfileModal"
                component={MyProfileScreen}
                listeners={{ focus: () => LightHaptics() }}
                options={navigationOptions}
              />

              <Stack.Screen
                name="CheckOut"
                component={CheckOutScreen}
                listeners={{ focus: () => LightHaptics() }}
                options={navigationOptions}
              />
              <Stack.Screen name="AdminPanel" component={AdminScreen} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
              <Stack.Screen name="Categories" component={Categories} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
              <Stack.Screen name="AddCategory" component={AddCategory} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
              <Stack.Screen name="Products" component={Products} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
              <Stack.Screen name="AddProduct" component={AddProduct} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
              <Stack.Screen name="Users" component={Users} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
              <Stack.Screen name="ViewUser" component={ViewUser} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
              <Stack.Screen name="Orders" component={Orders} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
              <Stack.Screen name="AddOrder" component={AddOrder} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
              <Stack.Screen name="Sales" component={Sales} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
              <Stack.Screen name="MyOrders" component={MyOrders} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
            </>
          )
        }
        {
          !user && (
            <>
              {/* NOT AUTHENTICATED SCREENS */}
              <Stack.Screen
                name="LoginModal"
                component={LoginScreen}
                listeners={{ focus: () => LightHaptics() }}
                options={navigationOptions}
              />
              <Stack.Screen
                name="SignUpModal"
                component={SignUpScreen}
                listeners={{ focus: () => LightHaptics() }}
                options={navigationOptions}
              />
            </>
          )
        }
      </Stack.Group>
    </Stack.Navigator>
  </NavigationContainer>
};

// Tabs navigator component
function TabNavigator() {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Search") iconName = "search";
          else if (route.name === "Person") iconName = "user";
          else if (route.name === "Cart") iconName = "shopping-cart";
          else if (route.name === "Favourite") iconName = "heart";
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: lightColors.primary,
        tabBarInactiveTintColor: lightColors.grey,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={navigationOptions}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={navigationOptions}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={navigationOptions}
      />
      <Tab.Screen
        name="Favourite"
        component={MyFavouritesScreen}
        options={navigationOptions}
      />
      <Tab.Screen
        name="Person"
        component={PersonScreen}
        options={navigationOptions}
      />
    </Tab.Navigator>
  );
}

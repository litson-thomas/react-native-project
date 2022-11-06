import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { lightColors } from "../theme/colors";
import { StatusBar } from "expo-status-bar";
import { supabase } from "../utils/initSupabase";
import { useSelector, useDispatch } from "react-redux";
import {setUserId,setUserFirstName,setUserLastName,setUserRole,} from "../redux/actions";
import { commonStyles } from "../theme/styles";
import { Feather } from '@expo/vector-icons'; 
import { removeSessionInfoFromLocal } from "../helpers/common";

const PersonScreen = ({ navigation }) => {
  
  const { userId, userFirstName } = useSelector((state) => state.userReducer);
  
  const dispatch = useDispatch();

  const onLogout = (a) => {
    const logout = async () => {
      const { error } = await supabase.auth.signOut();
      dispatch(setUserId(""));
      dispatch(setUserFirstName(""));
      dispatch(setUserLastName(""));
      dispatch(setUserRole(""));
      navigation.navigate("Home");
      removeSessionInfoFromLocal();
    };
    const result = logout().catch(console.error);
  };
  
  const onLogin = (a) => {
    navigation.navigate("LoginModal");
  };

  const loginButton = () => {
    return <TouchableOpacity style={styles.button} onPress={onLogin}>
      <Text style={styles.buttonLabel}>Login</Text>
    </TouchableOpacity>
  }

  const logoutButton = () => {
    return <TouchableOpacity style={styles.button} onPress={onLogout}>
      <Text style={styles.buttonLabel}>Logout</Text>
    </TouchableOpacity>
  }

  const PersonSingleLink = (title, icon, onClick) => {
    return <TouchableOpacity style={styles.linkWrapper} onPress={onClick}>
      <Feather name={icon} size={25} style={styles.icon} color={lightColors.dark} />
      <Text style={{...styles.link, flexGrow: 1}}>{title}</Text>
      <Feather name="chevron-right" size={20} style={{color: lightColors.grey}} color={lightColors.dark} />
    </TouchableOpacity>
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <Text style={commonStyles.mainHeading}>Hi, {userFirstName}!</Text>
        <View style={styles.buttonWrapper}>
          {PersonSingleLink("My Profile", "user", () => {})}
          {PersonSingleLink("My Orders", "shopping-bag", () => {})}
          {PersonSingleLink("Admin Panel", "database", () => navigation.navigate("AdminPanel"))}
          {PersonSingleLink("Settings", "settings", () => {})}
          {PersonSingleLink("Help", "help-circle", () => {})}
          {PersonSingleLink("About", "info", () => {})}
          {userId === "" ? loginButton() : logoutButton()}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default PersonScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightColors.background,
    height: "100%",
    padding: 20,
    marginTop: 40,
  },
  itemList: {
    width: "100%",
  },
  buttonWrapper: {
    marginTop: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    color: "black",
    fontWeight: "bold",
  },
  linkWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
    paddingBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: lightColors.grey,
  },
  icon: {
    marginRight: 10,
  },
  link: {
    color: lightColors.dark,
    fontSize: 16,
    fontFamily: commonStyles.fontMedium,
  },
});

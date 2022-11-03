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
import {
  setUserId,
  setUserFirstName,
  setUserLastName,
  setUserRole,
} from "../redux/actions";

const PersonScreen = ({ navigation }) => {
  const { userId, userFirstName } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const onLogout = (a) => {
    const logout = async () => {
      const { error } = await supabase.auth.signOut();
      console.log(`Succesfully log out ${userFirstName}`);
      dispatch(setUserId(""));
      dispatch(setUserFirstName(""));
      dispatch(setUserLastName(""));
      dispatch(setUserRole(""));
      navigation.navigate("Home");
    };
    const result = logout().catch(console.error);
  };
  const onLogin = (a) => {
    navigation.navigate("LoginModal");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <Text>Person</Text>
        {userId === "" ? (
          <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text style={styles.buttonLabel}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={onLogout}>
            <Text style={styles.buttonLabel}>Logout</Text>
          </TouchableOpacity>
        )}
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
});

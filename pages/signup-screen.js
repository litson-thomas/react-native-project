import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { lightColors } from "../theme/colors";
import { StatusBar } from "expo-status-bar";
import { supabase } from "../utils/initSupabase";
import { useDispatch } from "react-redux";
import {
  setUserId,
  setUserFirstName,
  setUserLastName,
  setUserRole,
} from "../redux/actions";
import BackButton from '../components/common/back-button';

const SignUpScreen = ({ navigation }) => {
  //const [authUser, setAuthUser] = useState();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("vergel.delacruz@jll.com");
  const [password, setPassword] = useState("password");
  const [firstName, setFirstName] = useState("Elon");
  const [lastName, setLastName] = useState("Musk");

  //const [auth, setAuth] = useState(true);
  const onSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email, //"c0835208@mylambton.ca"
      password: password,
    });
    if (error) {
      console.log(error);
      alert("Something went wrong. Please try again");
    } else {
      console.log("Succesfully sign up user id " + data.user.id);
      const { error } = await supabase.from("user").insert({
        id: data.user.id,
        first_name: firstName,
        last_name: lastName,
        role: "Member",
        email: email,
      });
      dispatch(setUserId(data.id));
      dispatch(setUserFirstName(firstName));
      dispatch(setUserLastName(lastName));
      dispatch(setUserRole("Member"));
      navigation.navigate("Home");
    }
    //console.log("Succesfully logged in user id " + user.id);
  };

  const onExistingUser = () => {
    navigation.navigate("LoginModal");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <SafeAreaView>
            <BackButton navigation={navigation}></BackButton>

            <Text style={styles.title}>Sign up</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your First Name"
                value={firstName}
                onChangeText={(a) => setFirstName(a)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your Last Name"
                value={lastName}
                onChangeText={(a) => setLastName(a)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Your Email"
                value={email}
                onChangeText={(a) => setEmail(a)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Your Password"
                style={styles.input}
                value={password}
                onChangeText={(a) => setPassword(a)}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={onSignUp}>
              <Text style={styles.buttonLabel}>Register</Text>
            </TouchableOpacity>
            <View style={styles.linksWrapper}>
              <TouchableOpacity onPress={onExistingUser}>
                <Text>Existing User?</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightColors.background,
    height: "100%",
    padding: 20,
    marginTop: 40,
    display: "flex",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 20,
  },
  inputWrapper: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 60,
    padding: 10,
    backgroundColor: lightColors.light,
  },
  button: {
    marginVertical: 10,
    width: "100%",
    height: 60,
    backgroundColor: lightColors.dark,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    color: "white",
    fontWeight: "400",
    fontSize: 20,
  },
  linksWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

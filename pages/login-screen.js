import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
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

const LoginScreen = ({ navigation }) => {
  const [authUser, setAuthUser] = useState();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth, setAuth] = useState(true);
  const onLogin = () => {
    const login = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email: email, //"c0835208@mylambton.ca"
        password: password,
      });
      if (error) {
        alert("Invalid Credentials. Please try again");
        setEmail("");
        setPassword("");
      } else {
        setAuthUser(user);
      }
      //console.log("Succesfully logged in user id " + user.id);
    };
    const result = login().catch(console.error);
  };

  useEffect(() => {
    if (authUser !== undefined) {
      const fetchUser = async () => {
        const { data, error } = await supabase
          .from("user")
          .select(`*`)
          .eq("id", authUser.id)
          .single();
        console.log("Succesfully log in " + data.first_name);
        dispatch(setUserId(data.id));
        dispatch(setUserFirstName(data.first_name));
        dispatch(setUserLastName(data.last_name));
        dispatch(setUserRole(data.role));
        navigation.navigate({
          name: "Home",
          params: {},
          merge: true,
        });
      };
      fetchUser().catch(console.error);
    }
  }, [authUser]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <Text style={styles.title}>Login to Continue</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="eg. abcd@gmail.com"
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
        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonLabel}>Login</Text>
        </TouchableOpacity>
        <View style={styles.linksWrapper}>
          <TouchableOpacity>
            <Text>New User?</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;

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

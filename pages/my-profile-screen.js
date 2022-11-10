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
import { useDispatch, useSelector } from "react-redux";
import {
  setUserId,
  setUserFirstName,
  setUserLastName,
  setUserRole,
} from "../redux/actions";
import BackButton from "../components/common/back-button";

const MyProfileScreen = ({ navigation }) => {
  const { userId, userFirstName, userLastName, userRole, userEmail } =
    useSelector((state) => state.userReducer);

  const [email, setEmail] = useState(userEmail);
  const [firstName, setFirstName] = useState(userFirstName);
  const [lastName, setLastName] = useState(userLastName);

  const onBack = () => {
    navigation.goBack();
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <SafeAreaView>
          <BackButton navigation={navigation}></BackButton>

          <Text style={styles.title}>My Profile</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Your First Name"
              value={firstName}
              onChangeText={(a) => setFirstName(a)}
              editable={false}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Last Name"
              value={lastName}
              onChangeText={(a) => setLastName(a)}
              editable={false}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              value={email}
              onChangeText={(a) => setEmail(a)}
              editable={false}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={onBack}>
              <Text style={styles.buttonLabel}>Back</Text>
            </TouchableOpacity>
            {/* <View style={styles.linksWrapper}>
              <TouchableOpacity onPress={onExistingUser}>
                <Text>Existing User?</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Forgot Password?</Text>
              </TouchableOpacity>
            </View> */}
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default MyProfileScreen;

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

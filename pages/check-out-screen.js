import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
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
import BackButton from '../components/common/back-button';
import { NavigationHelpersContext } from "@react-navigation/native";

const CheckOutScreen = ({ navigation }) => {

  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiryDate, setCardExpiryDate] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [cardZipCode, setCardZipCode] = useState("");
  const [cardCountry, setCardCountry] = useState("");
  const { userId } = useSelector((state) => state.userReducer);

  const onPayDelete = async () => {
    if (cardNumber.length === 0) {
      ToastAndroid.show("Please enter card number", ToastAndroid.SHORT);
      return;
    } else if (cardExpiryDate.length === 0) {
      ToastAndroid.show("Card expiry date is required", ToastAndroid.SHORT);
      return;
    } else if (cardCVV.length === 0) {
      ToastAndroid.show("Card CVV is required", ToastAndroid.SHORT);
      return;
    } else if (cardZipCode.length === 0) {
      ToastAndroid.show("Card zip code is required", ToastAndroid.SHORT);
      return;
    } else {
      const { data, error } = await supabase
        .from("shopping_cart")
        .delete()
        .eq("customer", userId);
      if (error) {
        console.log(error);
        alert("Unable to process the payment");
      } else {
        ToastAndroid.show("Payment successful", ToastAndroid.SHORT);
        console.log("Succesfully deleted cart items");
        navigation.navigate("Home");
      }
    }
  };


  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <SafeAreaView>
          <BackButton navigation={navigation}></BackButton>

          <Text style={styles.title}>Check Out</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Card Information</Text>

            <TextInput
              keyboardType="numeric"
              style={styles.input}
              placeholder="Card Number"
              value={cardNumber}
              onChangeText={(a) => setCardNumber(a)}
            />
          </View>

          <View style={styles.monthcvvWrapper}>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              placeholder="MM/YY"
              value={cardExpiryDate}
              onChangeText={(a) => setCardExpiryDate(a)}
            />
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              placeholder="CVV"
              value={cardCVV}
              onChangeText={(a) => setCardCVV(a)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Country/Region</Text>
            <TextInput
              style={styles.input}
              placeholder="Canada"
              value={cardCountry}
              onChangeText={(a) => setCardCountry(a)}
            />
          </View>

          <TextInput
            placeholder="Zip"
            style={styles.input}
            value={cardZipCode}
            onChangeText={(a) => setCardZipCode(a)}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onPayDelete();
            }}
          >
            <Text style={styles.buttonLabel}>Pay $900</Text>
          </TouchableOpacity>

        </SafeAreaView>
      </View>
    </ScrollView >
  );
};

export default CheckOutScreen;

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
    marginVertical: 2,
  },
  monthcvvWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
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

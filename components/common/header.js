import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { lightColors } from "../../theme/colors";
import { commonStyles } from "../../theme/styles";

const Header = ({ user }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.subTitle}>Welcome</Text>
        <Text style={styles.title}>Hi, {user}</Text>
      </View>
      <View>
        <TouchableOpacity>
          <Image
            style={styles.avatar}
            source={{ uri: "https://i.pravatar.cc/50?img=2" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: lightColors.borderRadius,
  },
  subTitle: {
    color: lightColors.darkGrey,
    fontFamily: commonStyles.fontRegular,
  },
  title: {
    color: lightColors.dark,
    fontSize: 18,
    fontFamily: commonStyles.fontMedium,
  },
});

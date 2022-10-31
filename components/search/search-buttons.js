import React from "react";
import { lightColors } from "../../theme/colors";
import { StyleSheet, Text, View, TouchableOpacity, Pressable, TouchableWithoutFeedback } from "react-native";

const SearchButtons = ({ onClearAll, onFilter }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClearAll} style={[styles.button]}>
        <Text>Clear All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onFilter}
        style={[styles.button, { backgroundColor: lightColors.dark }]}
      >
        <Text style={styles.text}>Filters</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SearchButtons;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom:0,
    left:0,
    right:0,
  },
  button: {
    width: "47%",
    alignContent: "center",
    alignItems: "center",
    marginTop: 10,
    padding: 20,
    backgroundColor: lightColors.light,
    borderRadius: lightColors.borderRadius,
  },
  text: {
    color: lightColors.light,
  },
});

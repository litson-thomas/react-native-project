import React from "react";
import { lightColors } from "../../theme/colors";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const FilterButtons = ({ onClearAll, onApply }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClearAll} style={[styles.button]}>
        <Text>Clear All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onApply}
        style={[styles.button, { backgroundColor: lightColors.dark }]}
      >
        <Text style={styles.text}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};
export default FilterButtons;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
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

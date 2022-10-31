import React from "react";
import { lightColors } from "../../theme/colors";
import { commonStyles } from "../../theme/styles";
import { StyleSheet, Text, View } from "react-native";

const SearchHint = ({ count }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.showResultsText}>Showing {count} results</Text>
    </View>
  );
};
export default SearchHint;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    marginTop: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  showResultsText: {
    height: 20,
    fontSize: 13,
    fontFamily: commonStyles.fontRegular,
    color: lightColors.darkGrey,
  },
});

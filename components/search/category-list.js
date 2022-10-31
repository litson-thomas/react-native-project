import React from "react";
import { lightColors } from "../../theme/colors";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CategoryList = ({ data, selectedCategoryId, onSelectedCategory }) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.category,
              selectedCategoryId == item.id
                ? { backgroundColor: lightColors.dark }
                : { backgroundColor: lightColors.light },
            ]}
            onPress={onSelectedCategory.bind(this, item)}
          >
            <Text
              style={
                selectedCategoryId == item.id
                  ? { color: lightColors.light }
                  : { color: lightColors.dark }
              }
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};
export default CategoryList;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 10,
    marginBottom: 10,
  },
  category: {
    flex: 1,
    height: 40,
    padding: 10,
    marginRight: 10,
    borderRadius: lightColors.borderRadius,
    justifyContent: "center",
    alignItems: "center",
  },
});

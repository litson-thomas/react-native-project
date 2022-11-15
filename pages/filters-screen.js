import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { lightColors } from "../theme/colors";
import { StatusBar } from "expo-status-bar";
// import BackButton from "../components/common/back-button";
// import { FontAwesome } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import FilterButtons from "../components/search/filter-buttons";
import Slider from "@react-native-community/slider";
import { commonStyles } from "../theme/styles";
import BackButton from "../components/common/back-button";

const FilterScreen = ({ navigation, route }) => {
  const [productTypes, setProductTypes] = useState([]);
  const [maximumPrice, setMaximumPrice] = useState(0);

  const [productSizes, setProductSizes] = useState([]);

  useEffect(() => {
    //console.log("useEffect productTypes " + route.params?.productTypes);
    if (route.params?.productTypes) {
      setProductTypes(route.params?.productTypes);
    }
    //console.log("useEffect price " + route.params?.price);
    if (route.params?.price) {
      setMaximumPrice(route.params?.price);
    }
    if (route.params?.productSizes) {
      setProductSizes(route.params?.productSizes);
    }
  }, [
    route.params?.productTypes,
    route.params?.price,
    route.params?.productSizes,
  ]);

  const onClearAll = () => {
    setMaximumPrice(0);
    setProductTypes(productTypes.map((a) => ({ ...a, isChecked: false })));
    setProductSizes(productSizes.map((a) => ({ ...a, isChecked: false })));
  };
  const onApply = () => {
    //console.log("onApply " + productTypes);
    navigation.navigate({
      name: "Search",
      params: {
        productTypes: productTypes,
        price: maximumPrice,
        productSizes: productSizes,
      },
      merge: true,
    });
  };
  const handleChange = (id) => {
    //console.log(id);
    let temp = productTypes.map((product) => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setProductTypes(temp);
  };
  const handleChangeProductSize = (id) => {
    // console.log(id);
    let temp = productSizes.map((item) => {
      if (id === item.name) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });
    setProductSizes(temp);
  };
  const renderProductTypes = (data) => {
    //console.log("renderProductTypes " + renderData);
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={handleChange.bind(this, item.id)}>
            <View style={styles.section}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                color={item.isChecked ? lightColors.dark : undefined}
                onValueChange={() => {
                  handleChange(item.id);
                }}
              />
              <Text style={styles.text}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };

  const renderProductSizes = (data) => {
    return (
      <FlatList
        horizontal={true}
        data={data}
        keyExtractor={(item) => item.name.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.size,
              productSizes.filter((a) => a.name === item.name)[0].isChecked ===
              true
                ? {
                    backgroundColor: lightColors.light,
                    borderColor: lightColors.dark,
                  }
                : {
                    backgroundColor: lightColors.background,
                    borderColor: lightColors.background,
                  },
            ]}
            onPress={handleChangeProductSize.bind(this, item.name)}
          >
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BackButton navigation={navigation}/>
      <SafeAreaView>
        <Text style={{...styles.title, marginTop: 15}}>Filters</Text>
        <View style={styles.cardWrapper}>
          <View style={styles.header}>
            <Text style={styles.subTitle}>Types</Text>
            {/* <FontAwesome
              name="caret-down"
              size={18}
              color={lightColors.primary}
            /> */}
          </View>
          <View>{renderProductTypes(productTypes)}</View>
        </View>

        <View style={styles.cardWrapper}>
          <View style={styles.header}>
            <Text style={styles.subTitle}>Price</Text>
            {/* <FontAwesome
              name="caret-down"
              size={18}
              color={lightColors.primary}
            /> */}
          </View>
          <View style={styles.sliderWrapper}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={500}
              minimumTrackTintColor={lightColors.dark}
              maximumTrackTintColor={lightColors.grey}
              value={maximumPrice}
              onValueChange={(value) => setMaximumPrice(value)}
              step={10}
            />
            <Text style={styles.price}>{`$ ${maximumPrice}`}</Text>
          </View>
        </View>

        <View style={styles.cardWrapper}>
          <View style={styles.header}>
            <Text style={styles.subTitle}>Sizes</Text>
            {/* <FontAwesome
              name="caret-down"
              size={18}
              color={lightColors.primary}
            /> */}
          </View>
          <View style={styles.sizesWrapper}>
            {renderProductSizes(productSizes)}
          </View>
        </View>

        <FilterButtons onClearAll={onClearAll} onApply={onApply} />
      </SafeAreaView>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightColors.background,
    height: "100%",
    padding: 20,
    marginTop: 40,
    display: "flex",
    flex: 1,
    marginBottom: 220,
  },
  title: {
    color: lightColors.primary,
    fontSize: 26,
    //fontWeight: "400",
    //fontFamily: commonStyles.fontFamily
  },
  subTitle: {
    color: lightColors.primary,
    fontSize: 14,
    //fontWeight: "400",
    //fontFamily: commonStyles.fontFamily
  },
  cardWrapper: {
    backgroundColor: lightColors.light,
    borderRadius: lightColors.borderRadius,
    padding: 20,
    marginBottom: 0,
    marginTop: 10,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
    borderBottomColor: lightColors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
    color: lightColors.primary,
    textAlign: "center",
    //fontWeight: "600",
  },
  sliderWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  slider: {
    width: "90%",
    height: 40,
  },
  price: {
    // paddingLeft:10,
    fontSize: 14,
  },

  sizesWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  size: {
    flex: 1,
    height: 40,
    width: 40,
    padding: 10,
    marginRight: 10,
    borderRadius: lightColors.borderRadius,
    borderWidth: 1,
  },
});

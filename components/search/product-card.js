import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { lightColors } from "../../theme/colors";
import { commonStyles } from "../../theme/styles";
import Constants from "expo-constants";

const ProductCard = ({ data, favouriteProducts,  onFavourite, navigation }) => {
  const [borderColor, setBorderColor] = useState(lightColors.light);

  const onCardClick = () => {
    setBorderColor(lightColors.primary);
  };

  const onCardPressOut = () => {
    setBorderColor(lightColors.light);
  };
  //console.log("In product card: " + favouriteProducts);
  var isFavourite = favouriteProducts.includes(data.id) ? 'heart':'heart-o';
  return (
    <TouchableOpacity
      onPressIn={onCardClick}
      onPressOut={onCardPressOut}
      onPress={() => {
        navigation.navigate("DetailModal");
      }}
    >
      <View
        style={{
          ...styles.cardWrapper,
          ...{ borderWidth: 2, borderColor: borderColor },
        }}
      >
        <View style={styles.header}>
          <View style={styles.ratingWrapper}>
            <Text style={styles.rating}>{data.rating}</Text>

            <FontAwesome name="star" size={15} color={lightColors.primary} />
          </View>
          <TouchableOpacity onPress={onFavourite.bind(this, data, isFavourite)}>
          <FontAwesome name={isFavourite} size={20} color={lightColors.primary} />
          </TouchableOpacity>
        </View>
        <Image
          style={styles.image}
          source={{
            uri: `${Constants.expoConfig.extra.productUrl}/${data.images[0]}`,
          }}
        />
        <View style={styles.detailsWrapper}>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.subTitle}>{data.description}</Text>
          <Text style={styles.price}>${data.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: lightColors.light,
    borderRadius: lightColors.borderRadius,
    padding: 20,
    marginBottom: 0,
    marginTop: 10,
    width: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    color: lightColors.primary,
    marginRight: 5,
  },
  image: {
    width: "100%",
    height: 120,
    margin: 10,
  },
  detailsWrapper: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    color: lightColors.primary,
    fontSize: 15,
    fontWeight: "bold",
  },
  subTitle: {
    color: lightColors.darkGrey,
    fontSize: 12,
    fontFamily: commonStyles.fontRegular,
    marginBottom: 10,
  },
  price: {
    color: lightColors.primary,
    fontSize: 18,
    fontFamily: commonStyles.fontMedium,
  },
});

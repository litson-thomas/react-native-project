import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
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
  setUserFavourites,
} from "../redux/actions";
import BackButton from "../components/common/back-button";
import ProductCard from "../components/search/product-card";

const MyFavouritesScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favouriteProducts, setFavouriteProducts] = useState([]);
  const dispatch = useDispatch();

  const { userId, userFavourites } = useSelector((state) => state.userReducer);

  useEffect(() => {
    //console.log(`called my-favourites ${userFavourites}`);
    fetchFavourites();
  }, [userFavourites]);

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    //console.log("fetchFavourites in my-favourites-screen");
    const { data, error } = await supabase
      .from("favourite")
      .select(`product (*)`)
      .eq("user", userId);
    //console.log(data);
    setProducts([...data.map((a) => a.product)]);
    setFavouriteProducts([...data.map((a) => a.product.id)]);
    console.log(`fetchFavourites in my-favourites-screen ${[...data.map((a) => a.product.id)]}`);

  };

  const onFavourite = (data, isFavourite) => {
    if (isFavourite === "heart-o") {
      const insertFavourite = async () => {
        const { error } = await supabase.from("favourite").insert({
          product: data.id,
          user: userId,
        });
        if (error) {
          console.log(error);
        } else {
          setFavouriteProducts([...favouriteProducts, data.id]);
          dispatch(setUserFavourites([...favouriteProducts, data.id]));
        }
      };
      insertFavourite();
    } else {
      const deleteFavourite = async () => {
        const { error } = await supabase
          .from("favourite")
          .delete()
          .eq("product", data.id)
          .eq("user", userId);
        if (error) {
          console.log(error);
        } else {
          setFavouriteProducts(
            ...[favouriteProducts.filter((a) => a !== data.id)]
          );
          dispatch(
            setUserFavourites([
              ...favouriteProducts.filter((a) => a !== data.id),
            ])
          );
        }
      };
      result = deleteFavourite();
    }
    fetchFavourites().catch(console.error);
  };
  function header() {
    return (
      <View style={{ backgroundColor: lightColors.background }}>
        <Text style={styles.title}>My Favourites</Text>
      </View>
    );
  }
  const emptyList = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>No Data Found</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 11, marginHorizontal: 20 }}>
          {loading ? (
            <ActivityIndicator
              style={styles.loader}
              size="large"
              visible={loading}
              textContent={"Loading..."}
              textStyle={styles.spinnerTextStyle}
            />
          ) : (
            <FlatList
              contentContainerStyle={{ flexGrow: 1 }}
              ListEmptyComponent={emptyList}
              ListHeaderComponent={header()}
              stickyHeaderHiddenOnScroll={true}
              stickyHeaderIndices={[0]}
              showsVerticalScrollIndicator={false}
              horizontal={false}
              numColumns={2}
              data={products}
              renderItem={({ item }) => (
                <View style={styles.product}>
                  <ProductCard
                    data={item}
                    favouriteProducts={favouriteProducts}
                    onFavourite={onFavourite}
                    navigation={navigation}
                  ></ProductCard>
                </View>
              )}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MyFavouritesScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: lightColors.background,
    marginTop: 60,
    display: "flex",
    flex: 1,
  },

  loader: {
    display: "flex",
    flexGrow: 1,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },

  product: {
    width: "48%",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 20,
  },
});

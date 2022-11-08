import { React, useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  FlatList,
  Keyboard,
} from "react-native";
import { lightColors } from "../theme/colors";
import { StatusBar } from "expo-status-bar";
import { supabase } from "../utils/initSupabase";
import Search from "../components/common/search";
import CategoryList from "../components/search/category-list";
import SearchHint from "../components/search/search-hint";
import SearchButtons from "../components/search/search-buttons";
import ProductCard from "../components/search/product-card";
import { useSelector } from 'react-redux';

const SearchScreen = ({ navigation, route }) => {
  const [searchString, setSearchString] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [favouriteProducts, setFavouriteProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const initialCategory = 0;
  const initialPrice = 0;
  const [loading, setLoading] = useState(false);

  const [price, setPrice] = useState(initialPrice);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { userId } = useSelector((state) => state.userReducer);

  const SIZES = [
    { name: "XS", isChecked: false },
    { name: "S", isChecked: false },
    { name: "M", isChecked: false },
    { name: "L", isChecked: false },
    { name: "XL", isChecked: false },
  ];
  const [productSizes, setProductSizes] = useState(SIZES);

  const onSearch = (item) => {
    setSearchString(item);
  };
  const onSelectedCategory = (item) => {
    setSelectedCategoryId(item.id);
  };
  const onClearAll = (item) => {
    setProductTypes(productTypes.map((a) => ({ ...a, isChecked: false })));
    setProductSizes(productSizes.map((a) => ({ ...a, isChecked: false })));
    setSelectedCategoryId(initialCategory);
    setSearchString("");
    setPrice(initialPrice);
  };
  const onFavourite = (data, isFavourite) => {
    if (isFavourite === "heart-o") {
      const insertFavourite = async () => {
        const { error } = await supabase.from("favourite").insert({
          product: data.id,
          user: userId,
        });
      };
      const result = insertFavourite().catch(console.error);
      setFavouriteProducts([...favouriteProducts, data.id]);
    } else {
      const deleteFavourite = async () => {
        const { error } = await supabase
          .from("favourite")
          .delete()
          .eq("product", data.id)
          .eq("user", userId);
      };
      const result = deleteFavourite().catch(console.error);
      setFavouriteProducts(favouriteProducts.filter((a) => a !== data.id));
    }
  };
  const onFilter = () => {
    //console.log("onFilter " + productTypes);
    navigation.navigate({
      name: "FilterModal",
      params: {
        productTypes: productTypes,
        price: price,
        productSizes: productSizes,
      },
    });
  };

  useEffect(() => {
    //console.log(`search-screen useEffect price ${route.params?.price}`)
    if (route.params?.productTypes) {
      setProductTypes(route.params?.productTypes);
    }
    if (route.params?.price >= initialPrice) {
      setPrice(route.params?.price);
    }
    if (route.params?.productSizes) {
      setProductSizes(route.params?.productSizes);
    }
  }, [
    route.params?.productTypes,
    route.params?.price,
    route.params?.productSizes,
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("category")
        .select(`id, name`)
        .order("name", "ascending");
      setCategories([{ id: initialCategory, name: "All" }, ...data]);
      setSelectedCategoryId(initialCategory);
    };
    const result = fetchCategories().catch(console.error);
    const fetchFavourites = async () => {
      const { data, error } = await supabase
        .from("favourite")
        .select(`product`)
        .eq("user", userId);
      setFavouriteProducts(data.map((a) => a.product));
    };
    const resultsFavourties = fetchFavourites().catch(console.error);
    // const {data, error} = ApiRequest.fetchFavourites();
    // setFavouriteProducts(data.map((a) => a.product));

    const fetchProductTypes = async () => {
      const { data, error } = await supabase
        .from("product_type")
        .select(`id, name`)
        .order("name", "ascending");
      setProductTypes(data.map((a) => ({ ...a, isChecked: false })));
    };
    const resultProductTypes = fetchProductTypes().catch(console.error);
  }, []);

  useEffect(() => {
    //setLoading(true);
    const fetchProducts = async () => {
      let query = supabase
        .from("product")
        .select(`id, name, description, price, rating, images`)
        .order("name", "ascending");
      if (selectedCategoryId !== 0) {
        query = query.eq("category", selectedCategoryId);
        console.log(`Search Category: ${selectedCategoryId}`);
      }
      if (searchString !== "") {
        query = query.like("name", `%${searchString}%`);
        console.log(`Search String: ${searchString}`);
      }
      if (productTypes.filter((a) => a.isChecked).length > 0) {
        //console.log(productTypes.filter((a) => a.isChecked).map((a) => a.id));
        query = query.in(
          "type",
          productTypes.filter((a) => a.isChecked).map((a) => a.id)
        );
        console.log(
          `Selected Product Types: ${productTypes
            .filter((a) => a.isChecked)
            .map((a) => a.id)}`
        );
      }
      //console.log(`fetchProducts price: ${price}`);
      if (price > initialPrice) {
        query = query.lte("price", price);
        console.log(`Selected Price: ${price}`);
      }

      if (productSizes.filter((a) => a.isChecked).length > 0) {
        //console.log(productTypes.filter((a) => a.isChecked).map((a) => a.id));
        query = query.overlaps(
          "sizes",
          //["XS"]
          productSizes.filter((a) => a.isChecked).map((a) => a.name)
        );
        console.log(
          "Selected Product Sizes: " +
            new Array(
              productSizes.filter((a) => a.isChecked).map((a) => a.name)
            )
        );
        
      }
      const { data, error } = await query;
      //console.log(data);
      setProducts(data);
      //setLoading(false);
    };
    const result = fetchProducts().catch(console.error);
  }, [selectedCategoryId, searchString, productTypes, price, productSizes]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  function header() {
    return (
      <View style={{ backgroundColor: lightColors.background }}>
        <Search searchString={searchString} onSearch={onSearch} />
        <SearchHint count={products === null ? 0 : products.length} />
        <CategoryList
          data={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectedCategory={onSelectedCategory}
        />
      </View>
    );
  }

  function footer() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: lightColors.background,
        }}
      >
        <SearchButtons onClearAll={onClearAll} onFilter={onFilter} />
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
        <View style={{ flex: 11, marginHorizontal: 20, }}>
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
        <View style={{ flex: 1 }}>
          {!isKeyboardVisible && (
            <SearchButtons onClearAll={onClearAll} onFilter={onFilter} />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SearchScreen;

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
});

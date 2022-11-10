import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, } from 'react-native';
import { lightColors } from '../theme/colors';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/common/back-button';
import { supabase } from "../utils/initSupabase";
import { commonStyles } from '../theme/styles';
import Constants from "expo-constants";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from 'react-redux';



const DetailScreen = ({ navigation, route }) => {


    const { userId } = useSelector((state) => state.userReducer);
    const [productSizes, setProductSizes] = useState([]);
    const [product, setProduct] = useState([]);
    const [check, setCheck] = useState("");
    const [favouriteProducts, setFavouriteProducts] = useState([]);
    var isFavourite = favouriteProducts.includes(product.id) ? 'heart' : 'heart-o';

    useEffect(() => {

        fetchProduct(route.params?.id);
        console.log(route.params?.id);
        
    }, [route.params?.id]);

 


    const onFavourite = (data, isFavourite) => {
        if (isFavourite === "heart-o") {
            const insertFavourite = async () => {
                const { error } = await supabase.from("favourite").insert({
                    product: product.id,
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
  const handleChangeProductSize = (id) => {
 setCheck(id);
      
    
  };
    const renderProductSizes = (data) => {
        
       
        return (
            <FlatList
            horizontal={true}
            data={data}
        
                renderItem={({ item }) => (
                    
                    <TouchableOpacity
                        style={[
                            styles.size,
                            check===item
                                ? {
                                    backgroundColor: lightColors.light,
                                    borderColor: lightColors.dark,
                                    
                                }
                                : {
                                    backgroundColor: lightColors.background,
                                    borderColor: lightColors.background,
                                },
                        ]}
                    onPress={handleChangeProductSize.bind(this, item)}
                    >
                        <Text style={styles.text}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        );
    };



    const fetchProduct = async (id) => {
        const { data, error } = await supabase
            .from("product")
            .select(`*,type{name}`)
            .eq("id", id);
        setProduct(data[0]);
        console.log(data[0]);
        setProductSizes(data[0].sizes.map((a) => ({ name:a, isChecked: false })));
       
        console.log("fetch");

    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <SafeAreaView>
                <BackButton navigation={navigation}></BackButton>

                <Image style={styles.image} source={{
                    uri: `${Constants.expoConfig.extra.productUrl}/${product.images}`,
                }} />




                <View style={styles.detailsBox}>
                    <View style={styles.detailWrapper}>
                        <View style={styles.nameprice}>

                            <View style={styles.detailsWrapper}>
                                <Text style={styles.title}>{product.name}</Text>


                                <Text style={styles.subTitle}>Regular Shoes</Text>
                            </View>
                            <Text style={styles.price}>${product.price}</Text>
                        </View>


                        <View style={styles.cardWrapper}>
                            <View style={styles.header}>
                                <Text style={styles.smalltitle}> Select Sizes</Text>

                            </View>
                            <View style={styles.sizesWrapper}>
                                {renderProductSizes(product.sizes)}
                            </View>
                        </View>
                        <View>
                            <Text style={styles.smalltitle}>Description</Text>
                        </View>
                        <View>
                            <Text style={styles.desc}>{product.description}</Text>
                        </View>
                        <View style={styles.btncontainer}>
                            <TouchableOpacity
                                //onPress={onApply}
                                style={[styles.button, { backgroundColor: lightColors.dark }]}
                            >
                                <Text style={{
                                    color: lightColors.light,
                                }}>Add to Cart</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onFavourite.bind(this, product, isFavourite)}>
                                <FontAwesome name={isFavourite} size={40} color={lightColors.primary} />
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>

            </SafeAreaView>
        </View>
    );
}

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: lightColors.background,
        height: '100%',

        marginTop: 20,
    },
    itemList: {
        width: '100%',
    },
    detailsBox: {
        backgroundColor: "white",
        width: "100%",
        // marginTop: 10,
        borderRadius: 20,
        height: "100%",
    },

    cardWrapper: {
        backgroundColor: lightColors.light,
        borderRadius: lightColors.borderRadius,

        marginBottom: 0,
        marginTop: 10,
        width: "100%",
    },
    text: {
        fontSize: 14,
        paddingTop: 10,
        color: lightColors.primary,
        textAlign: "center",
        justifyContent: 'center',
        fontWeight: "600",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 0,
        borderBottomColor: lightColors.grey,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 10,
    },
    sliderWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    sizesWrapper: {
        display: "flex",

        marginBottom: 10,
    },
    size: {
        flex: 1,
        height: 40,
        width: 40,

        marginRight: 10,
        borderRadius: lightColors.borderRadius,
        borderWidth: 1,
    },
    checkbox: {
        margin: 8,
        borderRadius: 10,
    },
    detailWrapper: {
        padding: 20,
    },
    nameprice: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexGrow: 1,
        marginLeft: 5,
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontFamily: commonStyles.fontSemiBold,
        color: lightColors.dark,
    },
    subTitle: {
        fontSize: 14,
        fontFamily: commonStyles.fontMedium,
        color: lightColors.darkGrey,
    },
    price: {
        fontSize: 24,
        fontFamily: commonStyles.fontExtraBold,
        color: lightColors.dark,
        marginRight: 0,
    },
    smalltitle: {
        fontSize: 16,
        fontFamily: commonStyles.fontSemiBold,
        color: lightColors.dark,
    },
    desc: {
        fontSize: 15,
        marginTop: 7,
        fontFamily: commonStyles.fontLight,
        color: lightColors.dark,
    },
    image: {
        width: "100%",
        height: 300,
        justifyContent: 'center',
        alignContent: 'center',
        //resizeMode: 'contain',
        // marginRight: 10,
    },
    btncontainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    button: {
        width: "80%",
        alignContent: "center",
        alignItems: "center",
        marginTop: 10,
        padding: 20,
        backgroundColor: lightColors.light,
        borderRadius: lightColors.borderRadius,
    },

});

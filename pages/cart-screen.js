import React from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { lightColors } from '../theme/colors';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/common/back-button';
import CartItemCard from '../components/home/cart-item-card';
import { supabase } from "../utils/initSupabase";
import { useEffect } from 'react';
import Constants from "expo-constants";
import {
    setUserCart
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { TabRouter } from '@react-navigation/native';
import { GoTrueAdminApi } from '@supabase/supabase-js';
import { commonStyles } from '../theme/styles';

const CartScreen = ({ navigation, route }) => {
    const [borderColor, setBorderColor] = useState(lightColors.light);
    const [cartProducts, setCartProducts] = useState([]);
    let [priceDetails, setPriceDetails] = useState({
        total: 0,
        devlivery: 0,
        grandTotal: 0
    });
    const { userId, userCart } = useSelector((state) => state.userReducer);
    let [cartItems, setCartItems] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('CartScreen useEffect');
        getCartItems();
        return () => {
            console.log('CartScreen useEffect cleanup');
            setCartItems([]);
        }
    }, []);

    const getCartItems = async () => {
        const { data, error } = await supabase
            .from("shopping_cart")
            .select(`
                *,
                product (
                    *
                )
            `)
            .eq("customer", userId);
        if (error) {
            console.log("ERROR WHILE FETCHING CART ITEMS" + error.message);
        } else {
            dispatch(setUserCart(data));
            setCartItems(data);
        }
    }

    useEffect(() => {
        
    }, [cartItems]);

    useEffect(() => {
        // console.log("userCart", userCart.map((a) => a.product.name));
        setCartItems(userCart);
    }, [userCart]);

    const cartItem = (item, index) => {
        return <View key={item.id} style={{...itemStyles.cardWrapper, flex: 1}}>
            <View style={{...itemStyles.detailsWrapper, flex: 1}}>
                <Image style={itemStyles.image} source={{
                    uri: `${Constants.expoConfig.extra.productUrl}/${item.product.images[0]}`,
                }} />
            </View>
            <View style={{...itemStyles.detailsWrapper, flex: 3}}>
                <Text style={itemStyles.title} numberOfLines={1}>{item.product.name}</Text>
                <Text style={itemStyles.price}>${item.product.price}</Text>
            </View>
            <View style={{...itemStyles.buttonWrapper, flex: 1}}>
                <TouchableOpacity style={itemStyles.button} onPress={() => {
                    setCartItems(cartItems.map((x) => x.id == item.id) ? cartItems.map((x) => x.id == item.id ? { ...x, quantity: x.quantity - 1 } : x) : cartItems);
                }}>
                    <Text style={itemStyles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={itemStyles.itemsCount}>{item.quantity}</Text>
                <TouchableOpacity style={itemStyles.button} onPress={() => {
                    setCartItems(cartItems.map((x) => x.id == item.id) ? cartItems.map((x) => x.id == item.id ? { ...x, quantity: x.quantity + 1 } : x) : cartItems);
                }}>
                    <Text style={itemStyles.buttonText}>+</Text>
                </TouchableOpacity >
            </View>
        </View>
    }

    const addOrder = async () => {
        // add new order
        for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            const { data, error } = await supabase
            .from('order_detail')
            .insert([{ 
                id: new Date().getTime(),
                user: item.customer.toString(),
                quantity: item.quantity,
                customer_order: null,
                order_date: new Date(),
                status: "pending",
                size: 'M',
                product: Number(item.product.id)
            }])
            if (error) {
                console.log(error.message);
            }
            if(data) {
                console.log(data);
            }
        }
        setCartItems([]);
        navigation.navigate("Home");
    }

    const details = () => {
        return (
            <View>
                <View style={styles.detailsWrapper}>

                    <View style={styles.textContainer}>
                        <Text>Total</Text>
                        <Text style={styles.text}>${
                            cartItems.map((item) => {
                                return item.product.price * item.quantity
                            }).reduce((a, b) => a + b, 0)
                        }</Text>

                    </View>
                    <View style={styles.textContainer}>
                        <Text>Delivery</Text>
                        <Text style={styles.text}>${
                            0
                        }</Text>

                    </View>
                    <View style={styles.textContainer}>
                        <Text>Grand Total</Text>
                        <Text style={styles.text}>${
                            cartItems.map((item) => {
                                return item.product.price * item.quantity
                            }).reduce((a, b) => a + b, 0)
                        }</Text>
                    </View>
                </View>
                <TouchableOpacity
                    disabled={cartItems.length === 0}
                    enabled={cartItems.length > 0}
                    style={styles.checkOutButton}
                    onPress={async () => {
                        // delete the cart items
                        const { data, error } = await supabase
                            .from("shopping_cart")
                            .delete()
                            .eq("customer", userId);
                        if (error) {
                            console.log(error);
                            alert("Unable to process the payment");
                        } else {
                            // ToastAndroid.show("Payment successful", ToastAndroid.SHORT);
                            console.log("Succesfully deleted cart items");
                        }
                        addOrder();
                    }}
                >
                    <Text style={styles.buttonText}>Checkout</Text>
                </TouchableOpacity>


            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <SafeAreaView>
                    <Text style={styles.title}>Cart</Text>
                    <FlatList
                    data={cartItems}
                    renderItem={({ item, index }) => (
                        cartItem(item, index)
                    )}
                    keyExtractor={(item) => item?.id}
                    />
                    {cartItems && cartItems.length > 0 && details()}
            </SafeAreaView>
        </View>
    );

}

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: lightColors.background,
        height: '100%',
        padding: 20,
        marginTop: 40,
    },
    itemList: {
        width: '100%',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    cardWrapper: {
        backgroundColor: lightColors.light,
        borderRadius: lightColors.borderRadius,
        marginBottom: 0,
        marginTop: 10,
        width: "100%",
        alignContent: "center",
        alignItems: "center",
    },
    button: {
        width: "70%",
        alignContent: "center",
        alignItems: "center",
        marginTop: 10,
        padding: 20,
        backgroundColor: lightColors.grey,
        borderRadius: lightColors.borderRadius,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: lightColors.borderRadius,
        backgroundColor: lightColors.light,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
    },
    textContainer: {
        marginTop: 10,
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    buttonText: {
        color: "white",
        fontSize: 20,
    },
    checkOutButton: {
        marginTop: 20,
        backgroundColor: lightColors.primary,
        borderRadius: lightColors.borderRadius,
        width: "100%",
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

});

const itemStyles = StyleSheet.create({
    cardWrapper: {
        borderRadius: lightColors.borderRadius,
        backgroundColor: lightColors.light,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: lightColors.borderRadius,
        backgroundColor: '#eee',
        marginTop: 5,
        marginBottom: 5,
        // marginLeft: 5,
        // marginRight: 5,
    },
    detailsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexGrow: 1,
        marginLeft: 5,
        // marginRight: 10,
    },
    title: {
        fontSize: 15,
        fontFamily: commonStyles.fontMedium,
        color: lightColors.dark,
    },
    subTitle: {
        fontSize: 13,
        fontFamily: commonStyles.fontRegular,
        color: lightColors.darkGrey,
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: lightColors.lightGrey,
        flexGrow: 1,
        flex: 1,
        marginLeft: 5,
        marginRight: 10,
        borderRadius: lightColors.borderRadius,
    },
    button: {
        width: 23,
        height: 23,
        borderRadius: lightColors.borderRadius,
        backgroundColor: lightColors.light,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5,
        marginLeft: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        // fontSize: 15,
        fontFamily: commonStyles.fontMedium,
    },

    itemsCount: {
        fontSize: 13,
        fontFamily: commonStyles.fontMedium,
        color: lightColors.fontMedium,
        marginLeft: 5,
        marginRight: 5,
    },
});
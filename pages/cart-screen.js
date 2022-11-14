import React from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { lightColors } from '../theme/colors';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/common/back-button';
import CartItemCard from '../components/home/cart-item-card';
import { supabase } from "../utils/initSupabase";
import { useEffect } from 'react';
import {
    setUserId,
    setUserCart
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { TabRouter } from '@react-navigation/native';
import { GoTrueAdminApi } from '@supabase/supabase-js';

const CartScreen = ({ navigation, route }) => {

    const [cartProducts, setCartProducts] = useState([]);
    const { userId, userCart } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userCart.length > 0) {
            fetchCartItems();
        }

    }, []);

    useEffect(() => {
        console.log("userCart changed", userCart);
    }, [userCart]);

    useEffect(() => {
        dispatch(setUserCart([...cartProducts]));
    }, [cartProducts]);

    const fetchCartItems = async () => {
        const { data, error } = await supabase
            .from("shopping_cart")
            .select(`*`)
            .eq("customer", userId);
        if (error) {
            console.log(error);
        } else {
            // console.log("Succesfully get cart items");

            setCartProducts([...data]);
            // console.log("cart items", data);

        }
    };


    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <SafeAreaView>
                <Text style={styles.title}>Cart</Text>

                {
                    userCart && userCart.length > 0 && userCart.map((item, index) => {
                        return <View>
                            <CartItemCard key={index} item={item} />

                        </View>
                    })
                }


                <View style={styles.detailsWrapper}>

                    <View style={styles.textContainer}>
                        <Text>Total</Text>
                        <Text style={styles.text}>$882</Text>

                    </View>
                    <View style={styles.textContainer}>
                        <Text>Delivery</Text>
                        <Text style={styles.text}>$13</Text>

                    </View>
                    <View style={styles.textContainer}>
                        <Text>Tax Amount</Text>
                        <Text style={styles.text}>0</Text>

                    </View>
                    <View style={styles.textContainer}>
                        <Text>HST</Text>
                        <Text style={styles.text}>$5</Text>

                    </View>
                    <View style={styles.textContainer}>
                        <Text>GST</Text>
                        <Text style={styles.text}>$12</Text>

                    </View>
                    <View style={styles.textContainer}>
                        <Text>Grand Total</Text>
                        <Text style={styles.text}>$1000</Text>

                    </View>
                </View>
                <TouchableOpacity style={styles.checkOutButton} onPress={() => navigation.navigate('CheckOut')}>
                    <Text style={styles.buttonText}>Checkout</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </View >
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
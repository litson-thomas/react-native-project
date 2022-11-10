import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { lightColors } from '../theme/colors';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/common/back-button';
import CartDetails from '../components/home/cart-details';
import CartItemCard from '../components/home/cart-item-card';

const CartScreen = ({ navigation, route }) => {
    const products = route.params;
    //console.log(products);
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <SafeAreaView>
                <Text style={styles.title}>Cart</Text>
                {
                    [products].map((item, index) => {
                        return (

                            <><View key={index} style={{ marginBottom: 20 }}>
                                <CartItemCard navigation={navigation} item={item} />

                            </View></>



                        )
                    })

                }
                <CartDetails></CartDetails>

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

});
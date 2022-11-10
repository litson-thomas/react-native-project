import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { lightColors } from '../../theme/colors';
import { commonStyles } from '../../theme/styles';

const CartDetails = ({ navigation }) => {
    return (

        <View style={styles.container}>


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

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckOut')}>
                <Text style={styles.buttonText}>Checkout</Text>
            </TouchableOpacity>
        </View >


    );
}

export default CartDetails;

const styles = StyleSheet.create({
    container: {
        borderBottomEndRadius: lightColors.borderRadius,
        borderBottomStartRadius: lightColors.borderRadius,
    },
    textContainer: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    text: {
        fontSize: 15,
        fontFamily: commonStyles.fontRegular,
        color: lightColors.darkGrey,
        letterSpacing: -1,
        marginLeft: 5,
        justifyContent: 'flex-end'
    },
    button: {
        backgroundColor: lightColors.primary,
        borderRadius: lightColors.borderRadius,
        width: "100%",
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: lightColors.light,
        fontSize: 16,
        fontFamily: commonStyles.fontBold,
        letterSpacing: -1,
    }
});
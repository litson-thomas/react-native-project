import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { lightColors } from '../../theme/colors';
import { commonStyles } from '../../theme/styles';
import Constants from "expo-constants";
import { useEffect } from 'react';
import { supabase } from '../../utils/initSupabase';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    setItemQty
} from "../../redux/actions";

import { useDispatch } from "react-redux";

const CartItemCard = ({ navigation, route, item }) => {
    const [cartProducts, setCartProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [borderColor, setBorderColor] = useState(lightColors.light);
    const dispatch = useDispatch();

    const onCardClick = () => {
        setBorderColor(lightColors.primary);
    }

    const onCardPressOut = () => {
        setBorderColor(lightColors.light);
    }
    useEffect(() => {
        getProductItems();

    }, []);

    useEffect(() => {
        dispatch(setItemQty(quantity));
        console.log("quantity", quantity);
    }, [quantity]);

    const getProductItems = async () => {
        //get product items
        const { data, error } = await supabase
            .from("product")
            .select(`*`)
            .eq("id", item.product);
        if (error) {
            console.log(error);
        } else {
            console.log("product items", data);
            setCartProducts([...data]);
        }
    };

    return (


        <View style={{ ...styles.cardWrapper, ...{ borderWidth: 2, borderColor: borderColor } }}>
            <SafeAreaView>
                {
                    cartProducts && cartProducts.length > 0 && cartProducts.map((item, index) => {
                        return <View>

                            <View style={styles.detailsWrapper}>
                                <Image style={styles.image} source={{
                                    uri: `${Constants.expoConfig.extra.productUrl}/${item.images}`,
                                }} />
                                <Text style={styles.title}>{item.name}</Text>

                                <Text style={styles.price}>${item.price}</Text>

                            </View>
                            <View style={styles.buttonWrapper}>

                                <TouchableOpacity style={styles.button} onPress={() => setQuantity(quantity + 1)}>
                                    <Text style={styles.buttonText}>+</Text>
                                </TouchableOpacity >
                                <Text style={styles.itemsCount}>{quantity}</Text>
                                <TouchableOpacity style={styles.button} onPress={() => setQuantity(quantity - 1)}>
                                    <Text style={styles.buttonText}>-</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    })
                }


            </SafeAreaView>

        </View>


    );

}

export default CartItemCard;

const styles = StyleSheet.create({
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
        backgroundColor: lightColors.light,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
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
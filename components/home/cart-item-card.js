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
    setItemQty, setUserCart
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const CartItemCard = ({ navigation, route, item,index,itemId, onQuantityUpdate }) => {
    const [cartProducts, setCartProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    let [id, setId] = useState(item.id);
    const [borderColor, setBorderColor] = useState(lightColors.light);
    const dispatch = useDispatch();
    const { userCart } = useSelector((state) => state.userReducer);

    const onCardClick = () => {
        setBorderColor(lightColors.primary);
    }

    const onCardPressOut = () => {
        setBorderColor(lightColors.light);
    }
    useEffect(() => {
        console.log('asdasdas asd aa ' + quantity, itemId)
        getProductItems();
    }, []);

    useEffect(() => {
        // dispatch(setItemQty(quantity));
        // console.log("quantity", quantity);
        updateQuantityInDb(quantity)
    }, [quantity]);

    const updateQuantityInDb = async (quantity) => {
        console.log(quantity)
        // console.log("updateQuantityInDb", itemId);
        // let obj = item;
        // delete obj.id;
        // const { data, error } = await supabase
        //     .from("shopping_cart")
        //     .update({
        //         quantity: Number(quantity)
        //     })
        //     .eq("id", itemId);
        // if (error) {
        //     // console.log("ERROR WHILE UPDATTING QUANITYT" + error.message);
        // } else {
        //     // console.log(quantity)
        //     onQuantityUpdate(`${9}`)
        // }
        onQuantityUpdate(quantity)
    }

    const getProductItems = async () => {
        //get product items
        const { data, error } = await supabase
            .from("product")
            .select(`*`)
            .eq("id", item.product);
        if (error) {
            console.log(error);
        } else {
            // console.log("product items", data);
            setCartProducts([...data]);
        }
    };

    const onPlus = (quantity) => {
        onQuantityUpdate('data.userCart')
    }
    const onMinus = () => {
        setQuantity(quantity-1);

        console.log("onMinus " + item + " " + index);
    }

    return (


        <View  style={{ ...styles.cardWrapper, ...{ borderWidth: 2, borderColor: borderColor } }}>
            {
                    cartProducts && cartProducts.length > 0 && cartProducts.map((item, index) => {
                        return <View key={item.id}>

                            <View style={styles.detailsWrapper}>
                                <Image style={styles.image} source={{
                                    uri: `${Constants.expoConfig.extra.productUrl}/${item.images}`,
                                }} />
                                <Text style={styles.title}>{item.name}</Text>

                                <Text style={styles.price}>${item.price}</Text>

                            </View>
                            <View style={styles.buttonWrapper}>

                                <TouchableOpacity style={styles.button} onPress={() => {
                                    setQuantity(quantity + 1)
                                }}>
                                    <Text style={styles.buttonText}>+</Text>
                                </TouchableOpacity >
                                <Text style={styles.itemsCount}>{quantity}</Text>
                                <TouchableOpacity style={styles.button} onPress={() => {
                                    setQuantity(quantity - 1)
                                }}>
                                    <Text style={styles.buttonText}>-</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    })
                }
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
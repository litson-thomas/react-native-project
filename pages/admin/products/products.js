import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Alert, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { commonStyles } from '../../../theme/styles';
import { lightColors } from '../../../theme/colors';
import { Feather } from '@expo/vector-icons'; 
import BackButton from '../../../components/common/back-button';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { rightSwipeDeleteAction } from '../../../helpers/common';
import { deleteProduct, getProduct } from '../../../redux/products/productActions';
import Constants from "expo-constants";

const Products = (props) => {
    const { products } = useSelector((state) => state.adminProductReducer);
    const { categories } = useSelector((state) => state.categoryReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct());
    }, []);

    useEffect(() => {
        
    }, [products]);

    const swipeRight = (progress, dragX, item) => {
        return rightSwipeDeleteAction(progress, dragX, () => {
            Alert.alert(
                "Are you sure?",
                "You want to delete this products?",
                [
                    { text: "Cancel", onPress: () => {} },
                    { text: "OK", onPress: () => dispatch(deleteProduct(item)) },
                ],
            );
        })
    }

    const renderItem = ({ item }) => {
        return item ? <Swipeable renderRightActions={
            (progress, dragX) => swipeRight(progress, dragX, item)
        }>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate("AddProduct", { item, isEdit: true });
            }}>
                <View style={styles.itemWrapper}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: `${Constants.expoConfig.extra.productUrl}/${item.images[0]}`,
                        }}
                    />
                    <View style={styles.detailsWrapper}>
                        <Text style={styles.itemName}>{categories.find(x => x.id == item.category)?.name}</Text>
                        <Text style={styles.itemText} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.itemPrice} numberOfLines={1}>${item.price}</Text>
                    </View>
                    <Feather name="chevron-right" size={20} style={{color: lightColors.grey}} color={lightColors.dark} />
                </View>
            </TouchableOpacity>
        </Swipeable> : null;
    }

    return (
        <SafeAreaView style={{...styles.mainContent, margin: 20}}>
            <BackButton navigation={props.navigation}/>
            <View style={{...styles.header}}>
                <Text style={{...commonStyles.mainHeading, marginTop: 10}}>Products</Text>
                <TouchableOpacity onPress={() => {props.navigation.navigate('AddProduct')}}>
                    <Feather name="plus-circle" size={25} style={styles.icon} color={lightColors.dark} />
                </TouchableOpacity>
            </View>
            <FlatList 
                style={{flex: 1}}
                data={products}
                renderItem={({item}) => renderItem({item})}
            />
        </SafeAreaView>
    );
}

export default Products;

const styles = StyleSheet.create({
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    itemName: {
        fontSize: 12,
        color: lightColors.darkGrey,
        marginBottom: 2,
    },  
    itemText: {
        fontSize: 13,
        fontFamily: commonStyles.fontLight,
    },
    itemPrice: {
        fontSize: 14,
        color: lightColors.dark,
        fontFamily: commonStyles.fontSemiBold,
        marginVertical: 5,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: lightColors.borderRadius,
        marginRight: 10,
        resizeMode: "contain",
        backgroundColor: '#f6f6f6',
        flex: 0.25
    },  
    mainContent: {
        flex: 1, 
        flexDirection: 'column'
    },
    itemWrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 10,
        padding: 15,
        borderRadius: lightColors.borderRadius,
        backgroundColor: lightColors.light,
        flex: 1,
    },
    itemText: {
        color: lightColors.dark,
        fontSize: 16,
        fontFamily: commonStyles.fontMedium,
    },
    detailsWrapper: {
        flexGrow: 1,
        flex: 3
    }
});

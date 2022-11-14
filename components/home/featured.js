import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { lightColors } from '../../theme/colors';
import { commonStyles } from '../../theme/styles';
import Constants from "expo-constants";

const Featured = ({ navigation, featured }) => {

    let [item, setItem] = useState(featured[0]);
    let interval = null;
    let itemIndex = 0;

    useEffect(() => {
        setItem(featured[0]);
        console.log('featured', featured);
        interval = setInterval(() => {
            // loop through the items
            itemIndex++;
            if (itemIndex > featured.length - 1) itemIndex = 0;
            setItem(featured[itemIndex]);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <TouchableOpacity onPress={() => {navigation?.navigate('DetailModal', { id: item?.id});}}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image 
                    style={{...styles.image}} source={{uri: `${Constants.expoConfig.extra.productUrl}/${item?.images[0]}`,}} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={{...styles.title}}>{item?.name}</Text>
                    <Text style={styles.price}>${item?.price}</Text>
                    <Text style={styles.subTitle}>{item?.category.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default Featured;

const styles = StyleSheet.create({
    container: {
        borderBottomEndRadius: lightColors.borderRadius,
        borderBottomStartRadius: lightColors.borderRadius,
        backgroundColor: lightColors.light,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    imageContainer: {
        width: "100%",
        height: 230,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    image: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
        marginRight: 10,
    },
    textContainer: {
        width: '100%',
        position: 'absolute',
        padding: 20,
    },
    title: {
        width: '85%',
        fontSize: 40,
        color: lightColors.dark,
        fontFamily: commonStyles.fontExtraBold,
        letterSpacing: -1,
        lineHeight: 40,
        paddingTop: 10,
    },
    price: {
        fontSize: 30,
        fontFamily: commonStyles.fontSemiBold,
        letterSpacing: -1,
        lineHeight: 30,
        paddingTop: 10,
        marginBottom: -10,
    },
    subTitle: {
        fontSize: 15,
        fontFamily: commonStyles.fontRegular,
        color: lightColors.darkGrey,
        letterSpacing: -1,
        paddingTop: 5,
    },
});
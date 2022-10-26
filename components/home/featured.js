import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { lightColors } from '../../theme/colors';
import { commonStyles } from '../../theme/styles';

const DATA = [
    {id: 1, image: require('../../assets/images/shoe-2.png'), title: 'Nike Air Max 270', price: '$120', subTitle: 'Regular Shoes'},
    {id: 2, image: require('../../assets/images/shoe-3.png'), title: 'Nike Men\'s Fly Vision', price: '$84', subTitle: 'Sneakers'},
    {id: 3, image: require('../../assets/images/shoe-4.png'), title: 'Nike Court Vision Low', price: '$199', subTitle: 'Sneakers'},
];

const Featured = ({ navigation }) => {

    let [item, setItem] = useState(DATA[0]);
    let interval = null;

    useEffect(() => {
        let itemIndex = 0;
        interval = setInterval(() => {
            itemIndex += 1;
            if (itemIndex > DATA.length - 1) itemIndex = 0;
            setItem(DATA[itemIndex]);
        }, 5000);
    }, []);

    return (
        <TouchableOpacity onPress={() => {navigation?.navigate('DetailModal')}}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={{...styles.title}}>{item.title}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                    <Text style={styles.subTitle}>{item.subTitle}</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={item.image} />
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
        width: 230,
        height: 230,
        resizeMode: 'contain',
    },
    textContainer: {
        width: '100%',
        position: 'absolute',
        padding: 20,
    },
    title: {
        fontSize: 50,
        fontFamily: commonStyles.fontExtraBold,
        letterSpacing: -2,
        lineHeight: 50,
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
        fontSize: 20,
        fontFamily: commonStyles.fontMedium,
        color: lightColors.darkGrey,
        letterSpacing: -1,
        lineHeight: 20,
        paddingTop: 10,
    },
});
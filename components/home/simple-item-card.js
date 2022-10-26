import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { lightColors } from '../../theme/colors';
import { commonStyles } from '../../theme/styles';

const SimpleItemCard = ({ navigation }) => {

    const [borderColor, setBorderColor] = useState(lightColors.light);

    const onCardClick = () => {
        setBorderColor(lightColors.primary);
    }

    const onCardPressOut = () => {
        setBorderColor(lightColors.light);
    }

    return (
        <TouchableOpacity onPressIn={onCardClick} onPressOut={onCardPressOut} onPress={() => {navigation.navigate('DetailModal')}}>
            <View style={{...styles.cardWrapper, ...{borderWidth: 2, borderColor: borderColor}}}>
                <Image style={styles.image} source={require('../../assets/images/shoe.png')}/>
                <View style={styles.detailsWrapper}>
                    <Text style={styles.title}>Nike Air Max</Text>
                    <Text style={styles.subTitle}>Regular Shoes</Text>
                </View>
                <Text style={styles.price}>$120</Text>
            </View>
        </TouchableOpacity>
    );
}

export default SimpleItemCard;

const styles = StyleSheet.create({
    cardWrapper: {
        borderRadius: lightColors.borderRadius,
        backgroundColor: lightColors.light,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
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
    price: {
        fontSize: 15,
        fontFamily: commonStyles.fontSemiBold,
        color: lightColors.dark,
        marginRight: 20,
    }
});
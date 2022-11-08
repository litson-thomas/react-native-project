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
        <View style={{ ...styles.cardWrapper, ...{ borderWidth: 2, borderColor: borderColor } }}>
            <Image style={styles.image} source={require('../../assets/images/shoe.png')} />
            <View style={styles.detailsWrapper}>
                <Text style={styles.title}>Nike Air Max</Text>
                <Text style={styles.price}>$290</Text>
            </View>
            <View style={styles.buttonWrapper}>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <Text style={styles.itemsCount}>4</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
            </View>
        </View>



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
        marginLeft: 5,
        marginRight: 5,
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
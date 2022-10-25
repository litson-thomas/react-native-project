import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { lightColors } from '../../theme/colors';

const Navbar = () => {

    let [active, setActive] = useState('home');

    const onItemClick = (item) => {
        setActive(item);
    }

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.iconButton} onPress={() => {onItemClick('home')}}>
                <Ionicons name={`ios-home${active == 'home' ? '' : '-outline'}`} size={26} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => {onItemClick('search')}}>
            <Ionicons name={`search${active == 'search' ? '' : ''}`} size={26} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => {onItemClick('cart')}}>
                <Ionicons name={`cart${active == 'cart' ? '' : '-outline'}`} size={26} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => {onItemClick('person')}}>
                <Ionicons name={`person${active == 'person' ? '' : '-outline'}`} size={26} color="black" />
            </TouchableOpacity>
        </View>
    );
}

export default Navbar;

const styles = StyleSheet.create({
    wrapper: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: lightColors.light,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 10,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: lightColors.light,
        marginTop: 5,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
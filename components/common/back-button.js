import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { lightColors } from '../../theme/colors';
import { commonStyles } from '../../theme/styles';

const BackButton = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {navigation.goBack()}}>
                <Ionicons name='chevron-back' size={25} color={lightColors.dark} />
            </TouchableOpacity>
        </View>
    );
}

export default BackButton;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: lightColors.light,
        width: 40,
        height: 40,
        borderRadius: lightColors.borderRadius,
    },
});
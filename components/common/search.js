import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { lightColors } from '../../theme/colors';
import { commonStyles } from '../../theme/styles';
import { Feather } from '@expo/vector-icons'; 

const Search = ({searchString,onSearch}) => {
    return (
        <View style={styles.inputWrapper}>
            <TextInput 
            placeholderTextColor={lightColors.grey}
            placeholder='Enter name' style={styles.input} value={searchString} onChangeText={onSearch.bind(this)} />
            <Feather name="search" size={23} style={styles.icon} color={lightColors.grey} />
        </View>
    );
}

export default Search;

const styles = StyleSheet.create({
    inputWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: lightColors.light,
        borderRadius: lightColors.borderRadius,
        // marginLeft: 20,
        // marginRight: 20,
    },
    input: {
        backgroundColor: lightColors.light,
        padding: 15,
        flexGrow: 2,
        fontFamily: commonStyles.fontMedium,
        maxWidth: '90%',
    },
    icon: {
        marginRight: 10,
        flexGrow: 0,
    }
})
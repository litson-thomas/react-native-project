import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Search from '../components/common/search';
import { lightColors } from '../theme/colors';
import { StatusBar } from 'expo-status-bar';

const SearchScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <SafeAreaView>
                <Search></Search>
            </SafeAreaView>
        </View>
    );
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: lightColors.background,
        height: '100%',
        marginTop: 60,
    },
    itemList: {
        width: '100%',
    }
});
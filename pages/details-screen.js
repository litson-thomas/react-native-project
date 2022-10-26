import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { lightColors } from '../theme/colors';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/common/back-button';

const DetailScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <SafeAreaView>
                <BackButton navigation={navigation}></BackButton>
                <Text>Details</Text>
            </SafeAreaView>
        </View>
    );
}

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: lightColors.background,
        height: '100%',
        padding: 20,
        marginTop: 40,
    },
    itemList: {
        width: '100%',
    }
});
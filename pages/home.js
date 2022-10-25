import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Search from '../components/common/search';
import { lightColors } from '../theme/colors';
import ItemCard from '../components/home/item-card';
import Header from '../components/common/header';
import { StatusBar } from 'expo-status-bar';

const Home = () => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <SafeAreaView>
                <Header></Header>
                <Search></Search>
                <ScrollView horizontal={true} style={styles.itemList} >
                    <View style={{marginRight: 20}}><ItemCard></ItemCard></View>
                    <View style={{marginRight: 20}}><ItemCard></ItemCard></View>
                    <View style={{marginRight: 20}}><ItemCard></ItemCard></View>
                    <View style={{marginRight: 20}}><ItemCard></ItemCard></View>
                    <View style={{marginRight: 20}}><ItemCard></ItemCard></View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: lightColors.background,
        height: '100%',
        padding: 20,
    },
    itemList: {
        width: '100%',
    }
});
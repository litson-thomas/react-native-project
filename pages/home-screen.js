import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Search from '../components/common/search';
import { lightColors } from '../theme/colors';
import ItemCard from '../components/home/item-card';
import Header from '../components/common/header';
import { StatusBar } from 'expo-status-bar';
import TitleLink from '../components/common/title-link';
import SimpleItemCard from '../components/home/simple-item-card';
import Featured from '../components/home/featured';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <StatusBar style="auto"/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Header></Header>
                    <Featured navigation={navigation}></Featured>
                    <ScrollView horizontal={true} style={styles.itemList} showsHorizontalScrollIndicator={false}>
                        <View style={{marginLeft: 20}}><ItemCard navigation={navigation}></ItemCard></View>
                        <View style={{marginLeft: 20}}><ItemCard navigation={navigation}></ItemCard></View>
                        <View style={{marginLeft: 20}}><ItemCard navigation={navigation}></ItemCard></View>
                        <View style={{marginLeft: 20}}><ItemCard navigation={navigation}></ItemCard></View>
                        <View style={{marginLeft: 20}}><ItemCard navigation={navigation}></ItemCard></View>
                    </ScrollView>
                    <TitleLink title={'Top Selling Products'} url={'DetailModal'} navigation={navigation}></TitleLink>
                    <SimpleItemCard navigation={navigation}></SimpleItemCard>
                    <SimpleItemCard navigation={navigation}></SimpleItemCard>
                    <SimpleItemCard navigation={navigation}></SimpleItemCard>
                    <SimpleItemCard navigation={navigation}></SimpleItemCard>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: lightColors.background,
        height: '100%',
    },
    itemList: {
        width: '100%',
    }
});
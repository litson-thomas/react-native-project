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
import { useSelector } from 'react-redux';

const HomeScreen = ({ navigation }) => {
    const { userFirstName , userImage} = useSelector((state) => state.userReducer);
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <StatusBar style="auto" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {userFirstName && <Header userFirstName={userFirstName} userImage={userImage}></Header>}
                    <Featured navigation={navigation}></Featured>
                    <ScrollView horizontal={true} style={styles.itemList} showsHorizontalScrollIndicator={false}>
                        <View style={{ marginLeft: 20 }}><ItemCard navigation={navigation}></ItemCard></View>
                        <View style={{ marginLeft: 20 }}><ItemCard navigation={navigation}></ItemCard></View>
                        <View style={{ marginLeft: 20 }}><ItemCard navigation={navigation}></ItemCard></View>
                        <View style={{ marginLeft: 20 }}><ItemCard navigation={navigation}></ItemCard></View>
                        <View style={{ marginLeft: 20 }}><ItemCard navigation={navigation}></ItemCard></View>
                    </ScrollView>
                    <TitleLink title={'Top Selling Products'} url={'DetailModal'} navigation={navigation}></TitleLink>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                            return (
                                <View key={index} style={{ marginBottom: 20 }}>
                                    <SimpleItemCard navigation={navigation}></SimpleItemCard>
                                </View>
                            )
                        })
                    }
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
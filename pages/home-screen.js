import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Search from '../components/common/search';
import { lightColors } from '../theme/colors';
import ItemCard from '../components/home/item-card';
import Header from '../components/common/header';
import { StatusBar } from 'expo-status-bar';
import TitleLink from '../components/common/title-link';
import SimpleItemCard from '../components/home/simple-item-card';
import Featured from '../components/home/featured';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../redux/products/productActions';

const HomeScreen = ({ navigation }) => {
    const { userFirstName , userImage} = useSelector((state) => state.userReducer);
    const { products } = useSelector((state) => state.adminProductReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct());
    }, []);

    useEffect(() => {
        // console.log('products', products);
    }, [products]);

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <StatusBar style="auto" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {userFirstName && <Header userFirstName={userFirstName} userImage={userImage}></Header>}
                    {products && products.filter(x => x.is_slider).length > 0 && <Featured navigation={navigation} featured={products.filter(x => x.is_slider)}></Featured>}
                    <ScrollView horizontal={true} style={styles.itemList} showsHorizontalScrollIndicator={false}>
                        {
                            products.filter(x => x.is_featured).map((item, index) => {
                                return <View key={index} style={{ marginLeft: 20 }}><ItemCard item={item} navigation={navigation}></ItemCard></View>
                            })
                        }
                    </ScrollView>
                    <TitleLink title={'Top Selling Products'} url={'DetailModal'} navigation={navigation}></TitleLink>
                    {
                        products.map((item, index) => {
                            return (
                                <View key={index} style={{ marginBottom: 0 }}>
                                    <SimpleItemCard navigation={navigation} item={item}></SimpleItemCard>
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
        marginBottom: 20,
    }
});
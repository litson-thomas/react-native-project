import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Alert, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { commonStyles } from '../../../theme/styles';
import { deleteCategory, getCategories } from '../../../redux/category/categoryActions';
import { lightColors } from '../../../theme/colors';
import { Feather } from '@expo/vector-icons'; 
import BackButton from '../../../components/common/back-button';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { rightSwipeDeleteAction } from '../../../helpers/common';

const Categories = (props) => {
    const { categories } = useSelector((state) => state.categoryReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, []);

    useEffect(() => {
        
    }, [categories]);

    const swipeRight = (progress, dragX, item) => {
        return rightSwipeDeleteAction(progress, dragX, () => {
            Alert.alert(
                "Are you sure?",
                "You want to delete this category?",
                [
                    { text: "Cancel", onPress: () => {} },
                    { text: "OK", onPress: () => dispatch(deleteCategory(item)) },
                ],
            );
        })
    }

    const renderItem = ({ item }) => {
        return item ? <Swipeable renderRightActions={
            (progress, dragX) => swipeRight(progress, dragX, item)
        }>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate("AddCategory", { item, isEdit: true });
            }}>
                <View style={styles.itemWrapper}>
                        <Text style={styles.itemText}>{item.name}</Text>
                    <Feather name="chevron-right" size={20} style={{color: lightColors.grey}} color={lightColors.dark} />
                </View>
            </TouchableOpacity>
        </Swipeable> : null;
    }

    return (
        <SafeAreaView style={{...styles.mainContent, margin: 20}}>
            <BackButton navigation={props.navigation}/>
            <View style={{...styles.header}}>
                <Text style={{...commonStyles.mainHeading, marginTop: 10}}>Categories</Text>
                <TouchableOpacity onPress={() => {props.navigation.navigate('AddCategory')}}>
                    <Feather name="plus-circle" size={25} style={styles.icon} color={lightColors.dark} />
                </TouchableOpacity>
            </View>
            <FlatList 
                style={{flex: 1}}
                data={categories}
                renderItem={({item}) => renderItem({item})}
            />
        </SafeAreaView>
    );
}

export default Categories;

const styles = StyleSheet.create({
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    mainContent: {
        // display: "flex",
        // justifyContent: "flex-start",
        // flexDirection: "column",
        // width: "100%",
        flex: 1, 
        flexDirection: 'column'
    },
    itemWrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 10,
        padding: 15,
        borderRadius: lightColors.borderRadius,
        backgroundColor: lightColors.light,
    },
    itemText: {
        color: lightColors.dark,
        fontSize: 16,
        fontFamily: commonStyles.fontMedium,
    }
});

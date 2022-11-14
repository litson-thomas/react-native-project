import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Alert, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { commonStyles } from '../../../theme/styles';
import { lightColors } from '../../../theme/colors';
import { Feather } from '@expo/vector-icons'; 
import BackButton from '../../../components/common/back-button';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { rightSwipeDeleteAction } from '../../../helpers/common';
import { deleteUser, getUser } from '../../../redux/users/userActions';
import { SUPBASE_USER_URL } from '../../../utils/initSupabase';
import Search from "../../../components/common/search";

const Users = (props) => {
    const { users } = useSelector((state) => state.adminUserReducer);

    let [searchString, setSearchString] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, []);

    useEffect(() => {
        
    }, [users]);

    const swipeRight = (progress, dragX, item) => {
        return rightSwipeDeleteAction(progress, dragX, () => {
            Alert.alert(
                "Are you sure?",
                "You want to delete this user?",
                [
                    { text: "Cancel", onPress: () => {} },
                    { text: "OK", onPress: () => dispatch(deleteUser(item)) },
                ],
            );
        })
    }

    const renderItem = ({ item }) => {
        return item ? <Swipeable renderRightActions={
            (progress, dragX) => swipeRight(progress, dragX, item)
        }>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate("ViewUser", { item, id: item.id });
            }}>
                <View style={styles.itemWrapper}>
                    {item.image && <Image
                        style={styles.image}
                        source={{
                            uri: `${SUPBASE_USER_URL}/${item.image}`,
                        }}
                    />}
                    {!item.image && <Image
                        style={styles.image}
                        source={{
                            uri: `https://otbvakzehdxkmuvrelzr.supabase.co/storage/v1/object/public/mad6114-project/public/user/no_profile_photo.jpg`,
                        }}
                    />}
                    <View style={styles.detailsWrapper}>
                        <Text style={styles.itemName}>{item.role}</Text>
                        <Text style={styles.itemText} numberOfLines={1}>{item.first_name} {item.last_name}</Text>
                    </View>
                    <Feather name="chevron-right" size={20} style={{color: lightColors.grey}} color={lightColors.dark} />
                </View>
            </TouchableOpacity>
        </Swipeable> : null;
    }

    useEffect(() => {
        
    }, [searchString]);

    const onSearch = (text) => {
        setSearchString(text);
    }

    return (
        <SafeAreaView style={{...styles.mainContent, margin: 20}}>
            <BackButton navigation={props.navigation}/>
            <View style={{...styles.header}}>
                <Text style={{...commonStyles.mainHeading, marginTop: 10}}>Users</Text>
            </View>
            <View style={{marginBottom: 12}}>
                <Search searchString={searchString} onSearch={onSearch} />
            </View>
            <FlatList 
                style={{flex: 1}}
                data={users.filter((item) => {
                    if (searchString === "") return item;
                    else if (item.first_name.toLowerCase().includes(searchString.toLowerCase()) || item.last_name.toLowerCase().includes(searchString.toLowerCase())) {
                        return item;
                    }
                })}
                renderItem={({item}) => renderItem({item})}
            />
        </SafeAreaView>
    );
}

export default Users;

const styles = StyleSheet.create({
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    itemName: {
        fontSize: 12,
        color: lightColors.darkGrey,
        marginBottom: 2,
    },  
    itemText: {
        fontSize: 13,
        fontFamily: commonStyles.fontLight,
    },
    itemPrice: {
        fontSize: 14,
        color: lightColors.dark,
        fontFamily: commonStyles.fontSemiBold,
        marginVertical: 5,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: lightColors.borderRadius,
        marginRight: 10,
        resizeMode: "contain",
        backgroundColor: '#f6f6f6',
        flex: 0.25
    },  
    mainContent: {
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
        flex: 1,
    },
    itemText: {
        color: lightColors.dark,
        fontSize: 16,
        fontFamily: commonStyles.fontMedium,
    },
    detailsWrapper: {
        flexGrow: 1,
        flex: 3
    }
});

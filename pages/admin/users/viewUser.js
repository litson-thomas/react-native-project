import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Alert, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { commonStyles } from '../../../theme/styles';
import { lightColors } from '../../../theme/colors';
import { Feather } from '@expo/vector-icons'; 
import BackButton from '../../../components/common/back-button';
import { getSingleUser } from '../../../redux/users/userActions';
import { SUPBASE_USER_URL } from '../../../utils/initSupabase';
import Constants from "expo-constants";
import { COMPLETED_STATUS, PENDING_STATUS, READY_STATUS, rightSwipeDeleteAction, SHIPPED_STATUS } from '../../../helpers/common';
import moment from "moment";

const ViewUser = (props) => {
    const { selectedUser } = useSelector((state) => state.adminUserReducer);
    const { orders } = useSelector((state) => state.adminOrderReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSingleUser(props.route.params.id));
    }, []);

    useEffect(() => {
        // console.log(selectedUser);
    }, [selectedUser]);

    const renderOrderItem = ({ item }) => {
        return item ? <TouchableOpacity onPress={() => {
            props.navigation.navigate("AddOrder", { item, isEdit: true });
        }}>
            <View style={{...styles.itemWrapper, paddingTop: 0}}>
                {   item.product?.images &&
                    <Image
                        style={styles.image}
                        source={{
                            uri: `${Constants.expoConfig.extra.productUrl}/${item.product?.images[0]}`,
                        }}
                    />
                }
                {   !item.product?.images &&
                    <Image
                        style={styles.image}
                        source={{
                            uri: `https://otbvakzehdxkmuvrelzr.supabase.co/storage/v1/object/public/mad6114-project/public/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg`,
                        }}
                    />
                }
                <View style={styles.detailsWrapper}>
                    <Text style={styles.itemName}>{item.user.first_name} ordered on {moment(item.order_date, 'YYYY-MM-DD').format('DD MMM, YYYY')}</Text>
                    <Text style={styles.itemText}>{item.product.name}</Text>
                    <Text style={styles.itemPrice} numberOfLines={1}>Quantity: {item.quantity} <Text style={item.status == PENDING_STATUS ? styles.pendingStatus : item.status == READY_STATUS ? styles.readyStatus : item.status == SHIPPED_STATUS ? styles.shippedStatus : styles.completedStatus}>{item.status}</Text>
                    </Text>
                </View>
                <Feather name="chevron-right" size={20} style={{color: lightColors.grey}} color={lightColors.dark} />
            </View>
        </TouchableOpacity> : null;
    }

    return (
        <SafeAreaView style={{...styles.mainContent, margin: 20}}>
            <BackButton navigation={props.navigation}/>
            {selectedUser.image && <Image
                style={styles.image}
                source={{
                    uri: `${SUPBASE_USER_URL}/${selectedUser.image}`,
                }}
            />}
            {!selectedUser.image && <Image
                style={styles.image}
                source={{
                    uri: `https://otbvakzehdxkmuvrelzr.supabase.co/storage/v1/object/public/mad6114-project/public/user/no_profile_photo.jpg`,
                }}
            />}
            <View style={{...styles.header}}>
                <Text style={{...commonStyles.mainHeading, marginTop: 15}}>{selectedUser?.first_name} {selectedUser?.last_name}</Text>
            </View>
            <View style={styles.subDetails}>
                <View style={styles.item}>
                    <Feather name="message-square" size={20} style={{color: lightColors.darkGrey, marginRight: 6}} color={lightColors.dark} />
                    <Text style={{fontSize: 14, color: lightColors.darkGrey, fontFamily: commonStyles.fontMedium}}>{selectedUser?.email}</Text>
                </View>
                <View style={styles.item}>
                    <Feather name="user" size={20} style={{color: lightColors.darkGrey, marginRight: 6}} color={lightColors.dark} />
                    <Text style={{fontSize: 14, color: lightColors.darkGrey, fontFamily: commonStyles.fontMedium}}>{selectedUser?.role}</Text>
                </View>
            </View>
            <Text style={{marginTop: 20, marginBottom: 10, fontFamily: commonStyles.fontMedium, fontSize: 16, color: lightColors.darkGrey}}>Orders: {`${orders.filter(order => order.user.id == selectedUser.id).length} orders`}</Text>
            <FlatList 
                style={{flex: 1}}
                data={orders.filter(order => order.user.id == selectedUser.id)}
                renderItem={({item}) => renderOrderItem({item})}
            />
        </SafeAreaView>
    );
}

export default ViewUser;

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
    item: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        marginRight: 15,
    },
    subDetails: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
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
        width: 100,
        height: 100,
        marginTop: 20,
        borderRadius: lightColors.borderRadius,
        marginRight: 10,
        resizeMode: "contain",
        backgroundColor: '#f6f6f6',
        resizeMode: "cover",
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
    },
    pendingStatus: {
        fontSize: 12,
        textTransform: "uppercase",
        color: 'orange',
        fontFamily: commonStyles.fontMedium,
    },
    completedStatus: {
        fontSize: 12,
        textTransform: "uppercase",
        color: 'green',
        fontFamily: commonStyles.fontMedium,
    },
    readyStatus: {
        fontSize: 12,
        textTransform: "uppercase",
        color: 'blue',
        fontFamily: commonStyles.fontMedium,
    },
    shippedStatus: {
        fontSize: 12,
        textTransform: "uppercase",
        color: 'green',
        fontFamily: commonStyles.fontMedium,
    },
});

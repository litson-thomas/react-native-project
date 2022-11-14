import React, { useEffect } from 'react';
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { lightColors } from '../theme/colors';
import { commonStyles } from '../theme/styles';
import BackButton from '../components/common/back-button';
import { Feather } from '@expo/vector-icons'; 
import { useSelector, useDispatch } from 'react-redux';
import { COMPLETED_STATUS, PENDING_STATUS, READY_STATUS, rightSwipeDeleteAction, SHIPPED_STATUS } from '../helpers/common';
import { getOrder } from '../redux/orders/orderActions';
import Constants from "expo-constants";
import moment from 'moment';

const MyOrders = (props) => {
    const { userId, userFirstName, userRole } = useSelector((state) => state.userReducer);
    const { orders } = useSelector((state) => state.adminOrderReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrder());
    }, []);

    useEffect(() => {
        // console.log(orders);
    }, [orders]);

    const renderItem = ({ item }) => {
        return item ? <View style={styles.itemWrapper}>
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
            <Text style={styles.itemName} numberOfLines={1}>{item.user.first_name} ordered on {moment(item.order_date, 'YYYY-MM-DD').format('DD MMM, YYYY')}</Text>
            <Text style={styles.itemText} numberOfLines={1}>{item.product.name}</Text>
            <Text style={styles.itemPrice} numberOfLines={1}>Quantity: {item.quantity} <Text style={item.status == PENDING_STATUS ? styles.pendingStatus : item.status == READY_STATUS ? styles.readyStatus : item.status == SHIPPED_STATUS ? styles.shippedStatus : styles.completedStatus}>{item.status}</Text></Text>
        </View>
        <Feather name="chevron-right" size={20} style={{color: lightColors.grey}} color={lightColors.dark} />
    </View> : null;
    }

    return (
        <SafeAreaView style={{...styles.mainContent, margin: 20}}>
            <BackButton navigation={props.navigation}/>
            <View style={{...styles.header}}>
                <Text style={{...commonStyles.mainHeading, marginTop: 10}}>Orders</Text>
            </View>
            <FlatList 
                style={{flex: 1}}
                data={orders.filter(order => order.user.id == userId)}
                renderItem={({item}) => renderItem({item})}
            />
        </SafeAreaView>
    );
}

export default MyOrders;

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
        fontSize: 12,
        color: lightColors.dark,
        fontFamily: commonStyles.fontMedium,
        marginVertical: 5,
        color: lightColors.darkGrey,
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
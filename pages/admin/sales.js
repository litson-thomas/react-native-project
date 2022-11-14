import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DynamicForm from '../../components/common/dynamic-form';
import { lightColors } from '../../theme/colors';
import { commonStyles, formStyles } from '../../theme/styles';
import { Feather } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrder } from '../../redux/orders/orderActions';
import { deleteCategory, getCategories } from '../../redux/category/categoryActions';
import DropDownPicker from "react-native-dropdown-picker";
import { getProduct } from '../../redux/products/productActions';
import BackButton from '../../components/common/back-button';
import moment from "moment";

const Sales = (props) => {
    const { orders } = useSelector((state) => state.adminOrderReducer);
    const { categories } = useSelector((state) => state.categoryReducer);
    const { products } = useSelector((state) => state.adminProductReducer);

    let [selectedCategory, setSelectedCategory] = useState(null);
    let [selectedTime, setSelectedTime] = useState(null);
    let [filteredOrders, setFilteredOrders] = useState(orders);
    let [initialValues, setInitialValues] = useState({});
    let [selectOpen, setSelectOpen] = useState([false, false, false]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrder());
        dispatch(getCategories());
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            setFilteredOrders(selectedCategory.id == 0 ? orders : orders.filter(order => order.product.category.id === selectedCategory.id));
        } else {
            setFilteredOrders(orders);
        }

    }, [selectedCategory]);

    useEffect(() => {
        filterByTime(selectedTime?.id)
    }, [selectedTime]);

    useEffect(() => {
        if(initialValues.product){
            setFilteredOrders(orders.filter(order => order.product.id === initialValues.product));
        }
    }, [initialValues]);

    const filterByTime = (time) => {
        if (time == 0) {
            setFilteredOrders(orders);
        }
        if(time == 1) {
            setFilteredOrders(orders.filter(order => moment(order.order_date, 'YYYY-MM-DD').isSame(moment(), 'day')));
        }
        if(time == 2) {
            setFilteredOrders(orders.filter(order => moment(order.order_date, 'YYYY-MM-DD').week() == moment().week()));
        }
        if(time == 3) {
            setFilteredOrders(orders.filter(order => moment(order.order_date, 'YYYY-MM-DD').month() == moment().month()));
        }
        if(time == 4) {
            setFilteredOrders(orders.filter(order => moment(order.order_date, 'YYYY-MM-DD').year() == moment().year()));
        }
    }

    useEffect(() => {
        if(!products.length || products.length <= 0) dispatch(getProduct());
    }, [products]);

    return (
        <View style={commonStyles.mainContainer}>
            <SafeAreaView>
                <BackButton navigation={props.navigation}/>
                <Text style={{...commonStyles.mainHeading, marginTop: 10}}>Sales</Text>
                <View style={styles.totalSalesWrapper}>
                    <Text style={styles.totalSalesText}>Total Sales</Text>
                    <Text style={styles.totalSales}>{filteredOrders.length}</Text>
                </View>

                <Text style={{...formStyles.label, marginBottom: 15}}>Filter by Time</Text>
                <FlatList 
                    data={[{id: 0, name: 'All Time'}, {id: 1, name: 'Today'}, {id: 2, name: 'This Week'}, {id: 3, name: 'This Month'}, {id: 4, name: 'This Year'}]}
                    renderItem={({ item }) => {
                        return item ? <TouchableOpacity onPress={() => setSelectedTime(item)}>
                            <Text style={item.id == selectedTime?.id ? {...styles.categoryItemText, borderColor: lightColors.dark} : {...styles.categoryItemText}}>{item.name}</Text>
                        </TouchableOpacity> : null
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                />

                <Text style={{...formStyles.label, marginBottom: 15}}>Filter by Category</Text>
                <FlatList 
                    data={[{id: 0, name: 'All'}, ...categories]}
                    renderItem={({ item }) => {
                        return item ? <TouchableOpacity onPress={() => setSelectedCategory(item)}>
                            <Text style={item.id == selectedCategory?.id ? {...styles.categoryItemText, borderColor: lightColors.dark} : {...styles.categoryItemText}}>{item.name}</Text>
                        </TouchableOpacity> : null
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                />
                {
                    products && products.length > 0 && <View style={{}}>
                        <Text style={{...formStyles.label, marginTop: 5}}>Filter by Product</Text>
                        <DropDownPicker
                            style={styles.dropdown}
                            value={initialValues['product']}
                            listMode="MODAL"
                            open={selectOpen[1]}
                            onClose={() => {setSelectOpen([...selectOpen.map((item, i) => i === 1 ? !item : item)])}}
                            onPress={() => {setSelectOpen([...selectOpen.map((item, i) => i === 1 ? !item : item)])}}
                            onSelectItem={(item) => {
                                setInitialValues({...initialValues, product: item.value});
                                setSelectOpen([...selectOpen.map((x, i) => i === 1 ? false : x)])
                            }}
                            items={products.map((item) => ({label: `${item.category.name} - $${item.price}:${item.name}`, value: item.id}))}
                            placeholder={'Select Product'}
                            placeholderStyle={styles.dropdownPlaceholder}
                            zIndex={10000}
                            modalTitle={'Select Product'}
                            modalProps={{
                                animationType: 'slide',
                                hardwareAccelerated: true,
                            }}
                            dropDownDirection="DOWN"
                        />
                    </View>
                }
            </SafeAreaView>
            <StatusBar style="light" barStyle={'dark-content'}></StatusBar>
        </View>
    );
}

export default Sales;

const styles = StyleSheet.create({
    linkWrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 10,
        paddingBottom: 10,
    },
    icon: {
        marginRight: 10,
    },
    link: {
        color: lightColors.dark,
        fontSize: 16,
        fontFamily: commonStyles.fontMedium,
    },
    totalSalesWrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: 10,
        paddingBottom: 10,
    },
    totalSalesText: {
        color: lightColors.darkGrey,
        fontSize: 13,
        textTransform: "uppercase",
        fontFamily: commonStyles.fontMedium,
    },
    totalSales: {
        color: lightColors.dark,
        fontSize: 40,
        fontFamily: commonStyles.fontSemiBold,
    },
    categoryItemText: {
        color: lightColors.dark,
        fontSize: 16,
        fontFamily: commonStyles.fontMedium,
        marginBottom: 10,
        backgroundColor: lightColors.light,
        marginRight: 10,
        padding: 6,
        paddingHorizontal: 12,
        borderRadius: lightColors.borderRadius,
        borderWidth: 2,
        borderColor: lightColors.light,
    },
    dropdown: {
        backgroundColor: lightColors.light,
        borderRadius: lightColors.borderRadius,
        borderColor: lightColors.light,
        marginBottom: 15,
        fontFamily: commonStyles.fontRegular,
    },
    dropdownPlaceholder: {
        color: lightColors.grey,
        paddingHorizontal: 6,
        paddingVertical: 13,
        fontFamily: commonStyles.fontRegular,
    },
});
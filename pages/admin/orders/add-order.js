import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { commonStyles, formStyles } from '../../../theme/styles';
import { lightColors } from '../../../theme/colors';
import DropDownPicker from "react-native-dropdown-picker";
import { Formik } from "formik";
import BackButton from '../../../components/common/back-button';
import { addOrder, getOrder, updateOrder } from '../../../redux/orders/orderActions';
import { getUser } from '../../../redux/users/userActions';
import { getProduct } from '../../../redux/products/productActions';
import DateTimePicker from '@react-native-community/datetimepicker';
import { APPROVED_STATUS, COMPLETED_STATUS, PENDING_STATUS, READY_STATUS, SHIPPED_STATUS } from '../../../helpers/common';

const AddOrder = (props) => {
    const { users } = useSelector((state) => state.adminUserReducer);
    const { products } = useSelector((state) => state.adminProductReducer);
    let [isEdit, setIsEdit] = useState(false);
    let [orderDate, setOrderDate] = useState(new Date())
    let [editingItem, setEditingItem] = useState(null);
    let [initialValues, setInitialValues] = useState({});
    let [selectOpen, setSelectOpen] = useState([false, false, false, false, false, false]);

    const dispatch = useDispatch();

    const onFormSubmit = async (values) => {
        let status = validateForm(initialValues);
        if (status.status && values !== {}) {
            if(!isEdit) {
                dispatch(addOrder({
                    ...initialValues,
                    id: new Date().getTime(),
                }));
                setInitialValues({});
                props.navigation.goBack();
            }
            else{
                dispatch(updateOrder({
                    ...initialValues,
                    id: editingItem.id,
                }));
                props.navigation.goBack();
            }
        }
        else{
            alert(status.message);
        }
    }

    const validateForm = (values) => {
        if (!values.quantity && values.quantity != "") return {message: "Please enter quantity", status: false};
        if (!values.user && values.user != "") return {message: "Please select user", status: false};
        if (!values.product && values.product != "") return {message: "Please select product", status: false};
        if (!values.order_date && values.order_date != "") return {message: "Please select order date", status: false};
        if (!values.size && values.size != "") return {message: "Please enter size", status: false};
        if (!values.status && values.status != "") return {message: "Please select status", status: false};
        else return {status: true};
    }

    const getTextInput = (name, field, placeholder, handleBlur, handleChange, type = 'default') => {
        return <View style={styles.inputWrapper}>
            <Text style={formStyles.label}>{name}</Text>
            <TextInput
                style={formStyles.input}
                onChangeText={(e) => {
                    handleChange(field)(e);
                    let obj = {};
                    obj[field] = e;
                    setInitialValues({...initialValues, ...obj});
                }}
                keyboardType={type}
                onBlur={handleBlur(field)}
                placeholderTextColor={lightColors.grey}
                value={initialValues[field]}
                placeholder={placeholder}
            />
        </View>
    }

    useEffect(() => {
        if (props.route.params && props.route.params.isEdit) {
            setIsEdit(true);
            let item = props.route.params.item;
            setEditingItem(item);
            setInitialValues({
                quantity: item.quantity.toString(),
                user: item.user.id,
                product: item.product.id,
                order_date: item.order_date,
                size: item.size,
                status: item.status,
            });
            setOrderDate(new Date(item.order_date));
        }
    }, []);

    useEffect(() => {
        if(!users.length || users.length <= 0) dispatch(getUser());
        if(!products.length || products.length <= 0) dispatch(getProduct());
    }, [users, products]);

    return (
        <View style={commonStyles.mainContainer}>
            <SafeAreaView>
                <BackButton navigation={props.navigation}/>
                <View style={styles.header}>
                    <Text style={{...commonStyles.mainHeading, marginTop: 10}}>{isEdit ? 'Update' : 'Add'} Order</Text>
                </View>
                
                {/* FORM STARTS */}
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onFormSubmit}
                    >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={styles.form}>
                            
                            {getTextInput('Product Quantity', 'quantity', 'Ex. 2', handleBlur, handleChange, 'numeric')}

                            {
                                    users && users.length > 0 && <View style={{}}>
                                        <Text style={formStyles.label}>Select User</Text>
                                        <DropDownPicker
                                            style={styles.dropdown}
                                            value={initialValues['user']}
                                            listMode="MODAL"
                                            open={selectOpen[0]}
                                            onClose={() => {setSelectOpen([...selectOpen.map((item, i) => i === 0 ? !item : item)])}}
                                            onPress={() => {setSelectOpen([...selectOpen.map((item, i) => i === 0 ? !item : item)])}}
                                            onSelectItem={(item) => {
                                                setInitialValues({...initialValues, user: item.value});
                                                setSelectOpen([...selectOpen.map((x, i) => i === 0 ? false : x)])
                                            }}
                                            items={users.map((item) => ({label: `${item.first_name} ${item.last_name} - ${item.email}`, value: item.id}))}
                                            placeholder={'Select User'}
                                            placeholderStyle={styles.dropdownPlaceholder}
                                            zIndex={10000}
                                            modalTitle={'Select User'}
                                            modalProps={{
                                                animationType: 'slide',
                                                hardwareAccelerated: true,
                                                onRequestClose: () => setSelectOpen([...selectOpen.map((x, i) => i === 0 ? false : x)]),
                                                onDismiss: () => setSelectOpen([...selectOpen.map((x, i) => i === 0 ? false : x)])
                                            }}
                                            dropDownDirection="DOWN"
                                        />
                                    </View>
                                }

                                {
                                    products && products.length > 0 && <View style={{}}>
                                        <Text style={formStyles.label}>Select Product</Text>
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

                                <Text style={formStyles.label}>Select Order Date</Text>
                                <View style={{}}>
                                    <DateTimePicker
                                        style={{height: 50, width: 110, display: 'flex', justifyContent: 'flex-start', marginBottom: 10}}
                                        themeVariant="light"
                                        testID="dateTimePicker"
                                        value={orderDate}
                                        mode={'date'}
                                        is24Hour={false}
                                        onChange={(e, date) => {
                                            setOrderDate(new Date(date));
                                            setInitialValues({...initialValues, order_date: new Date(date)});
                                        }}
                                    /> 
                                </View>

                                {getTextInput('Enter Size', 'size', 'Ex. S, M, L, XL', handleBlur, handleChange, 'default')}

                                <Text style={formStyles.label}>Select Status</Text>
                                <DropDownPicker
                                    style={styles.dropdown}
                                    value={initialValues['status']}
                                    listMode="MODAL"
                                    open={selectOpen[2]}
                                    onClose={() => {setSelectOpen([...selectOpen.map((item, i) => i === 2 ? !item : item)])}}
                                    onPress={() => {setSelectOpen([...selectOpen.map((item, i) => i === 2 ? !item : item)])}}
                                    onSelectItem={(item) => {
                                        setInitialValues({...initialValues, status: item.value});
                                        setSelectOpen([...selectOpen.map((x, i) => i === 2 ? false : x)])
                                    }}
                                    items={[
                                        {label: 'Pending', value: PENDING_STATUS},
                                        {label: 'Approved', value: APPROVED_STATUS},
                                        {label: 'Ready', value: READY_STATUS},
                                        {label: 'Shipped', value: SHIPPED_STATUS},
                                        {label: 'Completed', value: COMPLETED_STATUS},
                                    ]}
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


                            <TouchableOpacity onPress={handleSubmit} style={formStyles.submitButton}>
                                <Text style={formStyles.buttonText}>{isEdit ? 'Update' : 'Create'}</Text>
                            </TouchableOpacity>

                        </View>
                    )}
                    </Formik>
                {/* FORM ENDS */}

            </SafeAreaView>
            <StatusBar style="auto"></StatusBar>
        </View>
    );
}

export default AddOrder;

const styles = StyleSheet.create({
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    imageUploading: {
        width: 150,
        height: 150,
        marginBottom: 10,
        borderRadius: 10,
    },
    sizes: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 15,
    },  
    size: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        backgroundColor: '#cccccc60',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    sizeSelected: {
        backgroundColor: lightColors.light, 
        borderWidth: 2,
        borderColor: lightColors.primary,
    },
    sizeText: {
        color: lightColors.white,
        fontSize: 16,
        fontFamily: commonStyles.fontMedium
    },
    imageUploadWrapper: {
        backgroundColor: lightColors.light,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 15,
        borderRadius: lightColors.borderRadius,
    },  
    selectImageText: {
        color: lightColors.dark,
        backgroundColor: lightColors.light,
        fontSize: 16,
        fontWeight: commonStyles.fontMedium,
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
    },
    label: {
        color: lightColors.dark,
        fontSize: 16,
        fontFamily: commonStyles.fontMedium,
        marginBottom: 5,
        position: "relative",
        zIndex: 0
    },
    input: {
        fontSize: 16,
        marginBottom: 15,
        marginTop: 5,
        backgroundColor: lightColors.light,
        padding: 15,
        borderRadius: lightColors.borderRadius,
        fontFamily: commonStyles.fontRegular,
        position: "relative",
        zIndex: 0
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
        // fontSize: 16,
        paddingHorizontal: 6,
        paddingVertical: 13,
        fontFamily: commonStyles.fontRegular,
    },
    submitButton: {
        backgroundColor: lightColors.primary,
        padding: 20,
        borderRadius: lightColors.borderRadius,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: -1,
    },
    buttonText: {
        color: lightColors.light,
        fontSize: 16,
        fontFamily: commonStyles.fontMedium,
    },
});

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { commonStyles, formStyles } from '../../../theme/styles';
import { lightColors } from '../../../theme/colors';
import { Formik } from "formik";
import BackButton from '../../../components/common/back-button';
import { addCategory, updateCategory } from '../../../redux/category/categoryActions';

const AddCategory = (props) => {
    let [isEdit, setIsEdit] = useState(false);
    let [editingItem, setEditingItem] = useState(null);
    let [initialValues, setInitialValues] = useState({});

    const dispatch = useDispatch();

    const onFormSubmit = (values) => {
        let status = validateForm(values);
        if (status.status && values !== {}) {
            if(!isEdit) {
                dispatch(addCategory({
                    ...values,
                    id: new Date().getTime(),
                }));
                setInitialValues({});
            }
            else{
                dispatch(updateCategory({
                    ...values,
                    id: editingItem.id,
                }));
            }
        }
        else{
            alert(status.message);
        }
    }

    const validateForm = (values) => {
        if (!values.name && values.name != "") return {message: "Please enter category name", status: false};
        else return {status: true};
    }

    useEffect(() => {
        if (props.route.params && props.route.params.isEdit) {
            setIsEdit(true);
            setEditingItem(props.route.params.item);
            setInitialValues(props.route.params.item);
        }
    }, []);

    return (
        <View style={commonStyles.mainContainer}>
            <SafeAreaView>
                <BackButton navigation={props.navigation}/>
                <View style={styles.header}>
                    <Text style={{...commonStyles.mainHeading, marginTop: 10}}> {isEdit ? `Edit Category`: `Add Category`}</Text>
                </View>
                
                {/* FORM STARTS */}
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onFormSubmit}
                    >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={styles.form}>
                            <View style={styles.inputWrapper}>
                                <Text style={formStyles.label}>Category Name</Text>
                                    <TextInput
                                        style={formStyles.input}
                                        onChangeText={(e) => {
                                            handleChange('name')(e);
                                            setInitialValues({...initialValues, name: e});
                                        }}
                                        onBlur={handleBlur('name')}
                                        placeholderTextColor={lightColors.grey}
                                        value={initialValues['name']}
                                        placeholder={'Ex. Electronics'}
                                    />
                            </View>

                            <TouchableOpacity onPress={handleSubmit} style={formStyles.submitButton}>
                                <Text style={formStyles.buttonText}>{isEdit ? `Update`: `Create`}</Text>
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

export default AddCategory;

const styles = StyleSheet.create({
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
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

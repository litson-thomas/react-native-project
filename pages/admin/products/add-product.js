import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { commonStyles, formStyles } from '../../../theme/styles';
import { lightColors } from '../../../theme/colors';
import { Formik } from "formik";
import BackButton from '../../../components/common/back-button';
import { addProduct, updateProduct } from '../../../redux/products/productActions';
import * as DocumentPicker from 'expo-document-picker';
import DropDownPicker from "react-native-dropdown-picker";
import { getCategories } from '../../../redux/category/categoryActions';
import { supabase } from '../../../utils/initSupabase';
import Constants from "expo-constants";

const AddProduct = (props) => {
    const { categories } = useSelector((state) => state.categoryReducer);

    let [isEdit, setIsEdit] = useState(false);
    let [editingItem, setEditingItem] = useState(null);
    let [initialValues, setInitialValues] = useState({});
    let [uploadingImage, setUploadingImage] = useState(null);
    let [selectOpen, setSelectOpen] = useState([false]);
    let [sizes, setSizes] = useState([
        { label: "S", value: "S", selected: false }, 
        { label: "M", value: "M", selected: false },
        { label: "L", value: "L", selected: false }, 
        { label: "XL", value: "XL", selected: false }
    ]);

    const dispatch = useDispatch();

    const onFormSubmit = async (values) => {
        let status = validateForm(initialValues);
        if (status.status && values !== {}) {
            let fileName = uploadingImage?.name;
            if(uploadingImage && uploadingImage.uri) fileName = await uploadFile();
            let obj = initialValues;
            if(!isEdit) {
                delete obj.imageData;
                obj.images = [fileName];
                obj.rating = 0;
                obj.type = 1;
                obj.id = new Date().getTime();
                dispatch(addProduct(obj));
                props.navigation.goBack();
            }
            else{
                delete obj.imageData;
                obj.images = [fileName];
                console.log(obj);
                dispatch(updateProduct({
                    ...obj,
                    id: editingItem.id,
                }));
                props.navigation.goBack();
            }
        }
        else{
            alert(status.message);
        }
    }

    const uploadFile = async () => {
        let fileName = `${new Date().getTime()}-${uploadingImage.name}`;
        let fileUpload = await supabase.storage
            .from('mad6114-project')
            .upload(`public/product/${fileName}`, uploadingImage);
        if(fileUpload.error) {
            alert("Error while uploading image");
            return false;
        }
        return fileName;
    }

    const validateForm = (values) => {
        if (!values.name && values.name != "") return {message: "Please enter product name", status: false};
        if (!values.price && values.price != "") return {message: "Please enter product price", status: false};
        if (!values.category && values.category != "") return {message: "Please select product category", status: false};
        if (!values.description && values.description != "") return {message: "Please enter product description", status: false};
        if (!values.images && values.images != "") return {message: "Please select product image", status: false};
        if (!values.sizes && values.sizes != "") return {message: "Please select product sizes", status: false};
        else return {status: true};
    }

    useEffect(() => {
        dispatch(getCategories());
        if (props.route.params && props.route.params.isEdit) {
            setIsEdit(true);
            setEditingItem(props.route.params.item);
            setDefaultValues();
        }
    }, []);

    const setDefaultValues = () => {
        setInitialValues(props.route.params.item);
        // set the price
        setInitialValues({...props.route.params.item, price: props.route.params.item.price.toString()});
        // set the sizes
        setSizes(sizes.map((item) => {
            if(props.route.params.item.sizes.includes(item.value)) return {...item, selected: true};
            else return {...item, selected: false};
        }));
        // set the image
        setUploadingImage({
            name: props.route.params.item.images[0],
            url: `${Constants.expoConfig.extra.productUrl}/${props.route.params.item.images[0]}`
        });
    }

    const selectImage = async () => {
        let result = await DocumentPicker.getDocumentAsync({type: 'image/*'});
        if(result.type == 'success') {
            setUploadingImage(result);
            setInitialValues({
                ...initialValues,
                imageData: result,
                images: [result.name],
            });
        }
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
        // console.log(initialValues)
    }, [initialValues]);

    return (
        <>
            <StatusBar style="auto" />
            <SafeAreaView style={{flex: 1, margin: 20}}>
                <BackButton navigation={props.navigation}/>
                <View style={styles.header}>
                    <Text style={{...commonStyles.mainHeading, marginTop: 10}}>{isEdit ? 'Edit' : 'Add'} Product</Text>
                </View>
                
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* FORM STARTS */}
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onFormSubmit}
                        >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <View style={styles.form}>

                                {getTextInput('Product Name', 'name', 'Ex. Xbox One S', handleBlur, handleChange)}

                                <Text style={formStyles.label}>Product Description</Text>
                                <TextInput
                                    style={{...formStyles.input, paddingTop: 15}}
                                    onChangeText={(e) => {
                                        handleChange('description')(e);
                                        let obj = {};
                                        obj['description'] = e;
                                        setInitialValues({...initialValues, ...obj});
                                    }}
                                    multiline = {true}
                                    keyboardType={'default'}
                                    onBlur={handleBlur('description')}
                                    placeholderTextColor={lightColors.grey}
                                    value={initialValues['description']}
                                    placeholder={"Enter product description"}
                                />

                                {
                                    categories && categories.length > 0 && <View style={{}}>
                                        <Text style={formStyles.label}>Select Category</Text>
                                        <DropDownPicker
                                            style={styles.dropdown}
                                            value={initialValues['category']}
                                            listMode="SCROLLVIEW"
                                            open={selectOpen[0]}
                                            onPress={() => {setSelectOpen([...selectOpen.map((item, i) => i === 0 ? !item : item)])}}
                                            onSelectItem={(item) => {
                                                setInitialValues({...initialValues, category: item.value});
                                                setSelectOpen([...selectOpen.map((x, i) => i === 0 ? false : x)])
                                            }}
                                            items={categories.map((item) => ({label: item.name, value: item.id}))}
                                            placeholder={'Select Category'}
                                            placeholderStyle={styles.dropdownPlaceholder}
                                            zIndex={10000}
                                            dropDownDirection="TOP"
                                        />
                                    </View>
                                }

                                <Text style={formStyles.label}>Select Product Image</Text>
                                <TouchableOpacity style={styles.imageUploadWrapper} onPress={() => selectImage()}>
                                    {uploadingImage && uploadingImage.uri && <Image style={styles.imageUploading} source={{ uri: uploadingImage.uri}}/>}
                                    {uploadingImage && uploadingImage.url && <Image style={styles.imageUploading} source={{ uri: uploadingImage.url}}/>}
                                    <Text style={styles.selectImageText}>{uploadingImage ? uploadingImage.name : 'Select Image'}</Text>
                                </TouchableOpacity>

                                {getTextInput('Enter Price', 'price', 'Ex. 100.00', handleBlur, handleChange, 'numeric')}

                                <Text style={formStyles.label}>Select Sizes</Text>
                                <View style={styles.sizes}>
                                    {
                                        sizes.map((item, i) => {
                                            return <TouchableOpacity key={i} 
                                            onPress={() => {
                                                setSizes(sizes.map((x, j) => j == i ? {...x, selected: !x.selected} : x));
                                                setInitialValues({...initialValues, sizes: sizes.filter((x) => x.selected).map((x) => x.value)});
                                            }}
                                            style={item.selected ? {...styles.size, ...styles.sizeSelected} : styles.size}>
                                                <Text style={styles.sizeText}>{item.label}</Text>
                                            </TouchableOpacity>
                                        })
                                    }
                                </View>

                                <TouchableOpacity onPress={handleSubmit} style={formStyles.submitButton}>
                                    <Text style={formStyles.buttonText}>{isEdit ? 'Update' : 'Create'}</Text>
                                </TouchableOpacity>

                            </View>
                        )}
                        </Formik>
                    {/* FORM ENDS */}
                    <View style={{height: 400}}></View>
                </ScrollView>

            </SafeAreaView>
        </>
    );
}

export default AddProduct;

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

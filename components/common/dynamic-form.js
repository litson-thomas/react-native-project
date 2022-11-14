import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Button, TextInput, View, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { FormFieldTypes } from "../../classes/CustomForm";
import { lightColors } from "../../theme/colors";
import { commonStyles } from "../../theme/styles";
import DropDownPicker from "react-native-dropdown-picker";
import { getDataFromSupabase, parseRequiredValidators, parseSelectOpen } from "../../helpers/custom-form-helpers";

const DynamicForm = (props) => {
    let [form, setForm] = useState(props.form);
    let [selectOpen, setSelectOpen] = useState([]);
    let [valdators, setValidators] = useState([]);
    let [formReady, setFormReady] = useState(false);
    let initialValues = {};

    useEffect(() => {
        setSelectOpen(parseSelectOpen(form.getFields())); // parse selectOpen
        setValidators(parseRequiredValidators(form.getFields())); // parse validators
        parseForm();
    }, []);

    const parseForm = async () => {
        for (let i = 0; i < form.getFields().length; i++) {
            const field = form.getFields()[i];
            initialValues[field.getName()] = "";
            if(field.getType() === FormFieldTypes.SELECT) {
                if(field.getSelectListKey()){
                    let data = await getDataFromSupabase(field.getSelectListKey().key);
                    let items = data.map(item => {
                        return {
                            label: item[field.getSelectListKey().name],
                            value: item[field.getSelectListKey().field],
                        }
                    });
                    field.setItems(items);
                }
            }
        }
        setForm(form);
        setFormReady(true);
    }

    const onFormSubmit = (values) => {
        // console.log(values);
        // check if all required fields are filled
        let allRequiredFieldsFilled = true;
        valdators.forEach(validator => {
            console.log(validator.required, values[validator.name]);
            if(
                validator.required && values[validator.name] === "" || 
                validator.required && values[validator.name] === null ||
                validator.required && values[validator.name] === undefined
            ) {
                allRequiredFieldsFilled = false;
            }
        });
        if(allRequiredFieldsFilled) {
            console.log(values, allRequiredFieldsFilled)
        }
        else{
            alert("Please fill all required fields");
        }
    }

    return <>
        {   
            formReady ? <>
            <Formik
                initialValues={initialValues}
                onSubmit={onFormSubmit}
            >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                    {/* <Text style={styles.mainHeading}>{form.getTitle()}</Text> */}
                    {
                        form.getFields().map((field, index) => {
                            if(field.getType() === FormFieldTypes.TEXT) {
                                return <View key={index}>
                                    <Text style={styles.label}>{field.getLabel()} 
                                        {field.getRequired() ? <Text style={{color: 'red'}}> *</Text> : null}
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={handleChange(field.getName())}
                                        onBlur={handleBlur(field.getName())}
                                        placeholderTextColor={lightColors.grey}
                                        value={values[field.getName()]}
                                        placeholder={field.getLabel()}
                                    />
                                </View>
                            }
                            if(field.getType() === FormFieldTypes.SELECT){
                                return <View key={index}>
                                    <Text style={styles.label}>{field.getLabel()}
                                        {field.getRequired() ? <Text style={{color: 'red'}}> *</Text> : null}
                                    </Text>
                                    <View style={{}}>
                                        <DropDownPicker
                                            style={styles.dropdown}
                                            value={values[field.getName()]}
                                            listMode="SCROLLVIEW"
                                            modalTitle={field.getLabel()}
                                            onClose={() => {
                                                setSelectOpen((prevState) => {
                                                    let newState = [...prevState];
                                                    newState[index] = false;
                                                    return newState;
                                                });
                                            }}
                                            searchable={false}
                                            open={selectOpen[index]}
                                            onPress={() => {
                                                setSelectOpen([...selectOpen.map((item, i) => i === index ? !item : item)])
                                            }}
                                            onSelectItem={(item) => {
                                                setSelectOpen([...selectOpen.map((x, i) => i === index ? false : x)])
                                                handleChange(field.getName())(item.value);
                                            }}
                                            setValue={handleChange(field.getName())}
                                            items={field.getItems()}
                                            placeholder={field.getLabel()}
                                            placeholderStyle={styles.dropdownPlaceholder}
                                            searchPlaceholder="Search here..."
                                            onChangeValue={handleChange(field.getName())}
                                            zIndex={10000}
                                            dropDownDirection="TOP"
                                        />
                                    </View>
                                </View>
                            }
                        })
                    }
                    <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                        <Text style={styles.buttonText}>{form.getSubmitButtonTitle()}</Text>
                    </TouchableOpacity>
                </View>
            )}
            </Formik>
            </> : <></>
        }
    </>
    
};

export default DynamicForm;

const styles = StyleSheet.create({
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
        fontSize: 16,
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

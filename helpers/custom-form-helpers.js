import { FormFieldTypes } from "../classes/CustomForm";
import { supabase } from "../utils/initSupabase";

// parse selectOpen
export const parseSelectOpen = (fields) => {
    let selectOpenArray = [];
    fields.forEach((field, index) => {
        if (field.getType() === FormFieldTypes.SELECT) {
            selectOpenArray[index] = {
                name: field.getName(),
                open: false,
                value: null,
            };
        }
    });
    return selectOpenArray;
}

// parse validators
export const parseRequiredValidators = (fields) => {
    let validatorsArray = [];
    fields.forEach((field, index) => {
        validatorsArray.push({
            name: field.getName(),
            required: field.getRequired(),
        })
    });
    return validatorsArray;
}

// get data from supbase
export const getDataFromSupabase = async (tableName) => {
    let { data, error } = await supabase
        .from(tableName)
        .select('*')
    return data;
}
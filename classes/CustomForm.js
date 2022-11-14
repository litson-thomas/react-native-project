export class CustomForm {
    
    constructor(
        title, description, fields = new FormField(), submitButtonTitle, onSubmit
    ) {
        this.title = title;
        this.description = description;
        this.fields = fields;
        this.submitButtonTitle = submitButtonTitle;
        this.onSubmit = onSubmit;
    }
    
    // getters
    getTitle() {return this.title}
    getDescription() {return this.description}
    getFields() {return this.fields}
    getSubmitButtonTitle() {return this.submitButtonTitle}
    getOnSubmit() {return this.onSubmit}

    // setters
    setTitle(title) {this.title = title}
    setDescription(description) {this.description = description}
    setFields(fields) {this.fields = fields}
    setSubmitButtonTitle(submitButtonTitle) {this.submitButtonTitle = submitButtonTitle}
    setOnSubmit(onSubmit) {this.onSubmit = onSubmit}
}

export class FormField {

    constructor(
        name, label, type, placeholder, required, validation, items = [], selectListKey
    ) {
        this.name = name;
        this.label = label;
        this.type = type;
        this.placeholder = placeholder;
        this.required = required;
        this.validation = validation;
        this.items = items;
        this.selectListKey = selectListKey;
    }

    // getters
    getName() {return this.name}
    getLabel() {return this.label}
    getType() {return this.type}
    getPlaceholder() {return this.placeholder}
    getRequired() {return this.required}
    getValidation() {return this.validation}
    getItems() {return this.items}
    getSelectListKey() {return this.selectListKey}

    // setters
    setName(name) {this.name = name}
    setLabel(label) {this.label = label}
    setType(type) {this.type = type}
    setPlaceholder(placeholder) {this.placeholder = placeholder}
    setRequired(required) {this.required = required}
    setValidation(validation) {this.validation = validation}
    setItems(items) {this.items = items}
    setSelectListKey(selectListKey) {this.selectListKey = selectListKey}

}

export const FormFieldTypes = {
    TEXT: "text",
    EMAIL: "email",
    PASSWORD: "password",
    NUMBER: "number",
    DATE: "date",
    TIME: "time",
    DATETIME: "datetime",
    CHECKBOX: "checkbox",
    RADIO: "radio",
    SELECT: "select",
    TEXTAREA: "textarea",
    FILE: "file",
}
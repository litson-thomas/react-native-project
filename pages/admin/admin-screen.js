import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DynamicForm from '../../components/common/dynamic-form';
import { lightColors } from '../../theme/colors';
import { commonStyles } from '../../theme/styles';
import { Feather } from '@expo/vector-icons'; 

const AdminScreen = (props) => {

    const PersonSingleLink = (title, icon, onClick) => {
        return <TouchableOpacity style={styles.linkWrapper} onPress={onClick}>
            <Feather name={icon} size={25} style={styles.icon} color={lightColors.dark} />
            <Text style={{...styles.link, flexGrow: 1}}>{title}</Text>
            <Feather name="chevron-right" size={20} style={{color: lightColors.grey}} color={lightColors.dark} />
        </TouchableOpacity>
    }

    return (
        <View style={commonStyles.mainContainer}>
            <SafeAreaView>
                <Text style={{...commonStyles.mainHeading, marginTop: 10}}>Admin Panel</Text>
                {PersonSingleLink("Sales", "pie-chart", () => {props.navigation.navigate("Sales")})}
                {PersonSingleLink("Categories", "filter", () => {props.navigation.navigate("Categories")})}
                {PersonSingleLink("Products", "book", () => {props.navigation.navigate("Products")})}
                {PersonSingleLink("Users", "user", () => {props.navigation.navigate("Users")})}
                {PersonSingleLink("Manage Orders", "shopping-cart", () => {props.navigation.navigate("Orders")})}
            </SafeAreaView>
            <StatusBar style="auto"></StatusBar>
        </View>
    );
}

export default AdminScreen;

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
});
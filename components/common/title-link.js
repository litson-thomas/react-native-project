import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { lightColors } from '../../theme/colors';
import { commonStyles } from '../../theme/styles';

const TitleLink = ({ navigation, title, url }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {/* <TouchableOpacity onPress={() => {navigation.navigate(url)}}>
                <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity> */}
        </View>
    );
}

export default TitleLink;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 0,
        marginLeft: 20,
        marginRight: 20,
    },
    title: {
        fontSize: 15,
        fontFamily: commonStyles.fontMedium,
        color: lightColors.dark,
    },
    viewAll: {
        fontSize: 15,
        fontFamily: commonStyles.fontRegular,
        color: lightColors.darkGrey,
    }
});
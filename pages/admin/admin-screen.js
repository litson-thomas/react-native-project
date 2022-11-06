import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { commonStyles } from '../../theme/styles';

const AdminScreen = () => {
    return (
        <View style={commonStyles.mainContainer}>
            <SafeAreaView>
                <Text style={{...commonStyles.mainHeading, marginTop: 10}}>Admin Panel</Text>
            </SafeAreaView>
        </View>
    );
}

export default AdminScreen;

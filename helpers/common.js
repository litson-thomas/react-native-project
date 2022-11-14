import * as Haptics from 'expo-haptics';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RectButton } from 'react-native-gesture-handler';
import { Animated } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { lightColors } from '../theme/colors';
import { commonStyles } from '../theme/styles';

const LocalStorage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
});
const SESSION_STORAGE_KEY = 'avengers-store-user-session';

export const LightHaptics = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
}

export const setSessionInfoInLocal = async (user) => {
    LocalStorage.save({
        key: SESSION_STORAGE_KEY,
        data: user,
    });
}

export const getSessionInfoFromLocal = async () => {
    
    let session = await LocalStorage.load({
        key: SESSION_STORAGE_KEY,
    }).catch((err) => {
        console.log(err.message);
    });

    return session;
}

export const removeSessionInfoFromLocal = async () => {
    return await LocalStorage.remove({
        key: SESSION_STORAGE_KEY,
    });
}

const styles = {
    deleteButton: {
        backgroundColor: 'red',
        marginTop: 0,
        marginBottom: 10,
        marginLeft: 10,
        width: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: lightColors.borderRadius
    },
};
export const rightSwipeDeleteAction = (progress, dragX, onPress) => {
    const trans = dragX.interpolate({
        inputRange: [0, 50, 100, 101],
        outputRange: [-20, 0, 0, 1],
    });
    return (
        <RectButton style={styles.deleteButton} onPress={onPress}>
            <Animated.Text style={[
                styles.actionText,
                // {transform: [{ translateX: trans }]},
            ]}>
                <Feather name="trash-2" size={25} style={styles.icon} color={lightColors.light} />
            </Animated.Text>
        </RectButton>
    );
}

export const PENDING_STATUS = 'pending';
export const APPROVED_STATUS = 'approved';
export const COMPLETED_STATUS = 'completed';
export const READY_STATUS = 'ready-to-ship';
export const SHIPPED_STATUS = 'shipped';
import * as Haptics from 'expo-haptics';

export const LightHaptics = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
}
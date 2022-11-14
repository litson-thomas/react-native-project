import { lightColors } from "./colors";

export const commonStyles = {
    fontRegular: 'Poppins-Regular',
    fontBlack: 'Poppins-Black',
    fontThin: 'Poppins-Thin',
    fontLight: 'Poppins-Light',
    fontExtraBold: 'Poppins-ExtraBold',
    fontExtraLight: 'Poppins-ExtraLight',
    fontMedium: 'Poppins-Medium',
    fontSemiBold: 'Poppins-SemiBold',
    mainHeading: {
        fontSize: 25,
        marginBottom: 20,
        fontFamily: 'Poppins-SemiBold',
        color: lightColors.dark,
    },
    mainContainer: {
        padding: 20,
    },
}

export const formStyles = {
    label: {
        color: lightColors.darkGrey,
        fontSize: 14,
        fontFamily: commonStyles.fontRegular,
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
}
import { StyleSheet } from "react-native";
export const globalStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainBackgroundColor: {
        backgroundColor: MAIN_COLOR,
    },
    input: {
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: MUTED_COLOR,
        padding: 15,
        fontSize: 16,
        width: '100%',
        marginBottom: 15,
    },
    button: {
        borderRadius: 10,
        padding: 15,
        width: '100%',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export const MAIN_COLOR = '#ef506b';
export const MUTED_COLOR = '#6c757d';
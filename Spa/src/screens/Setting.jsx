import { View, TouchableOpacity, Text } from "react-native";
import { globalStyle, MAIN_COLOR } from '../../styles';
import { logout } from '../services/api';

const Setting = ({ navigation }) => {
    const Logout = async () => {
        try {
            await logout();
            navigation.replace('Login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }
    return (
        <View style={{ padding: 16, backgroundColor: 'white', flex: 1 }}>
            <TouchableOpacity onPress={Logout} style={[globalStyle.button, { backgroundColor: MAIN_COLOR }]}>
                <Text style={globalStyle.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
};

export default Setting;
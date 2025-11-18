import React, { useEffect, useState } from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { globalStyle, MAIN_COLOR, MUTED_COLOR } from '../../styles';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { login } from '../../src/services/api';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        try {
            const key = await AsyncStorage.getItem('token');
            if (key) {
                navigation.replace('Main');
            }
        } catch (error) {
            console.error('Error checking token:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const res = await login(phone, password);
            Alert.alert('Success', 'Login successfully!', [
                {
                    text: 'OK',
                    onPress: () => {
                        navigation.navigate('Main')
                    }
                }
            ]);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to login.';
            console.log("Error while login", errorMessage)
        }
    }
    const insets = useSafeAreaInsets();

    return (
        <View style={[globalStyle.container, { backgroundColor: MAIN_COLOR }]}>
            <View style={[styles.container, { marginTop: insets.top }]}>
                <Text style={styles.title}>Login</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    keyboardType="numeric"
                    value={phone}
                    placeholderTextColor={MUTED_COLOR}
                    onChangeText={setPhone}
                />

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={[{ flex: 1, color: 'black' }]}
                        placeholder="Password"
                        secureTextEntry={!showPassword}
                        value={password}
                        placeholderTextColor={MUTED_COLOR}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <MaterialDesignIcons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={20}
                            color={MUTED_COLOR}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={[styles.button, { backgroundColor: MAIN_COLOR }]} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: "#f2f2f2",
        flex: 1
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: MAIN_COLOR,
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: MUTED_COLOR,
        padding: 16,
        fontSize: 16,
        width: '100%',
        marginBottom: 15,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: MUTED_COLOR,
        paddingHorizontal: 16,
        paddingVertical: 8,
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

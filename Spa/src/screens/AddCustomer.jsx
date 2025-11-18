import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native'
import { globalStyle, MAIN_COLOR, MUTED_COLOR } from '../../styles';
import { useState } from 'react';
import { addCustomer } from '../services/api'


const AddCustomer = ({ navigation, route }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')


    const addCus = async () => {
        try {
            const res = await addCustomer(name, phone);
            Alert.alert('Success', 'Customer added successfully', [{ text: 'OK' }])
            navigation.navigate('Main', { screen: 'Customer' });
        } catch (error) {
            console.error(error)
        }
    }

    return (<View style={styles.container}>
        <Text style={styles.label}>Customer name *</Text>
        <TextInput
            placeholder='Input your customer name'
            placeholderTextColor={MUTED_COLOR}
            style={globalStyle.input}
            value={name}
            onChangeText={setName}
        />
        <Text style={styles.label}>Phone *</Text>
        <TextInput
            value={phone}
            keyboardType='phone-pad'
            style={globalStyle.input}
            onChangeText={setPhone}
            placeholder='Input a phone number'
            placeholderTextColor={MUTED_COLOR}
        />
        <TouchableOpacity style={[globalStyle.button, { backgroundColor: MAIN_COLOR }]} onPress={addCus}>
            <Text style={globalStyle.buttonText}>Add</Text>
        </TouchableOpacity>
    </View>)
}

export default AddCustomer;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 5
    },
    label: {
        fontWeight: 'bold'
    }
})
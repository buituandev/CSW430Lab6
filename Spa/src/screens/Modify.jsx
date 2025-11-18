import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native'
import { globalStyle, MAIN_COLOR, MUTED_COLOR } from '../../styles';
import { useEffect, useState } from 'react';
import { addService, getAService, updateService } from '../services/api'


const Modify = ({navigation, route}) => {
    const id = route.params?.id;
    const [name, setName] = useState('')
    const [price, setPrice] = useState('0')
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        fetchUpdate()
    }, [])

    const fetchUpdate = async () => {
        if (!id) {
            return
        }

        try {
            const data = await getAService(id);
            setName(data?.name)
            setPrice(data?.price?.toString() || '')
            if (data) {
                setUpdate(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const modifyService = async () => {
        if (id) {
            try {
                const res = await updateService(id, name, Number(price));
                navigation.navigate('Detail', { id: id })
            } catch (error) {
                console.error(error)

            }
        } else {
            try {
                const res = await addService(name, Number(price));
                navigation.navigate('Detail', { id: res._id })
            } catch (error) {
                console.error(error)

            }
        }
    }

    return (<View style={styles.container}>
        <Text style={styles.label}>Service name *</Text>
        <TextInput
            placeholder='Input a service name'
            placeholderTextColor={MUTED_COLOR}
            style={globalStyle.input}
            value={name}
            onChangeText={setName}
        />
        <Text style={styles.label}>Price</Text>
        <TextInput
            value={price}
            keyboardType='numeric'
            style={globalStyle.input}
            onChangeText={setPrice}
        />
        <TouchableOpacity style={[globalStyle.button,{backgroundColor: MAIN_COLOR}]} onPress={modifyService}>  
                <Text style={globalStyle.buttonText}>{update ? "Update" : "Add"}</Text>
        </TouchableOpacity>
    </View>)
}

export default Modify;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 5
    },
    label: {
        fontWeight: 'bold'
    }
})
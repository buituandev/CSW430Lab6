import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Alert } from "react-native"
import { getAService, deleteService } from '../services/api'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons'
import formatVND from "../utils/money"

const Detail = ({ route, navigation }) => {
    const { id } = route.params;
    const [service, setService] = useState({})

    useEffect(() => {
        fetchAService();
    }, [])

    const fetchAService = async () => {
        try {
            const response = await getAService(id);
            setService(response)
        } catch (error) {
            console.error("Error while loading data: ", error)
        }
    }

    const handleEdit = () => {
        navigation.navigate('Service', { id: id });
    }

    const handleDelete = () => {
        Alert.alert(
            'Warning',
            'Are you sure you want to remove this service?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteService(id);
                            Alert.alert('Success', 'Service deleted successfully');
                            navigation.navigate('Main');
                        } catch (error) {
                            console.error('Error deleting service:', error);
                        }
                    }
                }
            ]
        );
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Menu>
                    <MenuTrigger>
                        <MaterialDesignIcons
                            name="dots-vertical"
                            size={30}
                            color="#fff"
                        />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={handleEdit}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
                                <Text style={{ marginLeft: 10, fontSize: 16 }}>Edit</Text>
                            </View>
                        </MenuOption>
                        <MenuOption onSelect={handleDelete}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
                                <Text style={{ marginLeft: 10, fontSize: 16, color: 'red' }}>Delete</Text>
                            </View>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            )
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text><Text style={styles.label}>Service name:</Text> {service.name}</Text>
            <Text><Text style={styles.label}>Price:</Text> {formatVND(service.price)}</Text>
            <Text><Text style={styles.label}>Creator:</Text> {service.user?.name}</Text>
            <Text><Text style={styles.label}>Time:</Text> {new Date(service.createdAt).toLocaleString()}</Text>
            <Text><Text style={styles.label}>Final Update:</Text> {new Date(service.updatedAt).toLocaleString()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 5
    },
    label: {
        fontWeight: 'bold'
    }
})

export default Detail;
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons"
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native"
import { MAIN_COLOR, MUTED_COLOR } from "../../styles"
import { useEffect, useState } from "react"
import { getAllCustomers, getAllTransactions } from "../services/api"
import formatVND from "../utils/money"


const Transaction = ({ navigation }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await getAllTransactions();
                setData(res)
            } catch (error) {
                console.error('Cannot fetch customers', error)
            }
        };
        fetchTransactions();
    }, [])

    const customerItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('TDetail', { 'id': item._id })} style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold' }}>{item.id} - {new Date(item.customer.updatedAt).toLocaleString()}</Text>
                    {item.services.map((service, index) => (
                        <Text key={service._id}>
                            - {service.name}
                        </Text>
                    ))}
                    <Text style={styles.label}>Customer: {item.customer.name}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Text style={{ color: MAIN_COLOR, fontWeight: 'bold' }}>{formatVND(item.price)}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ backgroundColor: 'white' }}>
            <FlatList
                data={data}
                keyExtractor={(item) => item._id}
                renderItem={customerItem}
            />
            <TouchableOpacity style={styles.floatingButton}>
                <MaterialDesignIcons name="plus" color='white' size={20} />
            </TouchableOpacity>
        </View>
    )
}

export default Transaction

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: MUTED_COLOR,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 8
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: MUTED_COLOR,
    }, floatingButton: {
        backgroundColor: MAIN_COLOR,
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999
    }
})
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons"
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native"
import { MAIN_COLOR, MUTED_COLOR } from "../../styles"
import { useEffect, useState } from "react"
import { getAllCustomers } from "../services/api"
import formatVND from "../utils/money"


const Customer = ({ navigation }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await getAllCustomers();
                setData(res)
            } catch (error) {
                console.error('Cannot fetch customers', error)
            }
        };
        fetchCustomers();
    }, [])

    const customerItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <View>
                    <Text><Text style={styles.label}>Customer: </Text>{item.name}</Text>
                    <Text><Text style={styles.label}>Phone: </Text>{item.phone}</Text>
                    <Text style={{ fontWeight: 'bold', color: MAIN_COLOR }}><Text style={styles.label}>Total money: </Text>{formatVND(item.totalSpent)}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <MaterialDesignIcons name="crown" size={20} color={MAIN_COLOR} />
                    <Text>Guest</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: 'white' }}>
            <FlatList
                data={data}
                keyExtractor={(item) => item._id}
                renderItem={customerItem}
            />
            <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('Addcus')}>
                <MaterialDesignIcons name="plus" color='white' size={20} />
            </TouchableOpacity>
        </View>
    )
}

export default Customer

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
        fontWeight: 'bold'
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
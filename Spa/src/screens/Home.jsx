import { useEffect, useState } from "react"
import { Image, View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native"
import { getAllServices } from "../services/api"
import { globalStyle, MAIN_COLOR } from "../../styles"
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons"
import formatVND from "../utils/money"


const Home = ({ navigation }) => {
    const [services, setServices] = useState([])

    useEffect(() => {
        fetchService();
    }, [])

    const fetchService = async () => {
        try {
            const data = await getAllServices();
            setServices(data);
        } catch (error) {
            console.error("Error while loading data: ", error)
        }
    }

    const ServiceItem = ({ item }) => {
        return (
            <TouchableOpacity onLongPress={() => {
                navigation.navigate('Service', { id: item._id })
            }} style={styles.item} onPress={() => navigation.navigate("Detail", { id: item._id })}>
                <Text style={styles.name}>{item.name}</Text>
                <Text>{formatVND(item.price)}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[globalStyle.container, styles.container]}>
            <Image resizeMode="cover" source={require("../assets/logo.png")} style={styles.logo} />
            <View style={styles.sectionContainer}>
                <Text style={styles.name}>Danh sách dịch vụ</Text>
                <MaterialDesignIcons onPress={() => {
                    navigation.navigate("Service")
                }} name="plus-circle" size={30} color={MAIN_COLOR} />
            </View>
            <FlatList
                data={services}
                keyExtractor={(item) => item._id}
                renderItem={ServiceItem}
            />
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16
    },
    sectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    item: {
        height: 50,
        flexDirection: 'row',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: "center",
        padding: 16,
        marginVertical: 8
    },
    name: {
        fontWeight: 'bold',
        flex: 1
    }, logo: {
        height: 75,
        alignSelf: 'center',
        marginBottom: 16
    }
})
import { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { getTransaction } from '../services/api'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons'
import { MAIN_COLOR, MUTED_COLOR } from '../../styles'
import formatVND from '../utils/money'

const TranDetail = ({ route, navigation }) => {
    const { id } = route.params;
    const [tran, setTran] = useState({})
    const [discount, setDiscount] = useState(0)

    useEffect(() => {
        fetchATran();
    }, [])

    const fetchATran = async () => {
        try {
            const response = await getTransaction(id);
            setTran(response)
            const before = response.priceBeforePromotion || 0;
            const after = response.price || 0;
            setDiscount(before - after);
        } catch (error) {
            console.error("Error while loading data: ", error)
        }
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
                        <MenuOption>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
                                <Text style={{ marginLeft: 10, fontSize: 16 }}>Edit</Text>
                            </View>
                        </MenuOption>
                        <MenuOption>
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
            <View style={styles.sectionContainer}>
                <View style={[styles.contentContainer, styles.innerPadding]}>
                    <View style={styles.gap}>
                        <Text style={styles.boldMuted}>General Information</Text>
                        <Text style={styles.label}>Transaction code</Text>
                        <Text style={styles.label}>Customer</Text>
                        <Text style={styles.label}>Creation time</Text>
                    </View>
                    <View style={[styles.gap, styles.rightAlign]}>
                        <Text></Text>
                        <Text style={styles.bold}>{tran.id}</Text>
                        <Text style={styles.bold}>{tran.customer?.name} - {tran.customer?.phone}</Text>
                        <Text style={styles.bold}>
                            {new Date(tran?.createdAt).toLocaleString()}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.sectionContainer}>
                <View style={[styles.contentContainer, styles.innerPadding]}>
                    <View style={styles.gap}>
                        <Text style={styles.boldMuted}>Service list</Text>
                        {tran.services?.map((service) => (
                            <Text key={service._id}>
                                {service?.name}
                            </Text>
                        ))}
                    </View>
                    <View style={[styles.gap, styles.rightAlign]}>
                        <Text></Text>
                        {tran.services?.map((service) => (
                            <Text style={{ color: MUTED_COLOR }} key={service._id}>
                                x{service.quantity}
                            </Text>
                        ))}
                    </View>
                    <View style={[styles.gap, styles.rightAlign]}>
                        <Text></Text>
                        {tran.services?.map((service) => (
                            <Text style={styles.bold} key={service._id}>
                                {formatVND(service.price)}
                            </Text>
                        ))}
                    </View>
                </View>

                <View style={styles.innerDivider} />

                <View style={[styles.contentContainer, styles.innerPadding]}>
                    <Text style={styles.boldMuted}>Total</Text>
                    <Text style={[styles.bold, styles.rightAlign]}>{formatVND(tran.priceBeforePromotion)}</Text>
                </View>
            </View>

            <View style={styles.sectionContainer}>
                <View style={[styles.contentContainer, styles.innerPadding]}>
                    <View style={styles.gap}>
                        <Text style={styles.boldMuted}>Cost</Text>
                        <Text style={styles.label}>Account of money</Text>
                        <Text style={styles.label}>Discount</Text>
                    </View>
                    <View style={[styles.gap, styles.rightAlign]}>
                        <Text></Text>
                        <Text style={styles.bold}>{formatVND(tran.priceBeforePromotion)}</Text>
                        <Text style={styles.bold}>- {formatVND(discount)}</Text>
                    </View>
                </View>

                <View style={styles.innerDivider} />

                <View style={[styles.contentContainer, styles.innerPadding]}>
                    <Text style={styles.boldMuted}>Total payment</Text>
                    <Text style={styles.boldMain}>{formatVND(tran.price)}</Text>
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16,
    },
    sectionContainer: {
        backgroundColor: 'white',
        borderRadius: 16,

    },
    innerPadding: {
        padding: 16,
    },
    innerDivider: {
        height: 1,
        backgroundColor: MUTED_COLOR,
        marginHorizontal: 16,
        opacity: 0.5,
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gap: {
        gap: 8
    },
    rightAlign: {

        alignItems: 'flex-end',
    },

    label: {
        fontWeight: 'bold',
        color: MUTED_COLOR
    },
    boldMuted: {
        fontWeight: 'bold',
        color: MUTED_COLOR,
        fontSize: 16
    },
    bold: {
        fontWeight: 'bold',
        textAlign: 'right'
    },
    boldMain: {
        fontWeight: 'bold',
        color: MAIN_COLOR,
        fontSize: 18,
        textAlign: 'right',
    },
});

export default TranDetail;
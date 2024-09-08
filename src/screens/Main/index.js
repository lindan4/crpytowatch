import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SwipeListView } from "react-native-swipe-list-view";
import { removeCurrency } from "../../redux/userSlice";
import { useState } from "react";

const FlItem = ({ item }) => {
  const { name, symbol, market_data } = item;

  const { price_usd, percent_change_usd_last_24_hours } = market_data;

  return (
    <View style={{ flexDirection: "row", backgroundColor: "#fff" }}>
      <View style={{ flex: 1 }}>
        <Text>{name}</Text>
        <Text>{symbol}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Text>{`\$${Number(price_usd).toFixed(2)}`}</Text>
        <Text>{`${Number(percent_change_usd_last_24_hours).toFixed(2)}%`}</Text>
      </View>
    </View>
  );
};

export default function Main({ navigation }) {
  const cryptoData = useSelector((state) => state.user.watchingCurrencies);

  const dispatch = useDispatch();

  const [refreshing, isRefereshing] = useState(false);

  const onRefresh = () => {};

  return (
    <View style={styles.container}>
      <SwipeListView
        keyExtractor={(item) => item.id}
        data={cryptoData}
        style={{ width: "100%", paddingHorizontal: 10 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => <FlItem item={item} />}
        rightOpenValue={-75}
        renderHiddenItem={(data, rowMap) => (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                width: "25%",
                backgroundColor: "red",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
              onPress={() => {
                dispatch(removeCurrency(data.item.id));
              }}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.footerStyle}
            onPress={() => navigation.navigate("addCur")}
          >
            <Text>Add a Cryptocurrency+</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  addCryptoCurrencyStyle: {
    fontSize: 20,
    color: "rgb(63, 86, 114)",
  },
  footerStyle: {
    paddingVertical: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});

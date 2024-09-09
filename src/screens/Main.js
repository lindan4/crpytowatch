import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SwipeListView } from "react-native-swipe-list-view";
import { removeCurrency, updateCurrencies } from "../redux/userSlice";
import { useState } from "react";

const FlItem = ({ item }) => {
  const { name, symbol, market_data } = item;

  const { price_usd, percent_change_usd_last_24_hours } = market_data;

  const isPosTrend = percent_change_usd_last_24_hours >= 0;

  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 25,
        bototmBorderWidth: 0.5,
        rowGap: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.itemTopTextStyling}>{name}</Text>
        <Text style={styles.itemTopTextStyling}>{`\$${Number(price_usd).toFixed(
          2
        )}`}</Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>{symbol}</Text>
        <Text style={{ color: isPosTrend ? "green" : "red" }}>{`${
          isPosTrend ? "\u2191" : "\u2193"
        }${Number(percent_change_usd_last_24_hours).toFixed(2)}%`}</Text>
      </View>
    </View>
  );
};

export default function Main({ navigation }) {
  const cryptoData = useSelector((state) => state.user.watchingCurrencies);

  const dispatch = useDispatch();

  const [refreshing, setRefereshing] = useState(false);

  const [isPos, setIsPos] = useState(false);

  const onRefresh = () => {
    setRefereshing(true);
    dispatch(updateCurrencies());
    setRefereshing(false);
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        keyExtractor={(item) => item.id}
        data={cryptoData}
        style={{ width: "100%" }}
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
              <Text style={{ color: "white" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.footerStyle}
            onPress={() => navigation.navigate("addCur")}
          >
            <Text style={styles.addCryptoCurrencyStyle}>
              + Add a Cryptocurrency
            </Text>
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
    fontSize: 15,
    color: "rgb(63, 86, 114)",
  },
  footerStyle: {
    paddingVertical: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  itemTopTextStyling: {
    fontWeight: "bold",
  },
});

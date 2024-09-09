import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { addCurrency } from "../redux/userSlice";

const AddCurrScreen = ({ navigation }) => {
  const [crypInput, setCrypInput] = useState("");
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  const onAddPress = () => {
    setIsError(false);
    dispatch(addCurrency(crypInput)).unwrap();

    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.viewStyle}>
      <View style={styles.innerViewStyle}>
        <Text style={styles.addCryptoTextStyle}>Add a Cryptocurrency</Text>
        <TextInput
          style={styles.symbolTextInputStyle}
          placeholder="Enter name or ticket symbol"
          value={crypInput}
          onChangeText={(val) => setCrypInput(val)}
        />
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity style={styles.addPressStyle} onPress={onAddPress}>
            <Text style={styles.addTextStyle}>Add</Text>
          </TouchableOpacity>
        </View>

        {isError && <Text>The currency does not exist.</Text>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  innerViewStyle: {
    paddingHorizontal: 15,
    rowGap: 10,
  },
  addCryptoTextStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  symbolTextInputStyle: {
    borderWidth: 0.5,
    borderRadius: 7,
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  addPressStyle: {
    backgroundColor: "#f4d465",
  },
  addTextStyle: {
    fontWeight: "bold",
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
});

export default AddCurrScreen;

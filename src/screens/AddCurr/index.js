import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addCurrency } from "../../redux/userSlice";
import { fetchCurrMetricData } from "../../api";

const AddCurrScreen = ({ navigation }) => {
  const [crypInput, setCrypInput] = useState("");
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  const onAddPress = () => {
    setIsError(false);
    fetchCurrMetricData(crypInput).then((res) => {
      if (res.status == 404) {
        setIsError(true);
      } else {
        dispatch(addCurrency(res.data.data));
        navigation.pop();
      }
    });
  };

  return (
    <SafeAreaView style={styles.viewStyle}>
      <View>
        <Text>Add a Cryptocurrency</Text>
        <TextInput
          placeholder="Enter name or ticket symbol"
          value={crypInput}
          onChangeText={(val) => setCrypInput(val)}
        />
        <View>
          <Button
            title="Add"
            disabled={crypInput.length == 0}
            onPress={onAddPress}
          />
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
});

export default AddCurrScreen;

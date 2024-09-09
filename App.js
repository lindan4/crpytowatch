import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./src/screens/Main";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import AddCurrScreen from "./src/screens/AddCurr";
import { SafeAreaView, Text } from "react-native";

const MainNavigator = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainNavigator.Navigator>
            <MainNavigator.Screen
              component={Main}
              name="Main"
              options={{
                headerTitle: "Crypto Tracker",
                headerTitleStyle: {
                  color: "white",
                  fontSize: 20,
                },
                headerStyle: {
                  backgroundColor: "rgb(63, 86, 114)",
                },
              }}
            />
            <MainNavigator.Screen
              component={AddCurrScreen}
              name="addCur"
              options={{
                headerTransparent: true,
                headerBackTitle: "Back to list",
                headerTitle: "",
              }}
            />
          </MainNavigator.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

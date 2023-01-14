import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import OTPScreen from "./screens/OTPScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="HomeScreen"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="OTPScreen"
            component={OTPScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
        <Toast position="bottom" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

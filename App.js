import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Components/HomeScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    "CustomFont-Regular": require("./assets/Fonts/LibreBaskerville-Regular.ttf"),
    "CustomFont-Bold": require("./assets/Fonts/LibreBaskerville-Bold.ttf"),
    "Poppins-bold": require("./assets/Fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: "TASKit",
              headerStyle: {
                backgroundColor: "#0E0E0E",
                paddingHorizontal: 20,
              },
              headerTintColor: "white",
              headerRight: (props) => (
                <Ionicons name="settings" color="white" size={23} />
              ),
              headerTitleStyle: {
                fontSize: 25,
                fontFamily: "Poppins-bold",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

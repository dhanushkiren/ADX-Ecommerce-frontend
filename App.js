import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfile  from "./src/components/EditProfile";
import SplashscreenLogo from "./src/screens/SplashscreenLogo"; 
const Stack = createNativeStackNavigator();

export default function App() {
  const[setIsShowSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    },4000);
  });
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={EditProfile} />
        
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
import {Image , StyleSheet ,View } from "react-native";
import Icon  from "./assets/carticon.png"
import { withLayoutContext } from "expo-router";
export default function SplashScreen()
{
return
(
 <View style={StyleSheet.container}>
    <View>
       <Image source={Icon} style={StyleSheet.image}/>
    </View>
 </View>
)
}

const styles =StyleSheet.create({
   container:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#00008B", 
   },
   image:
   {
     width:100,
     height:100,
     resizeMode:"cover" 
   }
})

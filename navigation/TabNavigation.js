import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Call from "../screens/Call";
import Search from "../screens/Search";
import Add from "../screens/Add";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function TabNabigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Profile":
              iconName = "person";
              break;
            case "Call":
              iconName = "call";
              break;
            case "Call":
              iconName = "call";
              break;
            case "Search":
                iconName = "search";
                break;
            case "Add":
                iconName = "add";
                break;
            default:
              iconName = "person";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#EFEFEF",
        headerShown: false,
        
      })}
    >
      <Tab.Screen name="Call" component={Call} options={{unmountOnBlur: true}}/>
      <Tab.Screen name="Home" component={Home} options={{unmountOnBlur: true}}/>
      <Tab.Screen name="Add" component={Add} options={{unmountOnBlur: true}}/>
      <Tab.Screen name="Search" component={Search} options={{unmountOnBlur: true}}/>
      <Tab.Screen name="Profile" component={Profile} options={{unmountOnBlur: true}}/>
    </Tab.Navigator>
  );
}

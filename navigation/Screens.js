import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Call from "../screens/Call";
import Search from "../screens/Search";
import Add from "../screens/Add";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Screens() {
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
      <Tab.Screen name="Call" component={Call} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Add" component={Add} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

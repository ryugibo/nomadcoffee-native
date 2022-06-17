import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Search from "../screens/Search";

const Tabs = createBottomTabNavigator();

const Nav = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <TabIcon
                iconName="home"
                focused={focused}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <TabIcon
                iconName="search"
                focused={focused}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <TabIcon
                iconName="people"
                focused={focused}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

export default Nav;

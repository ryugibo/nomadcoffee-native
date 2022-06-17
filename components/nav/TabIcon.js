import { Ionicons } from "@expo/vector-icons";

const TabIcon = ({ iconName, focused, color, size }) => {
  return (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      color={color}
      size={(focused ? 1.3 : 1.0) * size}
    />
  );
};

export default TabIcon;

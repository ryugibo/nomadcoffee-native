import { View, Text } from "react-native";
import { logUserOut } from "../apollo";
import AuthButton from "../components/auth/AuthButton";

const Me = () => {
  return (
    <View>
      <Text>My Profile</Text>
      <AuthButton text="Log out" onPress={() => logUserOut()} />
    </View>
  );
};

export default Me;

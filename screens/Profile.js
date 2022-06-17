import { View } from "react-native";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import Login from "./Login";
import Me from "./Me";

const Profile = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return <View>{isLoggedIn ? <Me /> : <Login />}</View>;
};

export default Profile;

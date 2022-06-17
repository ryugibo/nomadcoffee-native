import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async (token) => {
  await AsyncStorage.multiSet([
    ["token", token],
    ["loggedIn", "true"],
  ]);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.multiRemove(["token", "loggedIn"]);
  isLoggedInVar(false);
  tokenVar("");
};

const client = new ApolloClient({
  uri: "https://ce37-114-129-90-158.jp.ngrok.io/graphql",
  cache: new InMemoryCache(),
});

export default client;

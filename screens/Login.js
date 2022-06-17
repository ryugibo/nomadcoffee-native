import styled from "styled-components/native";
import { TextInput, View, Text } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const FormTextInput = styled(TextInput)`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 15px 7px;
  border-radius: 4px;
  color: white;
  margin-bottom: ${(props) => (props.lastOne ? "15" : "8")}px;
`;

const Login = () => {
  const { register, handleSubmit, setValue, watch } = useForm();

  const onCompleted = async (data) => {
    const {
      login: { ok, token },
    } = data;
    if (!ok) {
      return;
    }
    await logUserIn(token);
  };
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const passwordRef = useRef(null);

  const onValid = (data) => {
    if (loading) {
      return;
    }
    logInMutation({ variables: { ...data } });
  };
  const onNext = (nextOne) => {
    console.log(nextOne);
    nextOne.current?.focus();
  };

  useEffect(() => {
    register("username", { required: true });
    register("password", { required: true });
  }, [register]);

  return (
    <View>
      <FormTextInput
        placeholder="username"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <FormTextInput
        placeholder="password"
        ref={passwordRef}
        secureTextEntry
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        onSubmitEditing={() => handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        loading={loading}
        disabled={!watch("username") || !watch("password")}
        text="Log in"
        onPress={handleSubmit(onValid)}
      />
    </View>
  );
};

export default Login;

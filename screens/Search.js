import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Keyboard,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
  FlatList,
  useWindowDimensions,
  Platform,
  ScrollView,
} from "react-native";

const SEARCH_COFFEESHOPS = gql`
  query searchCoffeeShops($keyword: String!) {
    searchCoffeeShops(keyword: $keyword) {
      id
      name
      categories {
        id
        name
      }
    }
  }
`;

const DismissKeyboard = ({ children }) => {
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}
      disabled={Platform.OS === "web"}
    >
      {children}
    </TouchableWithoutFeedback>
  );
};

const Search = ({ navigation }) => {
  const { width } = useWindowDimensions();

  const [startQueryFn, { loading, data, called }] =
    useLazyQuery(SEARCH_COFFEESHOPS);
  const { setValue, register, handleSubmit } = useForm();

  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };

  const renderItem = ({ item: coffeeShop }) => {
    return (
      <View
        style={{ flex: 1, borderTopWidth: 1, borderBottomWidth: 1, margin: 10 }}
      >
        <Text style={{ fontSize: 25 }}>{coffeeShop.name}</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {coffeeShop.categories.map(({ id, name }) => {
            return (
              <View
                key={id}
                style={{
                  marginHorizontal: 5,
                  paddingHorizontal: 15,
                  backgroundColor: "black",
                }}
              >
                <Text style={{ color: "white" }}>{name}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const SearchBox = () => (
    <TextInput
      widht={{ width }}
      style={{ backgroundColor: "white" }}
      placeholderTextColor="black"
      placeholder="Search photos"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", {
      required: true,
      minLength: 3,
    });
  }, []);

  console.log(loading, data, called, data?.searchCoffeeShops?.length);

  return (
    <DismissKeyboard>
      <View style={{ flex: 1 }}>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator color="black" />
          </View>
        ) : null}
        {!called ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Search by keyword</Text>
          </View>
        ) : null}
        {data?.searchCoffeeShops !== undefined &&
          (data?.searchCoffeeShops?.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Could not find anything.</Text>
            </View>
          ) : (
            <FlatList
              data={data?.searchCoffeeShops}
              keyExtractor={(coffeeShop) => "" + coffeeShop.id}
              renderItem={renderItem}
            />
          ))}
      </View>
    </DismissKeyboard>
  );
};

export default Search;

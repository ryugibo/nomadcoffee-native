import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { FlatList, View, Text, Image, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";

const SEE_COFFEESHOPS = gql`
  query seeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      id
      name
      latitude
      longitude
      user {
        username
      }
      photos {
        id
        url
      }
      categories {
        id
        name
      }
    }
  }
`;
const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(SEE_COFFEESHOPS, {
    variables: {
      page: 1,
    },
  });
  const renderCoffeeShop = ({ item: coffeeShop }) => {
    return (
      <View
        style={{ flex: 1, borderTopWidth: 1, borderBottomWidth: 1, margin: 10 }}
      >
        {coffeeShop.photos.length > 0 ? (
          <ScrollView horizontal style={{ flex: 1 }}>
            {coffeeShop.photos.map(({ id, url }) => {
              return (
                <Image
                  key={id}
                  style={{
                    width: 100,
                    height: 100,
                    marginRight: 10,
                    backgroundColor: "grey",
                  }}
                  source={url}
                />
              );
            })}
          </ScrollView>
        ) : null}
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
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return loading ? (
    <ActivityIndicator color="white" />
  ) : (
    <FlatList
      onEndReachedThreshold={0.02}
      onEndReached={() =>
        fetchMore({
          variables: {
            page: 1 + (data?.seeCoffeeShops?.length || 0) / 5,
          },
        })
      }
      refreshing={refreshing}
      onRefresh={refresh}
      style={{ width: "100%" }}
      showsVerticalScrollIndicator={false}
      data={data?.seeCoffeeShops}
      keyExtractor={(photo) => "" + photo.id}
      renderItem={renderCoffeeShop}
    />
  );
};

export default Home;

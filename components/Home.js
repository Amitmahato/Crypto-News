import axios from "axios";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  View,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import Header from "./Header";
import CoinCard from "./CoinCard";
import api_key from "../assets/API-KEY";
import SearchBar from "./SearchBar";

const apiBaseURL = "https://pro-api.coinmarketcap.com";

export default class Home extends React.Component {
  state = {
    fetchedCoins: coins,
    displayCoin: coins,
    refreshing: false,
    fetching_more_data: false,
    start: 1,
    data_count: 5
  };

  componentDidMount() {
    this.onRefresh();
  }

  fetchFromServer = async (
    start = this.state.start,
    data_count = this.state.data_count
  ) => {
    try {
      const res = await axios({
        method: "get",
        url: `${apiBaseURL}/v1/cryptocurrency/listings/latest`,
        // url: `https://api.coinmarketcap.com/v1/ticker/?limit=${data_count}`,
        params: {
          start: start,
          limit: data_count,
          convert: "USD" //only 1 currency conversion allowed in free plan
        },
        headers: {
          "X-CMC_PRO_API_KEY": api_key
        },
        json: true
      });
      return res.data.data;
    } catch (err) {
      console.log("Error fetching data : ", err.message);
      this.setState({ refreshing: false, fetching_more_data: false });
      Alert.alert(
        "Network Error",
        "Please check your internet connection and try again!"
      );
    }
  };

  onRefresh = async () => {
    try {
      await this.setState({ refreshing: true });
      var updatedData = await this.fetchFromServer(
        (start = 1),
        (data_count =
          this.state.start > 1
            ? this.state.start + this.state.data_count - 1
            : this.state.data_count) //refresh all the data that have been loaded previously, don't fallback to default number of data
      );
      this.setState({
        refreshing: false,
        fetchedCoins: updatedData ? [...updatedData] : []
      });
      const { fetchedCoins } = this.state;
      this.setState({ displayCoin: fetchedCoins });
    } catch (err) {
      console.log("Error Refreshing : ", err.message);
      this.setState({ refreshing: false });
    }
  };

  onLoadMoreData = async () => {
    try {
      if (this.state.fetchedCoins.length > 0) {
        let oldData = [...this.state.fetchedCoins];
        let { start, data_count } = this.state;
        try {
          await this.setState({
            fetching_more_data: true,
            start: start + data_count
          });
          let moreData = await this.fetchFromServer();
          this.setState({
            fetchedCoins: moreData ? [...oldData, ...moreData] : [...oldData],
            displayCoin: moreData ? [...oldData, ...moreData] : [...oldData],
            fetching_more_data: false
          });
        } catch (err) {
          console.log("Error Loading More Data : ", err.message);
          this.setState({ fetching_more_data: false, start: start });
        }
      } else {
        this.onRefresh();
      }
    } catch (err) {
      console.log("Error getting data from state : ", err.message);
    }
  };

  renderFooter() {
    return (
      //Footer View with Load More button
      <View
        style={{
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row"
        }}
      >
        {this.state.fetching_more_data ? (
          <ActivityIndicator color="blue" style={{ marginLeft: 8 }} />
        ) : (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={this.onLoadMoreData}
            //On Click of button calling onLoadMoreData function to load more data
            style={{
              padding: 10,
              backgroundColor: "#800000",
              borderRadius: 4,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 15,
                textAlign: "center"
              }}
            >
              Load More
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  onSearch = async searchText => {
    searchText = searchText.toLowerCase();
    const { fetchedCoins } = this.state;
    try {
      if (searchText.length > 0) {
        const searchResult = await fetchedCoins.filter(item => {
          if (item.name.toLowerCase().search(searchText) > -1) {
            return item;
          }
        });
        this.setState({
          displayCoin: searchResult.length > 0 ? searchResult : []
        });
      } else {
        this.setState({ displayCoin: fetchedCoins });
      }
    } catch (err) {
      console.log("Error Searching : ", err.message);
    }
  };

  render() {
    return (
      //   <SafeAreaView style={{ marginTop: Constants.statusBarHeight }}>
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center"
        }}
      >
        <StatusBar barStyle="light-content" />
        <Header
          name="Cryptocurrency App"
          style={{ position: "absolute", top: 0 }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              colors={["green"]}
            />
          }
        >
          <FlatList
            style={{ flex: 1 }}
            // extraData={this.state}
            data={this.state.displayCoin}
            renderItem={({ item }) => <CoinCard {...item} />}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={5}
            ListFooterComponent={() =>
              this.state.refreshing ? null : this.renderFooter()
            }
          ></FlatList>
        </ScrollView>
        <SearchBar onSearch={this.onSearch} />
      </View>
      //   </SafeAreaView>
    );
  }
}

const coins = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    quote: {
      USD: {
        price: "00.00",
        percent_change_24h: "0.0",
        percent_change_7d: "0.0"
      }
    }
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    quote: {
      USD: {
        price: "00.00",
        percent_change_24h: "0.0",
        percent_change_7d: "0.0"
      }
    }
  },
  {
    name: "XRP",
    symbol: "XRP",
    quote: {
      USD: {
        price: "00.00",
        percent_change_24h: "0.0",
        percent_change_7d: "0.0"
      }
    }
  },
  {
    name: "Bitcoin Cash",
    symbol: "BCH",
    quote: {
      USD: {
        price: "00.00",
        percent_change_24h: "0.0",
        percent_change_7d: "0.0"
      }
    }
  },
  {
    name: "Tether",
    symbol: "USDT",
    quote: {
      USD: {
        price: "00.00",
        percent_change_24h: "0.0",
        percent_change_7d: "0.0"
      }
    }
  }
];

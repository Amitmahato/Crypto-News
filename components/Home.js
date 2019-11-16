import axios from "axios";
import React from "react";
import {
  FlatList,
  View,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar
} from "react-native";
import Constants from "expo-constants";
import Header from "./Header";
import CoinCard from "./CoinCard";

const apiBaseURL = "https://api.coinmarketcap.com";

export default class Home extends React.Component {
  state = {
    coins: coins,
    list: [],
    refreshing: false
  };

  componentDidMount() {
    this.getRecentData();
  }

  getRecentData = () => {
    return axios
      .get(`${apiBaseURL}/v1/ticker/?limit=15`)
      .then(res => {
        let temp = [];
        for (let i = 0; i < 10; i++) {
          temp[i] = res.data[i];
        }
        this.setState({ coins: res.data, refreshing: false, list: temp });
      })
      .catch(err => {
        console.log("Error fetching data : ", err);
        this.setState({ refreshing: false });
      });
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.getRecentData();
    // setTimeout(() => this.setState({ refreshing: false }), 5000);
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
            extraData={this.state}
            onEndReached={() => console.log("Reached End")}
            onEndReachedThreshold={1}
            data={this.state.list}
            renderItem={({ item }) => {
              return <CoinCard logo={images[item.symbol]} {...item} />;
            }}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={5}
          ></FlatList>
        </ScrollView>
      </View>
      //   </SafeAreaView>
    );
  }
}

const images = {
  BTC:
    "https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609483/bitcoin_eqld4v.png",
  ETH:
    "https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609485/ethereum_nw0chu.png",
  XRP:
    "https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609486/ripple_p0xeut.png",
  BCH:
    "https://res.cloudinary.com/da7jhtpgh/image/upload/v1516327336/bch_2x_hahroi.png",
  LTC:
    "https://res.cloudinary.com/da7jhtpgh/image/upload/v1512427497/ltc_fjbqjf.png",
  DASH:
    "https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609484/dash_oltvqi.png",
  XEM:
    "https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609486/nem_imprip.png",
  BCC:
    "https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609486/bitconnect_oj1bo5.png",
  XMR:
    "https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609486/monero_wzk3ur.png",
  NEO:
    "https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609486/neo_fvoo6c.png",
  MIOTA:
    "https://res.cloudinary.com/da7jhtpgh/image/upload/v1512510148/miota_2x_xkby9u.png",
  ADA:
    "https://res.cloudinary.com/da7jhtpgh/image/upload/v1513434489/cardano_unympj.png",
  BTG:
    "https://res.cloudinary.com/da7jhtpgh/image/upload/v1513434542/bitcoin-gold_reytam.png",
  XLM:
    "https://res.cloudinary.com/da7jhtpgh/image/upload/v1516326886/xlm_2x_jfwlwt.png",
  ADA:
    "https://res.cloudinary.com/da7jhtpgh/image/upload/v1516326874/ada_2x_g4fs0c.png",
  IOTA:
    "https://res.cloudinary.com/da7jhtpgh/image/upload/v1516327102/miota_2x_zsvtqc.png",
  TRX:
    "https://res.cloudinary.com/da7jhtpgh/image/upload/v1516326885/trx_2x_ukhxjm.png",
  EOS:
    "https://res.cloudinary.com/da7jhtpgh/image/upload/v1516326878/eos_2x_dvr7p0.png"
};

const coins = [
  {
    logo: images.BTC,
    name: "Bitcoin",
    symbol: "BTC",
    price_usd: "00.00",
    percent_change_24h: "0.0",
    percent_change_7d: "0.0"
  },
  {
    logo: images.ETH,
    name: "Bitcoin",
    symbol: "ETH",
    price_usd: "00.00",
    percent_change_24h: "0.0",
    percent_change_7d: "0.0"
  },
  {
    logo: images.XRP,
    name: "Bitcoin",
    symbol: "XRP",
    price_usd: "00.00",
    percent_change_24h: "0.0",
    percent_change_7d: "0.0"
  },
  {
    logo: images.BCH,
    name: "Bitcoin",
    symbol: "BCH",
    price_usd: "00.00",
    percent_change_24h: "0.0",
    percent_change_7d: "0.0"
  },
  {
    logo: images.LTC,
    name: "Bitcoin",
    symbol: "LTC",
    price_usd: "00.00",
    percent_change_24h: "0.0",
    percent_change_7d: "0.0"
  },
  {
    logo: images.DASH,
    name: "Bitcoin",
    symbol: "DASH",
    price_usd: "00.00",
    percent_change_24h: "0.0",
    percent_change_7d: "0.0"
  },
  {
    logo: images.XEM,
    name: "Bitcoin",
    symbol: "XEM",
    price_usd: "00.00",
    percent_change_24h: "0.0",
    percent_change_7d: "0.0"
  },
  {
    logo: images.BCC,
    name: "Bitcoin",
    symbol: "BCC",
    price_usd: "00.00",
    percent_change_24h: "0.0",
    percent_change_7d: "0.0"
  },
  {
    logo: images.XMR,
    name: "Bitcoin",
    symbol: "XMR",
    price_usd: "00.00",
    percent_change_24h: "0.0",
    percent_change_7d: "0.0"
  },
  {
    logo: images.NEO,
    name: "Bitcoin",
    symbol: "NEO",
    price_usd: "00.00",
    percent_change_24h: "0.0",
    percent_change_7d: "0.0"
  }
];

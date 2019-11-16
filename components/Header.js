import React from "react";
import { View, Text } from "react-native";

const Header = props => {
  return (
    <View
      style={{
        backgroundColor: "#876",
        width: "100%",
        alignItems: "center",
        borderBottomRightRadius: 75,
        borderBottomLeftRadius: 75,
        paddingBottom: 30,
        paddingTop: 30,
        elevation: 50
      }}
    >
      <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
        {props.name}
      </Text>
    </View>
  );
};

export default Header;

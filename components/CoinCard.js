import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components";

const screenWidth = Dimensions.get("window").width;
const CoinCard = props => {
  return (
    <Container>
      <Logo
        source={{
          uri: `https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/128/icon/${props.symbol.toLowerCase()}.png`
        }}
      />
      <Content>
        <Header>
          <Title>
            <Enum>{props.symbol}</Enum>
            <Name>{props.name}</Name>
          </Title>
          <Price>{Number(props.quote.USD.price).toFixed(2)}$</Price>
        </Header>
        <Footer>
          <Daily>
            <Time>24h : </Time>
            <Change24hr
              style={
                props.quote.USD.percent_change_24h < 0 ? { color: "#f55" } : {}
              }
            >
              {Number(props.quote.USD.percent_change_24h).toFixed(2)}%
            </Change24hr>
          </Daily>
          <Weekly>
            <Time>7d : </Time>
            <Change7d
              style={
                props.quote.USD.percent_change_7d < 0 ? { color: "#f55" } : {}
              }
            >
              {Number(props.quote.USD.percent_change_7d).toFixed(2)}%
            </Change7d>
          </Weekly>
        </Footer>
      </Content>
    </Container>
  );
};

export default CoinCard;

const Container = styled.View`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-top: 25px;
  background: white;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: gray;
`;

const Logo = styled.Image`
  width: 55px;
  height: 55px;
`;

const Content = styled.View`
  width: ${screenWidth - 100};
`;

const Header = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: rgba(80, 80, 80, 0.1);
`;

const Title = styled.View`
  flex-direction: row;
`;

const Enum = styled.Text`
  text-transform: uppercase;
  font-size: 20px;
  border-right-width: 2px;
  padding-right: 5px;
`;
const Name = styled.Text`
  font-size: 20px;
  padding-left: 5px;
  color: rgba(0, 0, 0, 0.7);
`;
const Price = styled.Text`
  color: black;
  font-size: 18px;
`;

const Footer = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Daily = styled.View`
  flex-direction: row;
`;
const Weekly = styled.View`
  flex-direction: row;
`;
const Time = styled.Text`
  font-size: 16px;
`;

const Change24hr = styled.Text`
  font-size: 16px;
  color: #33cccc;
`;
const Change7d = styled.Text`
  font-size: 16px;
  color: #33cccc;
`;

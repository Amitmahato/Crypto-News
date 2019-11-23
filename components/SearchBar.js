import React from "react";
import { Animated, Dimensions, Keyboard, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

class SearchBar extends React.Component {
  state = {
    searchIcon: "ios-search",
    searchText: "",
    searchIconWidth: 50,
    searchIconSize: 50,
    inputWidth: new Animated.Value(0),
    inputShown: false,
    inputBorder: 0,
    inputMarginRight: 0,
    containerWidth: new Animated.Value(60),
    containerBottomPosition: 0
  };

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.KeyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.KeyboardDidHide
    );
  }

  toggleSearchInput = () => {
    const { inputShown } = this.state;
    if (inputShown) {
      this.setState({
        inputShown: false,
        inputBorder: 0,
        searchText: "",
        searchIcon: "ios-search",
        searchIconSize: 50
      });

      Animated.timing(this.state.containerWidth, {
        toValue: 60,
        duration: 0
      }).start();

      Animated.timing(this.state.inputWidth, {
        toValue: 0,
        duration: 0
      }).start();

      this.props.onSearch("");
    } else {
      this.setState({
        inputShown: true,
        inputBorder: 1,
        searchIcon: "ios-close",
        searchIconSize: 70,
        inputMarginRight: -10
      });

      Animated.timing(this.state.containerWidth, {
        toValue: screenWidth,
        duration: 0
      }).start();

      Animated.timing(this.state.inputWidth, {
        toValue: 280,
        duration: 200
      }).start();
    }
  };

  KeyboardDidShow = e => {
    const { height } = e.endCoordinates;
    this.setState({
      containerBottomPosition: height,
      searchIconWidth: 0,
      inputMarginRight: -65
    });
    Animated.timing(this.state.inputWidth, {
      toValue: 340,
      duration: 0
    }).start();
  };

  KeyboardDidHide = () => {
    this.setState({
      containerBottomPosition: 0,
      searchIconWidth: 50,
      inputMarginRight: -10,
      searchIcon: "ios-close"
    });
    Animated.timing(this.state.inputWidth, {
      toValue: 280,
      duration: 0
    }).start();

    const { searchText } = this.state;
    if (searchText.length == 0) this.props.onSearch("");
  };

  clearInput = () => {
    this.setState({ searchText: "" });
    this.props.onSearch("");
    // this.toggleSearchInput();
  };

  render() {
    return (
      <AnimatedContainer
        style={{
          backgroundColor: this.state.inputShown ? "#876" : "transparent",
          width: this.state.containerWidth,
          bottom: this.state.containerBottomPosition
        }}
      >
        <AnimatedSearchInput
          style={{
            width: this.state.inputWidth,
            borderWidth: this.state.inputBorder,
            fontSize: 20,
            padding: this.state.inputShown ? 10 : 0,
            paddingRight: this.state.inputShown ? 40 : 0,
            marginRight: this.state.inputMarginRight
          }}
          onPress={this.KeyboardDidShow}
          returnKeyType="search"
          onChangeText={input => {
            this.setState({ searchText: input });
            this.props.onSearch(input);
          }}
          placeholder="Search..."
          value={this.state.searchText}
          onSubmitEditing={() => this.props.onSearch(this.state.searchText)}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 25,
            bottom: 10
          }}
          onPress={this.clearInput}
        >
          <Ionicons
            name="ios-close"
            style={{
              fontSize: 40,
              opacity:
                this.state.searchText.length > 0 &&
                this.state.inputMarginRight < -20
                  ? 1
                  : 0,
              color: "rgba(0,0,0,0.6)"
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.toggleSearchInput}
          style={{
            position: "absolute",
            right: this.state.searchIcon == "ios-search" ? 0 : -5,
            bottom: this.state.searchIcon == "ios-search" ? 5 : 16,
            width: this.state.searchIconWidth,
            height: 50
          }}
        >
          <FillIcon
            style={{
              backgroundColor: this.state.inputShown ? "#876" : "white"
            }}
          />
          <Ionicons
            name={this.state.searchIcon}
            style={{
              fontSize: this.state.searchIconSize,
              color: this.state.inputShown ? "white" : "black"
            }}
          />
        </TouchableOpacity>
      </AnimatedContainer>
    );
  }
}

export default SearchBar;

const Container = styled.View`
  height: 60px;
  position: absolute;
  bottom: 0;
  right: 0;
  justify-content: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const FillIcon = styled.View`
  background: white;
  width: 24;
  height: 24;
  border-radius: 12;
  position: absolute;
  top: 9;
  left: 3;
`;

const SearchInput = styled.TextInput`
  background: white;
  height: 40;
  position: absolute;
  right: 75;
  border-radius: 15;
  border: solid black;
`;

const AnimatedSearchInput = Animated.createAnimatedComponent(SearchInput);

import { Text, View } from "react-native";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import colors from "../utils/colors";
import { TextInput } from "react-native";

type MyProps = {};
type MyState = {};

export class SearchBar extends Component<MyProps, MyState> {
  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.searchBar} placeholder="Search here ..." />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  searchBar: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    height: 40,
    borderRadius: 40,
    paddingLeft: 15,
  },
});

export default SearchBar;

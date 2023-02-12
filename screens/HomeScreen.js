import React, { Component } from "react";
import {
  View,
  Text,
  Flatlist,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { ListItem } from "react-native-elements";
import Axios from "axios";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      url: "",
    };
  }

  componentDidMount() {
    this.getPlanets();
  }

  getPlanets = () => {
    Axios.get(this.state.url)
      .then((response) => {
        return this.setState({
          listData: response.data.data,
        });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  renderItem = ({ item, index }) => {
    <ListItem
      key={index}
      title={`Planet: ${item.name}`}
      subtitle={`Distance from Earth: ${item.distance_from_earth}`}
      titleStyle={styles.title}
      containerStyle={styles.listContainer}
      bottomDivider
      onPress={() => {
        this.props.navigation.navigate("Details", { planet_name: item.name });
      }}
    />;
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    console.log(this.state.listData.length);
    if (this.state.listData.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text>Loading....</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.upperContainer}>
          <Text style={styles.headerText}>Planets World</Text>
        </View>
        <View style={styles.lowerContainer}>
          <Flatlist
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            data={this.state.listData}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edc988",
  },
  upperContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#132743",
  },
  lowerContainer: {
    flex: 0.9,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainerText: {
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d7385e",
  },
  listContainer: {
    backgroundColor: "#eeecda",
  },
});

import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import Axios from "axios";
import { Icon, Card } from "react-native-elements";

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      imagePath: "",
      url: ` /planet?name=${this.props.navigation.getParam(
        "planet_name"
      )}`,
    };
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails = () => {
    Axios.get(this.state.url)
      .then((response) => {
        this.setDetails(response.data.data);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  setDetails = (planetDetails) => {
    var planetType = planetDetails.planet_type;
    var imagePath = "";
    switch (planetType) {
      case "Gas Giant":
        imagePath = require("../assets/planet_type/gas_giant.png");
        break;
      case "Terrestrial":
        imagePath = require("../assets/planet_type/terrestrial.png");
        break;
      case "Neptune Like":
        imagePath = require("../assets/planet_type/neptune_like.png");
        break;
      case "Super Earth":
        imagePath = require("../assets/planet_type/super_earth.png");
        break;
      default:
        imagePath = require("../assets/planet_type/terrestrial.png");
    }
    this.setState({
      details: planetDetails,
      imagePath: imagePath,
    });
  };

  render() {
    const { details, imagePath } = this.state;
    if (this.state.details.specifications) {
      return (
        <View style={styles.container}>
          <Card
            title={details.name}
            image={imagePath}
            imageProps={{ resizeMode: "contain", width: "100%" }}
          >
            <View>
              <Text style={styles.cardItem}>
                {`Distance from earth: ${details.distance_from_earth}`}
              </Text>
              <Text style={styles.cardItem}>
                {`Distance from sun: ${details.distance_from_sun}`}
              </Text>
              <Text style={styles.cardItem}>
                {`gravity: ${details.gravity}`}
              </Text>
              <Text style={styles.cardItem}>
                {`DOrbital period: ${details.orbital_period}`}
              </Text>
              <Text style={styles.cardItem}>
                {`Orbital speed: ${details.orbital_speed}`}
              </Text>
              <Text style={styles.cardItem}>
                {`Planet mass: ${details.planet_mass}`}
              </Text>
              <Text style={styles.cardItem}>
                {`Planet radius: ${details.planet_radius}`}
              </Text>
              <Text style={styles.cardItem}>
                {`Planet type: ${details.planet_type}`}
              </Text>
            </View>
            <View style={[styles.cardItem, { flexDirection: "column" }]}>
              <Text>{details.specifications ? `Specifications: ` : ""}</Text>
              {details.specifications.map((item, index) => {
                <Text style={{ marginLeft: 50 }} key={index.toString()}>
                  {item}
                </Text>;
              })}
            </View>
          </Card>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardItem: {
    marginBottom: 10,
  },
});

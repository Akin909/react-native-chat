import React, { Component } from 'react';
import { StatusBar, StyleSheet, View, Text } from 'react-native';

class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <StatusBar backgroungColor="palevioletred" barStyle="light-content" />
        <Text style={styles.title}>
          #{this.props.title}
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: 'palevioletred',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    width: '100%'
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24
  }
});

export default Header;

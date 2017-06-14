import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image
} from 'react-native';
import ReversedFlatList from 'react-native-reversed-flat-list';

import { subscribe, send } from 'react-native-training-chat-server';
import Header from './Header';

const NAME = 'Akin909';
const CHANNEL = 'Reactivate';
const AVATAR =
  'https://pbs.twimg.com/profile_images/806501058679816192/ZHFWIF-z_400x400.jpg';

export default class App extends React.Component {
  state = {
    messages: [],
    typing: ''
  };
  componentDidMount() {
    subscribe(CHANNEL, messages => {
      this.setState({ messages });
    });
  }

  async sendMessage() {
    await send({
      channel: CHANNEL,
      sender: NAME,
      avatar: AVATAR,
      message: this.state.typing
    });

    this.setState({ typing: '' });
  }

  renderItem({ item }) {
    return (
      <View style={styles.row}>
        <Image style={styles.avatar} source={{ uri: item.avatar }} />
        <View style={styles.rowText}>
          <Text style={styles.sender}>{item.sender}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Header title={CHANNEL} />
        <ReversedFlatList
          data={this.state.messages}
          renderItem={this.renderItem}
        />
        <KeyboardAvoidingView behaviour="padding">
          <View style={styles.footer}>
            <TextInput
              value={this.state.typing}
              onChangeText={text => this.setState({ typing: text })}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Type something nice"
            />
          </View>
          <TouchableOpacity onPress={() => this.sendMessage()}>
            <Text style={styles.send}>Send</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    padding: 20,
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  message: {
    fontSize: 18
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10
  },
  footer: {
    backgroundColor: 'palevioletred',
    flexDirection: 'row',
    width: '100%',
    padding: 20
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    flex: 1
  },
  send: {
    alignSelf: 'center',
    color: 'palevioletred',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10
  },
  rowText: {
    flex: 1
  }
});

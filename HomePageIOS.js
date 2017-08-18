import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import Button from 'apsl-react-native-button'
import { Redirect, Route } from "react-router-native";

function urlForQueryAndPage(action, key, value) {
  const data = {
    code: 'code'
  };
  data[key] = value;

  const querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return action + '?' + querystring;
}

export default class HomePageIOS extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, message: '', searchString: '', isFetched: false };
  }

  _executeQuery = (query) => {
    this.setState({ isLoading: true });

    return fetch('https://el-debate.herokuapp.com/api/' + query, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => response.json())
      .then(response => this._handleResponse(response))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error
    }));
  };

  _handleResponse = (response) => {
    this.setState({ isLoading: false , message: '' });
    if (response.error) {
      this.setState({ message: response.error });
    } else {
      this.setState({ isFetched: true })
    }
  };

  _onLoginPressed = () => {
    const query = urlForQueryAndPage('login', 'code', this.state.searchString);
    this._executeQuery(query);
  };

  _onSearchTextChanged = (event) => {
    this.setState({ searchString: event.nativeEvent.text });
  };

  render() {
    const DetailsRoute = () => (
      this.state.isFetched ? <Redirect push to="/debate-details-ios"/> : null
    )
    const CodeInput =
      this.state.isLoading ?
      <View style={{marginTop: 40}}>
        <ActivityIndicator size='large'/>
      </View> :
      <TextInput
        keyboardType = 'numeric'
        maxLength = {5}
        style={styles.pinInput}
        value={this.state.searchString}
        onChange={this._onSearchTextChanged}
        placeholder='EL Debate PIN'/>;
    return (
      <View style={styles.container}>
        <Text style={styles.description}>{this.state.message}</Text>
        <Text style={styles.description}>
          Welcome to
        </Text>
        <Image source={require('./resources/images/logo.png')}/>
        {CodeInput}
        <View style={styles.footer}>
          <Image source={require('./resources/images/backgroundimg.png')} style={styles.backgroundImage} />
          <Button
            onPress={this._onLoginPressed}
            style={styles.pinButton}
            textStyle={{color: '#fff', fontFamily: 'helvetica-neue', fontSize: 14}}
          >
          Log in
          </Button>
          <DetailsRoute/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'helvetica-neue',
    color: '#656565'
  },
  container: {
    alignItems: 'center',
    flex: 1,
    top: 100,
  },
  backgroundImage: {
    bottom: 50,
    width: '80%',
  },
  pinInput: {
    bottom: 0,
    height: 40,
    width: '80%',
    textAlign: 'center',
    marginRight: 5,
    marginTop: 40,
    borderBottomColor: '#C0C0C0',
    borderBottomWidth: 1,
    fontSize: 18,
    color: '#8F8F8F',
  },
  pinButton: {
    alignSelf: 'center',
    height: 40,
    width: '80%',
    bottom: 120,
    backgroundColor: '#4CC359',
    borderRadius: 0,
    borderColor: '#fff',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center'
  }
})

import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
  Alert
} from 'react-native';
import Button from 'apsl-react-native-button'
import styles from './styles'
import { Redirect, Route } from "react-router-native";
import NavigationBar from 'react-native-navigation-bar';
import Api from '/app/api/Api'

export default class HomePageIOS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      message: '',
      searchString: '',
      isFetched: false
    };
  }

  _handleResponse = (response) => {
    if (response.error) {
      this.setState({ message: response.error });
    } else {
      this.setState({ isFetched: true })
    }
  };

  _onLoginPressed = () => {
    this.setState({ isLoading: true, message: '' });
    Api.login(this.state.searchString)
      .then(response => response.json())
      .then(response => this._handleResponse(response))
      .catch(error =>
        Alert.alert('Something went wrong' + error)
    );
    this.setState({ isLoading: false });
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
      <View style={styles.navContainer}>
        <NavigationBar
          title={'EL Debate'}
          height={50}
          titleColor={'#fff'}
          backgroundColor={'#4CC359'}
        />
      <View style={styles.container}>
        <Text style={styles.description}>{this.state.message}</Text>
        <Text style={styles.description}>
          Welcome to
        </Text>
        <Image source={require('/resources/images/logo.png')}/>
        {CodeInput}
        <View style={styles.footer}>
          <Image source={require('/resources/images/backgroundimg.png')} style={styles.backgroundImage} />
          <Button
            onPress={this._onLoginPressed}
            style={styles.pinButton}
            textStyle={{ color: '#fff', fontFamily: 'helvetica-neue', fontSize: 14 }}
          >
          Log in
          </Button>
          <DetailsRoute/>
        </View>
        </View>
      </View>
    );
  }
}

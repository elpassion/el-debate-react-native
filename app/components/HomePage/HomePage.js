import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
  Alert,
  Platform,
  AsyncStorage
} from 'react-native';
import Button from 'apsl-react-native-button'
import styles from './styles'
import { Redirect, Route } from "react-router-native";
import NavigationBar from 'react-native-navigation-bar';
import Api from '/app/api/Api'

export default class HomePage extends Component {
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
      AsyncStorage.setItem('authToken', response.auth_token)
    }
  };

  _onLoginPressed = () => {
    this.setState({ isLoading: true, message: '' });
    AsyncStorage.setItem('code', this.state.searchString)
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

  componentDidMount = () => {
     AsyncStorage.getItem('code').then((value) => this.setState({ 'searchString': value }))
  }

  render() {
    const DetailsRoute = () => (
      this.state.isFetched ? <Redirect push to="/debate-details"/> : null
    )
    const CodeInput =
      this.state.isLoading ?
      <View style={{marginTop: 40}}>
        <ActivityIndicator size='large'/>
      </View> :
      <TextInput
        keyboardType = {(Platform.OS === 'ios') ? 'default' : 'numeric'}
        maxLength = {5}
        style={(Platform.OS === 'ios') ? styles.iosPinInput : styles.androidPinInput}
        value={this.state.searchString}
        onChange={this._onSearchTextChanged}
        placeholder='EL Debate PIN'
        returnKeyType = 'done'
        onSubmitEditing={this._onLoginPressed}/>;
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

import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
  Alert,
  Platform,
  AsyncStorage,
  ScrollView
} from 'react-native';
import Button from 'apsl-react-native-button'
import styles from './styles'
import { Redirect, Route } from "react-router-native";
import NavigationBar from 'react-native-navigation-bar';
import Api from '/app/api/Api'
import Keyboard from 'Keyboard';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      message: '',
      searchString: '',
      isFetched: false,
      footerLocation: 0,
      imgLocation: 0
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

  componentWillMount() {
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }

  componentWillUnmount() {
    Keyboard.removeAllListeners('keyboardWillShow', (message) => console.log(message))
    Keyboard.removeAllListeners('keyboardWillHide', (message) => console.log(message))
  }

  keyboardWillShow(e) {
    this.setState({footerLocation: e.endCoordinates.height})
    this.setState({imgLocation: -50})
  }

  keyboardWillHide(e) {
    this.setState({footerLocation: 0})
    this.setState({imgLocation: 0})
  }

  componentDidMount() {
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
        keyboardType = 'numeric'
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
          <ScrollView style={styles.main}>
            <Text style={styles.description}>{this.state.message}</Text>
            <Text style={styles.description}>
              Welcome to
            </Text>
            <Image style={styles.logoImage} source={require('/resources/images/logo.png')}/>
            {CodeInput}
          </ScrollView>
          <View style={{ bottom: this.state.footerLocation }}>
            <Image source={require('/resources/images/backgroundimg.png')}
                   style={{ bottom: this.state.imgLocation,
                            alignSelf: 'center' }} />
            <Button onPress={this._onLoginPressed} style={styles.button}>
              <Text style={styles.buttonText}>
                Log in
              </Text>
            </Button>
            <DetailsRoute/>
          </View>
        </View>
      </View>
    );
  }
}

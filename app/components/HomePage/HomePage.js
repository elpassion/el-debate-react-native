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
import Keyboard from 'Keyboard';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      message: '',
      searchString: '',
      isFetched: false,
      btnLocation: 120,
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
    Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
    Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow', (message) => console.log(message))
    Keyboard.removeListener('keyboardDidHide', (message) => console.log(message))
  }

  keyboardDidShow(e) {
    this.setState({btnLocation: e.endCoordinates.height + ((Platform.OS === 'ios') ? 120 : -200)})
    this.setState({imgLocation: e.endCoordinates.height - 500})
  }

  keyboardDidHide(e) {
    this.setState({btnLocation: 120})
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
          <View style={styles.main}>
            <Text style={styles.description}>{this.state.message}</Text>
            <Text style={styles.description}>
              Welcome to
            </Text>
            <Image style={styles.logoImage} source={require('/resources/images/logo.png')}/>
            {CodeInput}
          </View>
          <View style={styles.fotter}>
            <Image source={require('/resources/images/backgroundimg.png')}
                   style={{ bottom: (Platform.OS === 'ios') ? 0 : (this.state.imgLocation),
                            width: '85%',
                            alignSelf: 'center' }} />
            <Button
              onPress={this._onLoginPressed}
              style={{ bottom: this.state.btnLocation,
                       alignSelf: 'center',
                       height: (Platform.OS === 'ios') ? 40 : 50,
                       width: '80%',
                       backgroundColor: '#4CC359',
                       borderRadius: 0,
                       borderColor: '#fff',}}
                       textStyle={{ color: '#fff',
                       fontFamily: 'helvetica-neue',
                       fontSize: 14 }}
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

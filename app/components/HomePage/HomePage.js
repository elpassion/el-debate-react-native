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
import Modal from 'react-native-modalbox';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      message: '',
      isOpen: false,
      searchString: '',
      authToken: '',
      code: '',
      footerLocation: 0,
      imgLocation: 0
    };
  }

  _handleResponse = (response) => {
    if (response.error) {
      this.openAlert()
      this.setState({ message: response.error });
    } else {
      AsyncStorage.setItem('authToken', response.auth_token)
      this.props.history.push('/debate-details')
    }
  };

  openAlert = () => {
    this.refs.alert.open()
    setTimeout(() => { this.refs.alert.close() }, 4000);
  }

  _onLoginPressed = () => {
    this.setState({ isLoading: true, message: '' });
    if (this.state.authToken && (this.state.code === this.state.searchString)) {
      this.props.history.push('/debate-details')
    } else {
      AsyncStorage.setItem('code', this.state.searchString)
      this._loginToDebate()
    }
    this.setState({ isLoading: false });
  };

  _loginToDebate = () => {
    Api.login(this.state.searchString)
      .then(response => response.json())
      .then(response => this._handleResponse(response))
      .catch(error =>
        Alert.alert('Something went wrong' + error)
    );
  }

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
    AsyncStorage.getItem('code').then((value) => this.setState({ 'searchString': value, 'code': value }))
    AsyncStorage.getItem('authToken').then((value) => this.setState({ 'authToken': value }))
  }

  render() {
    const CodeInput =
      this.state.isLoading ?
      <View style={{marginTop: 40}}>
        <ActivityIndicator size='large'/>
      </View> :
      <View>
        <TextInput
          keyboardType = 'numeric'
          maxLength = {5}
          style={(Platform.OS === 'ios') ? styles.iosPinInput : styles.androidPinInput}
          value={this.state.searchString}
          onChange={this._onSearchTextChanged}
          placeholder='EL Debate PIN'
          returnKeyType = 'done'
          onSubmitEditing={this._onLoginPressed}/>
          <Image style={styles.keyIcon} source={require('/resources/images/keyicon.png')}/>
      </View>
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
            <Modal isOpen={this.state.isOpen} onClosed={() => this.setState({isOpen: false})} style={[styles.modal, styles.modal1]} position={"bottom"} ref="alert" backdrop={false}>
              <Text style={styles.modalText}>{this.state.message}</Text>
            </Modal>
            <DetailsRoute/>
          </View>
        </View>
      </View>
    );
  }
}

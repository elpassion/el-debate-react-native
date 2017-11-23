import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
  Platform,
  AsyncStorage,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import Button from 'apsl-react-native-button'
import styles from './styles'
import { Redirect, Route } from "react-router-native";
import NavigationBar from 'react-native-navigation-bar';
import Api from '/app/api/Api'
import Keyboard from 'Keyboard';
import AlertModal from '/app/components/Shared/AlertModal'
import SvgImage from '/app/components/Svg/SvgImage';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      searchString: '',
      authToken: '',
      code: '',
      footerLocation: 0,
      imgLocation: -80
    };
  }

  _handleResponse = (response) => {
    if (response.error) {
      this.refs.alertModal.openModalAlert(response.error)
    } else {
      AsyncStorage.setItem('authToken', response.auth_token)
      AsyncStorage.setItem('code', this.state.searchString)
      this.props.navigation.navigate('DebateDetails')
    }
  };

  _onLoginPressed = () => {
    Keyboard.dismiss()
    this.setState({ isLoading: true, message: '' });
    if (this.state.authToken && (this.state.code === this.state.searchString)) {
      this.props.navigation.navigate('DebateDetails')
    } else {
      this._loginToDebate()
    }
    this.setState({ isLoading: false });
  };

  _loginToDebate = () => {
    Api.login(this.state.searchString)
      .then(response => response.json())
      .then(response => this._handleResponse(response))
      .catch(error =>
        this.refs.alertModal.openModalAlert(error)
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
    this.setState({imgLocation: -155})
  }

  keyboardWillHide(e) {
    this.setState({footerLocation: 0})
    this.setState({imgLocation: -80})
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
          <View style={styles.keyIcon}>
            <SvgImage align="baseline" width={40} height={40} source="https://gist.githubusercontent.com/jestemkarol/3277d446a08f4d31e6b68e9c76a0591d/raw/cd1afdc3cbfe51d388df70843accfa762cc7c5c8/key.svg"/>
          </View>
      </View>
    return (
      <View style={styles.navContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.main}>
            <Text style={styles.description}>
              Welcome to
            </Text>
            <View>
              <SvgImage align="center" width={106} height={50} source="https://gist.githubusercontent.com/jestemkarol/6042ac8b21ad22e7c5280a8321be4ad1/raw/82d7bcf4bef6e51ed181b61f3e2e2c56996fd215/logo.svg"/>
            </View>
            {CodeInput}
          </ScrollView>
          <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={{ bottom: this.state.footerLocation }}>
              <Image source={require('/resources/images/backgroundimg.png')}
                     style={[{ bottom: this.state.imgLocation }, styles.backgroundImage]} />
              <Button onPress={this._onLoginPressed} style={styles.button}>
                <Text style={styles.buttonText}>
                  Log in
                </Text>
              </Button>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <AlertModal
          ref="alertModal"
        />
      </View>
    );
  }
}

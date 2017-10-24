import React, { Component } from 'React'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
  Alert
} from 'react-native'
import Modal from 'react-native-modalbox';

export default class AlertModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      message: ''
    }
  }

  openModalAlert = (message) => {
    console.log(message)
    this.setState({ isOpen: true, message: message })
    setTimeout(() => { this.setState({ isOpen: false }) }, 4000);
  }

  render () {
    const { message } = this.props
    return (
      <Modal
        isOpen={this.state.isOpen}
        onClosed={() => this.setState({isOpen: false})}
        style={[styles.modal, styles.modal1]}
        position={"bottom"}
        ref="alert"
        backdrop={false}>
          <Text style={styles.modalText}>{this.state.message}</Text>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    height: 30
  },
  modal1: {
    backgroundColor: "#4F4F4F",
    height: 30,
    bottom: 100
  },
  modalText: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 10,
    textAlign: 'left',
    fontFamily: 'helvetica-neue',
    color: 'white'
  }
});

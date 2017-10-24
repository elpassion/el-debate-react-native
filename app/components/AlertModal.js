import React, { Component } from 'React'
import {
  StyleSheet,
  Text,
  Platform
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
    bottom: 0
  },
  modalText: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: (Platform.OS === 'ios') ? 10 : 12,
    textAlign: 'left',
    fontFamily: 'helvetica-neue-md',
    color: 'white'
  }
});

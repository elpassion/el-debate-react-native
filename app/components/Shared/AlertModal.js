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
      message: '',
      clearId: 0
    }
  }

  static defaultProps = {
    animationDuration: 400,
    bottomPosition: 0
  };

  openModalAlert = (message) => {
    this.setState({ isOpen: true, message: message })
    var clearId = setTimeout(() => { this.setState({ isOpen: false }) }, 2000);
    this.setState({ clearId: clearId })
  }

  componentWillUnmount() {
    clearTimeout(this.state.clearId)
  }

  render () {
    const { message } = this.props
    return (
      <Modal
        isOpen={this.state.isOpen}
        onClosed={() => this.setState({isOpen: false})}
        style={[{bottom: this.props.bottomPosition}, styles.modal]}
        animationDuration={this.props.animationDuration}
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
    backgroundColor: "#4F4F4F",
    height: 30
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

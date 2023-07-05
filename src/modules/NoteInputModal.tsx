import {
  Keyboard,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Pressable,
  Image
} from 'react-native'
import React, { Component } from 'react'
import colors from '../utils/colors'

interface MyProps {
  visible: boolean
  onClose: () => void
  onSubmit: (title: string, desc: string, timestamp?: number) => void
  note: { title: string; desc: string }
  isEdit: boolean
}

interface MyState {
  title: string
  desc: string
}

export class NoteInputModal extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props)
    this.state = {
      title: this.props.note.title || '',
      desc: this.props.note.desc || ''
    }
  }

  componentDidMount(): void {
    const { isEdit, note } = this.props
    if (isEdit) {
      this.setState({
        title: note.title,
        desc: note.desc
      })
    }
  }

  handleModalClose = () => {
    Keyboard.dismiss()
  }

  closeModal = () => {
    console.log(this.props.isEdit)
    if (this.props.isEdit === true) {
      this.props.onClose()
      return
    }
    this.setState({
      title: '',
      desc: ''
    })
    this.props.onClose()
  }

  handleTextChange = (text: string, valueFor: string) => {
    if (valueFor === 'title') {
      this.setState({
        title: text
      })
    } else if (valueFor === 'desc') {
      this.setState({
        desc: text
      })
    }
  }

  handleSubmit = () => {
    if (!this.state.title.trim() && !this.state.desc.trim()) {
      return this.props.onClose()
    }

    if (this.props.isEdit) {
      this.props.onSubmit(this.state.title, this.state.desc, Date.now())
    } else {
      this.props.onSubmit(this.state.title, this.state.desc)
      this.setState({
        title: '',
        desc: ''
      })
    }

    this.props.onClose()
  }

  render() {
    const { visible } = this.props
    return (
      <>
        <StatusBar translucent backgroundColor={'transparent'} />
        <Modal visible={visible} animationType='slide'>
          <View testID={'Modal'} >
          <View style={styles.container}>
            <View style={styles.mainview}>
              <Pressable onPress={this.closeModal}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/2223/2223615.png'
                  }}
                  style={styles.okay}
                />
              </Pressable>
              <Pressable onPress={this.handleSubmit}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/9249/9249233.png'
                  }}
                  style={styles.buttonback}
                />
              </Pressable>
            </View>
            <TextInput
              value={this.state.title}
              onChangeText={text => this.handleTextChange(text, 'title')}
              placeholder='Title'
              style={[styles.input, styles.title]}
            />
            <TextInput
              value={this.state.desc}
              onChangeText={text => this.handleTextChange(text, 'desc')}
              multiline
              placeholder='Desc'
              style={[styles.input, styles.desc]}
            />
          </View>
          <TouchableWithoutFeedback onPress={this.handleModalClose}>
            <View
              style={[styles.modalBg, StyleSheet.absoluteFillObject]}
            ></View>
          </TouchableWithoutFeedback>
          </View>
        </Modal>
      </>
    )
  }
}

const styles = StyleSheet.create({
  okay: {
    width: 30,
    height: 30
  },
  buttonback: {
    width: 35,
    height: 40,
    marginRight:20
  },
  text: {
    fontSize: 30,
    color: 'white'
  },
  innerview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainview: {
    width: 365,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: 20
  },
  container: {
    marginTop: 0,
    paddingHorizontal: 20,
    paddingTop: 15
  },
  input: {
    borderBottomWidth: .5,
    borderBottomColor: colors.PRIMARY,
    fontSize: 20,
    color: colors.DARK
  },
  title: {
    height: 50,
    marginBottom: 15,
    fontWeight: 'bold'
  },
  desc: {
    height: 100
  },
  modalBg: {
    flex: 1,
    zIndex: -1
  }
})

export default NoteInputModal

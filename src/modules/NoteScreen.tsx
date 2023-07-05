import {
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  FlatList,
  Pressable,
  Image
} from "react-native";
import React, { Component } from "react";
import colors from "../utils/colors";
import SearchBar from "../components/SearchBar";
import NoteInputModal from "./NoteInputModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Note from "../components/Note";
import Strings from "../utils/Strings";

type MyProps = {};

type MyState = {
  modalVisible: boolean;
  notes: { id: string; title: string; desc: string }[];
};

export class NoteScreen extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      modalVisible: false,
      notes: [],
    };
  }

  componentDidMount(): void {
    this.findNotes();
  }

  findNotes = async () => {
    const result = await AsyncStorage.getItem("notes");
    console.log(result, "result");
    if (result !== null) {
      this.setState({
        notes: JSON.parse(result),
      });
    }
  };

  handleSubmit = async (title: string, desc: string) => {
    const note = { id: Date.now().toString(), title, desc, time: Date.now() };
    const updatedNotes = [...this.state.notes, note];
    this.setState({
      notes: updatedNotes,
    });
    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  openModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    return (
      <>
        <StatusBar translucent backgroundColor={'transparent'} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.header}>{Strings.Head_greet}</Text>
            <SearchBar />

            <FlatList
              data={this.state.notes}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => <Note findNotes={this.findNotes} item={item} /> }
            />
            {!this.state.notes.length ? (
              <View style={styles.emptyHeadingContainer}>
                <Text style={styles.emptyHeader}>
                  {Strings.Background_text}
                </Text>
              </View>
            ) : null}
            <Pressable onPress={this.openModal}>
                <Image source={{uri:'https://cdn-icons-png.flaticon.com/128/10695/10695021.png'}} style={styles.touchableopacity}/>
            </Pressable>
           
          </View>
        </TouchableWithoutFeedback>

        <NoteInputModal
          isEdit={false}
          note={{ title: "", desc: "" }}
          visible={this.state.modalVisible}
          onClose={this.closeModal}
          onSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:40,
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  header: {
    fontSize: 25,
    color:'black',
    fontWeight: "bold",
  },
  emptyHeadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  touchableopacity: {
    width: 60,
    height: 60,
    borderRadius: 40,
    position: "absolute",
    right: 10,
    bottom: 20,
  },
  add: {
    fontSize: 30,
    color: "white",
  },
});

export default NoteScreen;

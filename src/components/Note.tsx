import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Pressable,
  Image,
} from "react-native";
import React, { Component } from "react";
import colors from "../utils/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoteInputModal from "../modules/NoteInputModal";

type MyProps = {
  item: any;
  findNotes: any;
};
type MyState = {
  note:{title: string; desc: string };
  modalVisible:boolean
};

export class Note extends Component<MyProps, MyState> {
  constructor(props:MyProps){
    super(props)
    this.state = {
      modalVisible : false , 
      note : {title : this.props.item.title , desc : this.props.item.desc}
    }
  }

  closeModal = ()=> {
    this.setState({
        modalVisible : false
    })
  }

  openModal = ()=> {
    this.setState({
        modalVisible : true
    })
  }

  handleUpdate =async (title : string , desc : string , time:any)=> {
    this.setState({
      note : {title : title , desc : desc}
    })
    const result = await AsyncStorage.getItem('notes')
    let notes = []
    if(result!== null){
      notes = JSON.parse(result)
    }

    const newNotes =  notes.filter(n => {
      if(n.id === this.props.item.id){
        n.title = title
        n.desc = desc 
        n.isUpdated = true 
        n.time = time
      }
      return n; 
    })  

    await AsyncStorage.setItem('notes' , JSON.stringify(newNotes))
    this.props.findNotes();
  }


  deleteNote = async () => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) {
      notes = JSON.parse(result);
    }

    const newNotes = notes.filter(
      (n) => n.id !== this.props.item.id
    );
    console.log("newNote", newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    this.props.findNotes();
  };

  displayAlert = () => {
    Alert.alert(
      "Are you sure!",
      "This action delete this note permanently",
      [
        {
          text: "Delete",
          onPress: () => this.deleteNote(),
        },
        {
          text: "Cancel",
          onPress: () => console.log("cancel"),
        },
      ],
      {
        cancelable: true,
      }
    );
  };
  render() {
    const { title, desc } = this.props.item;
    return (
      <View>
       <View style={styles.container} >
        <View style={styles.iconsTitleContainer} >
          <View>
          <Text style={styles.title} numberOfLines={2} >{title}</Text>
          <Text style={styles.desc} numberOfLines={3} >{desc}</Text>
          </View>
          <View style={styles.icons} >
            <Pressable onPress={this.openModal}>
                <Image source={{uri:'https://cdn-icons-png.flaticon.com/128/2951/2951136.png'}} style={styles.icon1}/>
            </Pressable>
            <Pressable onPress={this.displayAlert}>
                <Image source={{uri:'https://cdn-icons-png.flaticon.com/128/10374/10374182.png'}} style={styles.icon}/>
            </Pressable>
          </View>
        </View>
        
      </View>
      
      <NoteInputModal onSubmit={this.handleUpdate} isEdit={true} onClose={this.closeModal} note={{title : this.state.note.title , desc : this.state.note.desc}} visible={this.state.modalVisible} />
     </View>
    );
  }
}

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    width: width - 10,
    height:100,
    padding: 15,
    marginLeft:5,
    marginVertical:8,
    borderRadius: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: 'black',
  },
  iconsTitleContainer : {
    display   : 'flex' , 
    flexDirection : 'row' ,
    justifyContent : 'space-between'
  } , 
  icons : {
    width : 50,
  } , 
  icon : {
    width:30,
    height:30,
    
  },
  icon1 : {
    width:25,
    height:25,
    marginLeft:3,
    marginBottom:15
    
  },
  desc: {paddingTop:8},
});

export default Note;

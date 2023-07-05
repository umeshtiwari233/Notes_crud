import "react-native";
import React from "react";
import App from "../App";
import renderer from "react-test-renderer";
import NoteScreen from "../src/modules/NoteScreen";
import Note from "../src/components/Note";

let findElement = function(tree,element){
    // console.warn(tree.props.testID)
    let result=undefined;
        if(tree.props.testID==element){
            result=true;
        }
    
    return result;
}
it('findElement', () => {
    let Notescreenobj = renderer.create(<NoteScreen />).getInstance(); let tree=renderer.create(<Note findNotes={Notescreenobj.findNotes} item={Notescreenobj.state.notes} />).toJSON();
      findElement(tree)
  expect(findElement(tree,'Note')).toBeDefined();
})
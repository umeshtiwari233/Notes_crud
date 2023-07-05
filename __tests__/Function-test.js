import { render, fireEvent } from '@testing-library/react-native';
import "react-native";
import React from "react";
import App from "../App";
import renderer from "react-test-renderer";
import Note from "../src/components/Note";
import NoteScreen from "../src/modules/NoteScreen";
import NoteInputModal from "../src/modules/NoteInputModal";
import { Alert } from 'react-native';

jest.spyOn(Alert, 'alert');

// expect(Alert.alert.mock.calls[0][2][0].text).toEqual("Delete")


it("Note-test", () => {
    let Notescreenobj = renderer.create(<NoteScreen />).getInstance();
    let Homeobj = renderer.create(<Note findNotes={Notescreenobj.findNotes} item={Notescreenobj.state.notes} />).getInstance();
    Homeobj.openModal();
    expect(Homeobj.state.modalVisible).toEqual(true);
    Homeobj.closeModal();
    expect(Homeobj.state.modalVisible).toEqual(false);
    Homeobj.handleUpdate("umesh", "tiwari", Date.now());
    expect(Homeobj.state.note.title).toEqual("umesh");
    expect(Homeobj.state.note.desc).toEqual("tiwari");

   Homeobj.displayAlert();
   console.warn(Alert.alert.mock.calls[0])
  
   const deleteNote=jest.fn();//mockfn
    expect( Alert.alert.mock.calls[0][2][0].text).toEqual("Delete")
    expect( Alert.alert.mock.calls[0][2][1].text).toEqual("Cancel")
    expect( Alert.alert.mock.calls[0][3].cancelable).toEqual(true)
    Alert.alert.mock.calls[0][2][0].onPress()
    // expect(deleteNote).toBeCalled()

});
it("Notescreen-test", () => {
    let Notescreenobj = renderer.create(<NoteScreen />).getInstance();
    Notescreenobj.openModal();
    expect(Notescreenobj.state.modalVisible).toEqual(true);
    Notescreenobj.closeModal();
    expect(Notescreenobj.state.modalVisible).toEqual(false);
    Notescreenobj.handleSubmit("umesh", "tiwari")
    Notescreenobj.findNotes();
    expect(Notescreenobj.state.notes[Notescreenobj.state.notes.length - 1].title).toEqual("umesh");
    // expect(Notescreenobj.state.note.desc).toEqual("tiwari");

});
it("NoteInputModal-test", () => {
    let Notescreenobj = renderer.create(<NoteScreen />).getInstance();
    let NoteInputModalobj = renderer.create(<NoteInputModal
        isEdit={false}
        note={{ title: "", desc: "" }}
        visible={Notescreenobj.state.modalVisible}
        onClose={Notescreenobj.closeModal}
        onSubmit={Notescreenobj.handleSubmit} />).getInstance();


    NoteInputModalobj.closeModal();
    expect(NoteInputModalobj.state.title).toEqual('');


    NoteInputModalobj.handleTextChange("metafic", "title");
    expect(NoteInputModalobj.state.title).toEqual("metafic");
    NoteInputModalobj.handleTextChange("company", "desc");
    expect(NoteInputModalobj.state.desc).toEqual("company");


    NoteInputModalobj.handleSubmit();
    expect(NoteInputModalobj.state.title).toEqual('')


});
test('opens modal on edit button press', () => {
    const item = {
      id: 1,
      title: 'Note Title',
      body: 'Note Body',
    };
    const { getByText, getByTestId } = render(<Note item={item} />);
    
    const editButton = getByTestId('Edit1');
    fireEvent.press(editButton);
  
    const noteInputModal = getByTestId('Modal');
    expect(noteInputModal).toBeTruthy();
});


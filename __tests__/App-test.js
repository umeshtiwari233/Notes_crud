import 'react-native';
import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
import SearchBar from '../src/components/SearchBar';
import NoteScreen from '../src/modules/NoteScreen';
import Note from '../src/components/Note';

test('snapshot testing',()=>{
  let Notescreenobj=renderer.create(<NoteScreen/>).getInstance();
  // let Homeobj = renderer.create(<Note findNotes={Notescreenobj.findNotes} item={Notescreenobj.state.notes} />).getInstance();
    
  const snap=renderer.create(
    <App/>
  ).toJSON();
  const snap1=renderer.create(
    <SearchBar/>
  ).toJSON();
  const snap2=renderer.create(
    <NoteScreen/>
  ).toJSON();
  const snap3=renderer.create(
    <App/>
  ).toJSON();
  const snap4=renderer.create(
    <Note findNotes={Notescreenobj.findNotes} item={Notescreenobj.state.notes} />
  ).toJSON();
  expect(snap).toMatchSnapshot();
  expect(snap1).toMatchSnapshot();
  expect(snap2).toMatchSnapshot();
  expect(snap3).toMatchSnapshot();
  expect(snap4).toMatchSnapshot();
})
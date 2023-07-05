import { render, screen, fireEvent } from '@testing-library/react-native';
import "react-native";
import React from "react";
import renderer from 'react-test-renderer';
import Note from '../src/components/Note';
import NoteScreen from '../src/modules/NoteScreen';

// it('renders correctly', () => {
//   render(<Note/>);
// });

test('renders note title and body correctly', () => {
  const item = {
    id: 1,
    title: 'Note Title',
    desc: 'Note Body',
  };
  const { getByText } = render(<Note item={item} />);
  
  const titleElement = getByText('Note Title');
  const bodyElement = getByText('Note Body');

  expect(titleElement).toBeTruthy();
  expect(bodyElement).toBeTruthy();
});

it('renders with the specified padding', () => {
  // let Notescreenobj = renderer.create(<NoteScreen/>).getInstance();
  const { getByTestId } = render(<Note item={{title:'umesh',desc:'tiwari'}}/>);
  console.warn(getByTestId('Notetitle').props)
  expect(getByTestId('Notetitle').props.children).toBe('umesh')
  expect(getByTestId('Notedesc').props.children).toBe('tiwari')
});

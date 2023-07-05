import { render, fireEvent } from '@testing-library/react-native';
import Note from '../src/components/Note';


test('displays delete alert on delete button press', () => {
    const item = {
      id: 1,
      title: 'Note Title',
      body: 'Note Body',
    };
    const { getByTestId } = render(<Note item={item} />);
    const image = getByTestId('Edit1');
    expect(image.toBeInTheDocument)
});
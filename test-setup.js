jest.mock('@react-navigation/native', () => {
    const React = require('react');
    const {View} = require('react-native');
    const {Screen} = require('react-native-screens');
    return {
      NavigationContainer: jest.fn(({children}) =>
        React.createElement(View, {}, children),
      ),
    };
});
jest.mock('@react-navigation/native-stack', () => {
    const React = require('react');
    const {View} = require('react-native');
    return {
      createNativeStackNavigator: jest.fn(() => ({
        Navigator: ({children}) => React.createElement(View, {}, children),
        Screen: ({children}) => React.createElement(View, {}, children),
      })),
    };
});
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);






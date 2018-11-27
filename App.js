import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Canvas from 'react-native-canvas';

export default class App extends React.Component {
  
  handleCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'purple';
    ctx.fillRect(0, 0, 100, 100);
  }

  render() {
    return (
      <View>
        <Text>Dont open up App.js to start working on your app!</Text>
        <Canvas ref={this.handleCanvas}/>
      </View>
    );
  }
}
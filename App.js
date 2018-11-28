import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Canvas from 'react-native-canvas';

export default class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			mouseDown: false
			, portraitHistory: {
					mousePositionArray: []
				}
		}
	}
  
  handleCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'purple';
    ctx.fillRect(0, 0, 200, 200);
  }

	getAndStoreMousePos = (evt, mouseUpBool) => {
		let newPH = this.state.portraitHistory
		newPH.mousePositionArray.push({
			x: evt.nativeEvent.locationX
			, y: evt.nativeEvent.locationY
			, mouseUp: mouseUpBool
			, color: this.currentStrokeColor 
		})
		this.setState({portraitHistory: newPH})
		return {
			x: evt.nativeEvent.locationX
			, y: evt.nativeEvent.locationY
		}
	}

	mouseDownListener = (evt) => {
		this.getAndStoreMousePos(evt ,false)
		this.setState({mouseDown: true})
	}

	mouseMoveListener = (evt) => {
		if (this.state.mouseDown) {
			const mousePos = this.getAndStoreMousePos(evt, false)
		}
	}

	mouseUpListener = (evt) => {
		this.setState({mouseDown: false})
		this.getAndStoreMousePos(evt, true)
	}

  render() {
    return (
			<View 
				onStartShouldSetResponder={()=>true}
				onResponderStart={this.mouseDownListener}
				onResponderMove={this.mouseMoveListener}
				onResponderRelease={this.mouseUpListener}
			>
        <Text>Dont open up App.js to start working on your app!</Text>
        <Canvas ref={this.handleCanvas}/>
      </View>
    );
  }
}


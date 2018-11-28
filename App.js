import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Canvas from 'react-native-canvas';

export default class App extends React.Component {
	constructor(props){
		super(props)
		this.currentStrokeColor = '#ffffff'
		this.state = {
			canvas: null
			, mouseDown: false
			, lastMousePos: null
			, portraitHistory: {
					mousePositionArray: []
				}
		}
	}
  
	handleCanvas = (canvas) => {
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = 'purple';
		ctx.fillRect(0, 0, 200, 200);
		this.setState({canvas: canvas})
	}

	playDrawing = (canvas, mousePositionArray, mousePosIdx) => {
		console.log(`mousePositionArray: ${mousePositionArray}`)
		if (mousePositionArray.length < 2) {
			return
		}
		console.log(mousePositionArray)
		let ctx = canvas.getContext('2d')
		let lastMousePos = mousePositionArray[mousePosIdx-1]
		let mousePos = mousePositionArray[mousePosIdx]
		if(!lastMousePos.mouseUp){
			ctx.beginPath()
			ctx.moveTo(lastMousePos.x, lastMousePos.y)
			ctx.lineTo(mousePos.x, mousePos.y)
			ctx.lineWidth = 2
			ctx.strokeStyle = mousePositionArray[mousePosIdx-1].color
			ctx.stroke()
		}
		if(mousePosIdx < mousePositionArray.length - 1){
			this.playDrawing(canvas, mousePositionArray, mousePosIdx + 1)
		}
	}
	
	getAndStoreMousePos = (evt, mouseUpBool) => {
		let newPH = this.state.portraitHistory
		newPH.mousePositionArray.push({
			x: evt.nativeEvent.locationX
			, y: evt.nativeEvent.locationY
			, mouseUp: mouseUpBool
			, color: this.currentStrokeColor 
		})
		console.log('setting state in getAndStoreMousePos')
		this.setState({portraitHistory: newPH})
		return {
			x: evt.nativeEvent.locationX
			, y: evt.nativeEvent.locationY
			, mouseUp: mouseUpBool
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
  	if (this.state.canvas) {
  		this.playDrawing(this.state.canvas, this.state.portraitHistory.mousePositionArray, 1)
  	}
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


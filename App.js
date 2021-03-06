import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Canvas from 'react-native-canvas';
// import WebRTC from 'react-native-webrtc';

// console.log(WebRTC)

// var {
//   RTCPeerConnection,
//   RTCIceCandidate,
//   RTCSessionDescription,
//   RTCView,
//   MediaStream,
//   MediaStreamTrack,
//   getUserMedia,
// } = WebRTC;

export default class App extends React.Component {
	constructor(props){
		super(props)
		this.currentStrokeColor = '#ffffff'
		this.state = {
			canvas: null
			, mouseDown: false
			, lastMousePos: null
			, mousePosIdx: -1
			, portraitHistory: {
					mousePositionArray: []
				}
		}
		// this.rtc()
	}

	// rtc = () => {
	// 	// var configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};

	// 	var configuration = {"iceServers": [{"url": "turn:localhost:9000/api",}], "peerIdentity":12}
	// 	// peer = new Peer(id, {key:'peerjs', port:9000, host:'localhost', path: '/api', debug:3})
	// 	var pc = new RTCPeerConnection(configuration)
		
	// 	let isFront = true;
	// 	MediaStreamTrack.getSources(sourceInfos => {
	// 	  console.log(sourceInfos);
	// 	  let videoSourceId;
	// 	  for (let i = 0; i < sourceInfos.length; i++) {
	// 	    const sourceInfo = sourceInfos[i];
	// 	    if(sourceInfo.kind == "video" && sourceInfo.facing == (isFront ? "front" : "back")) {
	// 	      videoSourceId = sourceInfo.id;
	// 	    }
	// 	  }
		  
	// 	  getUserMedia({
	// 	    audio: true,
	// 	    video: {
	// 	      mandatory: {
	// 	        minWidth: 500, // Provide your own width, height and frame rate here
	// 	        minHeight: 300,
	// 	        minFrameRate: 30
	// 	      },
	// 	      facingMode: (isFront ? "user" : "environment"),
	// 	      optional: (videoSourceId ? [{sourceId: videoSourceId}] : [])
	// 	    }
	// 	  }, function (stream) {
	// 	    console.log('dddd', stream);
	// 	    callback(stream);
	// 	  }, logError);
	// 	});

	// 	pc.createOffer(function(desc) {
	// 	  pc.setLocalDescription(desc, function () {
	// 	    // Send pc.localDescription to peer
	// 	  }, function(e) {});
	// 	}, function(e) {});

	// 	pc.onicecandidate = function (event) {
	// 	  // send event.candidate to peer
	// 	};

	// }
  
	handleCanvas = (canvas) => {
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = 'purple';
		ctx.fillRect(0, 0, 200, 200);
		this.setState({canvas: canvas})
	}

	playDrawing = (canvas, mousePositionArray, mousePosIdx) => {
		console.log(`mousePosIdx: ${mousePosIdx}, mousePositionArray.length ${mousePositionArray.length}`)
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
		this.setState({
			portraitHistory: newPH
			, mousePosIdx: this.state.mousePosIdx+1
		})
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
  		this.playDrawing(this.state.canvas, this.state.portraitHistory.mousePositionArray, this.state.mousePosIdx)
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


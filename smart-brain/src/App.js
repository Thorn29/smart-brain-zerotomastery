import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import { particleParams } from './data/background-settings';

import Navigation from './components/Navigation';
import LinkInput from './components/LinkInput';
import Rank from './components/Rank';
import TheImage from './components/TheImage';
import FaceBox from './components/FaceBox';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { clarifaiApi } from './variables';

const app = new Clarifai.App({
  apiKey: clarifaiApi
});

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  state = initialState;

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  };

  onInputHandler = (event) => {
    this.setState({ input: event.target.value, boxes: [] });
  };

  getFaceLocation = (data) => {
    const image = document.getElementById('mainImg');

    const boxArray = [];

    for (var i = 0; i < data.outputs[0].data.regions.length; i++) {
      const boundBox = data.outputs[0].data.regions[i].region_info.bounding_box;

      const offsetTop = boundBox.top_row * image.height;
      const offsetLeft = boundBox.left_col * image.width;

      const obj = {
        top: offsetTop,
        left: offsetLeft,
        width: (boundBox.right_col * image.width) - offsetLeft,
        height: (boundBox.bottom_row * image.height) - offsetTop
      }

      boxArray.push(obj);
    }

    this.setState({ boxes: boxArray });

  };

  onSubmitHandler = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this.state.user.id
          })
        }).then(response => response.json()).then(data => {
          this.setState(Object.assign(this.state.user, { entries: data }));
        })
      }
      this.getFaceLocation(response)
    })
    .catch(err => console.log(err))
  };

  onRouteChange = (rt) => {
    if (rt === 'home') {
      this.setState({ route: rt, boxes: [], imageUrl: '', input: '' });
    }
    this.setState({ route: rt });
  };

  render() {

    let content = <SignIn onRouteChange={this.onRouteChange} />;

    switch (this.state.route) {
      case 'home':
        content = (
          <div>
            <Rank currentUser={this.state.user} />
            <LinkInput inputChange={this.onInputHandler} submit={this.onSubmitHandler} />
            <TheImage source={this.state.imageUrl}>
              {this.state.boxes.map((box, id) => {
                return <FaceBox key={box.left + box.top} width={box.width} height={box.height} top={box.top} left={box.left} />;
              })}
            </TheImage>
          </div>
        );
        break;
      case 'signup':
        content = <SignUp onRouteChange={this.onRouteChange} loadUser={this.loadUser} />;
        break;
      case 'signin':
        content = <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />;
        break;
      default:
        content = <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />;
    }

    return (
      <div className="App">
        <Particles className='particles' params={particleParams} />
        <Navigation onRouteChange={this.onRouteChange} signedIn={this.state.route === 'home'} />
        {content}
      </div>
    );

  }
}

export default App;

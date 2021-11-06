import './App.css';
import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    imageName: ''
  }

  addName = (imageName) => {
    this.setState({ imageName });
  }

  render() {
    const { imageName } = this.state;
    const { addName } = this;

    return (
    <div className="App">
        <Searchbar onSubmit={addName} />
        <ImageGallery name={imageName} />
    </div>
    )
  };
}

export default App;

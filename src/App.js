import './App.css';
import React, { useState } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

function App() {
  const [imageName, setImageName] = useState('');

  const addName = (imageName) => {
    setImageName(imageName);
  }

  return (
  <div className="App">
      <Searchbar onSubmit={addName} />
      <ImageGallery name={imageName} />
  </div>
  )
};

export default App;

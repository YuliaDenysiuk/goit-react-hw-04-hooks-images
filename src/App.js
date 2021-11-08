import './App.css';
import React, { useState } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

function App() {
  const [name, setName] = useState('');

  const addName = (imageName) => {    
    setName(imageName);    
  }

  return (
    <div className="App">
        <Searchbar onSubmit={addName} />
        <ImageGallery name={name} />
    </div>
    )
  };

export default App;

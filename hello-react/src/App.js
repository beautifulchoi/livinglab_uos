import React from 'react';
//import UserList from './UserList';
//import CreateUser from './CreateUser';
//import Comment from './Comment.js'
//import Comment from './Comment copy';
//import ComparePic from './ComparePic';
import './App.css';
import {ComparePicture,CompareTips} from './ComparePic copy.js';
//import CommentBlock from './Comment fix';
import CommentBlock from './Comment fix testing';
//import Map from './Map'

function App() {
  const tips = [
    { title: 'Tip 1', content: 'This is the content for Tip 1.' },
    { title: 'Tip 2', content: 'This is the content for Tip 2.' },
    { title: 'Tip 3', content: 'This is the content for Tip 3.' },
  ];
  
  return (
    <div className="container">
      <ComparePicture className="compare-picture" pic1='logo192.png' pic2='logo512.png' />
      <div className="compare-container">
        <CompareTips className="compare-tips" tips={tips} />
        <CommentBlock className="comment" />
      </div>
    </div>
  );
    
    //Map
    // return(
    //   <Map/>

    // );
}

export default App;
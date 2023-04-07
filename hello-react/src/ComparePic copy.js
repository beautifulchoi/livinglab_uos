import React from 'react';
import './ComparePic copy.css';

function ComparePicture({pic1, pic2}) { //그림들은 나중에 옵젝으로 가져와서 이름 descript시에 써먹어야함
  return (
    <div className="picture-container">
      <div className="picture">
        <img src={require(`../image/${pic1}`)} alt="Left"/>
        <p>왼쪽</p> 
      </div>
      <div className="picture">
        <img src={require(`../image/${pic2}`)} alt="Right"/>
        <p>오른쪽</p>
      </div>
    </div>
  );
}

function CompareTips({ tips }) {
  return (
    <div className="compare-tips">
      <h2>Comparison Tips</h2>
      <ul>
        {tips.map((tip, index) => (
          <li key={index}>
            <h3>{tip.title}</h3>
            <p>{tip.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export {ComparePicture, CompareTips};
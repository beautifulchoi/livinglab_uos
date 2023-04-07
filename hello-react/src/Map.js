import React, { useState} from 'react';

function Map(props) {
  const importAll = (r) => r.keys().map(r);
  const images = importAll(require.context('../image/', false, /\.(png|jpe?g|svg)$/));

  const [currentImage, setCurrentImage] = useState(images[0]);

  const handleButtonClick = (image) => {
    setCurrentImage(image);
  }

  return (
    <div>
      <img src={currentImage} alt="recommend map" width="600" height="700" />
      <div>
        {images.map((image, index) => (
          <button key={index} onClick={() => handleButtonClick(image)}> {props.name} {index + 1}</button>
        ))}
      </div>
    </div>
    
  );
}

Map.defaultProps = {
    name: '경로'
  }

export default Map;
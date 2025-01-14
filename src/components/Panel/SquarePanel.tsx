import React from "react";
import './SquarePanel.css'

const SquarePanel = ({ imageSrc, text }) => {

    if(text != null) 
    return (
        <div style={{ display: 'flex', justifyContent: 'center', flex: 1, margin: '0 auto' }}>
        <div className="square-panel">
        <div className="image-container">
          <img src={imageSrc} alt="Descripción de la imagen" />
        </div>
        <div className="text-container">
          {text}
        </div>
      </div>
      </div>
    );
    else return null;
  };
  
  export default SquarePanel;
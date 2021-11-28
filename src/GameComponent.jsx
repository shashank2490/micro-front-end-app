import React, { useEffect } from "react";
import styles from './index.module.scss';

const GameComponent = ({gameName, componentHostUrl, history})=>{

    useEffect(() => {
        const scriptId = `micro-frontend-script-${gameName}`;
    
        const renderMicroFrontend = () => {
          window[`render${gameName}`](`${gameName}-container`, history);
        };
    
        if (document.getElementById(scriptId)) {
          renderMicroFrontend();
          return;
        }
        
        fetch(`${componentHostUrl}/asset-manifest.json`)
          .then((res) => res.json())
          .then((manifest) => {
            const script = document.createElement("script");
            script.id = scriptId;
            script.crossOrigin = "";
            script.src = `${componentHostUrl}${manifest.files["main.js"]}`;
            script.onload = () => {
              renderMicroFrontend();
            };
            document.head.appendChild(script);
          });
    
        return () => {
          window[`unmount${gameName}`] && window[`unmount${gameName}`](`${gameName}-container`);
        };
      });
    
      return <div className={styles.fullWidth} id={`${gameName}-container`} />;
}

export default GameComponent;
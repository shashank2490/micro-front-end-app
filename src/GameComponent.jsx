import React, { useEffect } from "react";
import styles from './index.module.scss';

const stylesLoadingText={
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flex: '1 1 auto'
}

const GameComponent = ({ gameName, componentHostUrl, history }) => {
  const [showLoadingText, setShowLoadingText] = React.useState(true);

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
        const style = document.createElement("link");
        style.href = `${componentHostUrl}${manifest.files["main.css"]}`;
        style.rel = `stylesheet`;
        document.head.appendChild(style);

        const script = document.createElement("script");
        script.id = scriptId;
        script.crossOrigin = "";
        script.src = `${componentHostUrl}${manifest.files["main.js"]}`;
        script.onload = () => {
          setShowLoadingText(false);
          renderMicroFrontend();
        };
        document.head.appendChild(script);
      });

    return () => {
      window[`unmount${gameName}`] && window[`unmount${gameName}`](`${gameName}-container`);
    };
  });

  return (
    <>
      {showLoadingText && <div style={stylesLoadingText}>Loading Game...</div>}
      <div className={styles.fullWidth} id={`${gameName}-container`} />
    </>
  );
}

export default GameComponent;
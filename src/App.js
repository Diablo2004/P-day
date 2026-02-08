import React, { useState, useEffect } from "react";
import "./App.css";

const gifs = ["/teddy1.gif", "/teddy2.gif", "/teddy3.gif", "/teddy4.gif"];

const noResponses = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "You might regret this!",
  "Have a heart!",
  "Change of heart?",
  "Absolutely sure?",
  "Don't be so cold!",
];

function App() {
  const [yesClicked, setYesClicked] = useState(false);
  const [noIndex, setNoIndex] = useState(0);
  const [noPosition, setNoPosition] = useState({ top: "50%", left: "50%" });
  const [yesButtons, setYesButtons] = useState(1);
  const [gif, setGif] = useState("");
  const [noMoved, setNoMoved] = useState(false);

  useEffect(() => {
    setGif(gifs[Math.floor(Math.random() * gifs.length)]);
  }, []);

  const handleYesClick = () => {
    setYesClicked(true);
  };

  const handleNoClick = () => {
    setNoMoved(true);

    const randomAction = Math.random();

    if (randomAction < 0.33) {
      const newX = Math.random() * 80 + "%";
      const newY = Math.random() * 80 + "%";
      setNoPosition({ top: newY, left: newX });
    } else if (randomAction < 0.66) {
      setYesButtons((prev) => prev + 1);
    } else {
      setNoIndex((prev) => (prev + 1) % noResponses.length);
    }
  };

  return (
    <>
      {/* 💖 Animated Background */}
      <div className='animated-bg'>
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className='heart'
            style={{
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 5 + "s",
              fontSize: Math.random() * 20 + 15 + "px",
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      {/* Main Content */}
      <div className='container'>
        {!yesClicked ? (
          <>
            <h1>For Saumya</h1>
            <h1>Hey cute baby, Will you be my Valentine? 💖</h1>
            <h1>I promise to keep you the happiest person ever! 😍</h1>

            {/* Buttons */}
            <div className='buttons-row'>
              {Array.from({ length: yesButtons }).map((_, index) => (
                <button
                  key={index}
                  className='yes-button'
                  onClick={handleYesClick}
                >
                  Yes
                </button>
              ))}

              <button
                className='no-button'
                style={
                  noMoved
                    ? {
                        position: "absolute",
                        top: noPosition.top,
                        left: noPosition.left,
                      }
                    : { position: "relative" }
                }
                onClick={handleNoClick}
              >
                {noResponses[noIndex]}
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 id='yesMessage'>Yay! I knew it! ❤️</h1>
            <h2 style={{ fontWeight: "400", opacity: 0.9 }}>
              I owe you a birthday wish and a big sorry… let me make up for it
              ❤️🎂
            </h2>

            <img src={gif} alt='Happy GIF' className='gif' />
          </>
        )}
      </div>
    </>
  );
}

export default App;

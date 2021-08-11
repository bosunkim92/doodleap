import React, {useState, useEffect, useRef} from "react"
import {Image} from 'semantic-ui-react';
import "./HallOfFame.css";

export default function HallOfFame({topThree}){
    const finalist = topThree;
    
    const delay = 2500;
    

      const [index, setIndex] = useState(0);
      const timeoutRef = useRef(null);
    
    
      function resetTimeout() {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }
    
      useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
          () =>
            setIndex((prevIndex) =>
              prevIndex === finalist.length - 1 ? 0 : prevIndex + 1
            ),
          delay
        );
    
        return () => {
          resetTimeout();
        };
      }, [index]);


  return (
      <>
      <h2>HALL OF FAME</h2>
      <h3>: Most beloved art peaces!</h3>
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
          <Image.Group size="large">

                {finalist.map((post, index) => (
                <div
                    className="slide"
                    key={index}
                >
                    <Image src={`${post.photoUrl}`} />
                </div>
                ))}

          </Image.Group>
        </div>

      <div className="slideshowDots">
        {finalist.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
    </>
  );
}

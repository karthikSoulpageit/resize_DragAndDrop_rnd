import React, { useRef, useState, useEffect } from 'react'
import ResizeIcon from '../assets/icons/resize-icon'


export default function RDnDContainer(props){
  const myref = useRef();

  const [isResizing, setIsResizing] = useState(false);

  const onBoxMouseDown = (e) => {
    if(!isResizing){
      let prevX = e.clientX;
      let prevY = e.clientY;


      myref.current.style.zIndex = 1000;


      const onMouseMove = (e) => {
        let newX = prevX - e.clientX;
        let newY = prevY - e.clientY;
  
        let rect = myref.current.getBoundingClientRect();
  
        myref.current.style.left = rect.left - newX + 'px';
        myref.current.style.top = rect.top - newY + 'px';
        
        prevX = e.clientX;
        prevY = e.clientY;
      }
  
      const onMouseUp = (e) => {
        myref.current.style.zIndex = 1;
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
      }
  
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
    }
  }

  useEffect(() => {
    const resizer = document.querySelector(`.${props.resizerClass}`);
    let currentResizer;

    const onMouseDown = (e) => {
      myref.current.style.zIndex = 1000;
      setIsResizing(true)
      currentResizer = e.target;

      let prevX = e.clientX;
      let prevY = e.clientY;

      const onMouseMove = (e) => {
        const rect = myref.current.getBoundingClientRect();
        myref.current.style.width = rect.width - (prevX - e.clientX) + 'px';
        myref.current.style.height = rect.height - (prevY - e.clientY) + 'px';

        props.onReSize(rect.width - (prevX - e.clientX), rect.height - (prevY - e.clientY))

        prevX = e.clientX;
        prevY = e.clientY;
      }
  
      const onMouseUp = (e) => {
        setIsResizing(false)
        myref.current.style.zIndex = 1;
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
      }

      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
    }

    resizer.addEventListener('mousedown', onMouseDown)
  }, [])

  return(
    <div 
      className='rdnd-box-container'
      ref={myref}
      onMouseDown={onBoxMouseDown}
      style={{width: props.initialWidth, height: props.initialHeight}}
      >
        {props.children}
        <div className={props.resizerClass}
            style={{ 
              position: 'absolute',
              width: '15px',
              height: '15px',
              bottom: '5px',
              right: '5px',
              cursor: 'se-resize'
            }}
          >
          <ResizeIcon />
        </div>
    </div>
  )
}

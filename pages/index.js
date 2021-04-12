import React, { useState } from 'react'
import RDnDContainer from '../components/rdnd-container'
import Bar from '../components/bar'
import * as d3 from "d3"


export default function Home(){
  const [svgWidth, setSvgWidth] = useState(410)
  const [svgHeight, setSvgHeight] = useState(310)

  const [svg1Width, setSvg1Width] = useState(410)
  const [svg1Height, setSvg1Height] = useState(310)


  const generateBarData = (value, length = 20) =>{
    const barDetails = {
        shape: 'bar',
        id:  (new Date()).getTime() +  Math.random() * 100,
        data: []
    }
    const barData = d3.range(length).map((item, index) => ({
        index: index,
        date: index,
        value: value === null || value === undefined ? Math.random() * 100 : value
    }))
    barDetails.data = barData;
    return barDetails ;
  }

  const [charts, setCharts] = useState(generateBarData())

  return(
    <div style={{padding: '20px', position: 'relative'}}>
      <RDnDContainer resizerClass={'rdnd-resizer'} onReSize={(width, height) => {setSvgWidth(width); setSvgHeight(height)}} initialHeight={310} initialWidth={410}>
        <div className='child-box'>
          <Bar
            data={charts.data}
            width={svgWidth-20}
            height={svgHeight-20}
            top={20}
            bottom={30}
            left={0}
            right={0}
            sideBar={false}
          />
        </div>
      </RDnDContainer>

      <RDnDContainer resizerClass={'rdnd-resizer-0'} onReSize={(width, height) => {setSvg1Width(width); setSvg1Height(height)}} initialHeight={310} initialWidth={410}>
        <div className='child-box'>
          <Bar
            data={charts.data}
            width={svg1Width-20}
            height={svg1Height-20}
            top={20}
            bottom={30}
            left={0}
            right={0}
            sideBar={false}
          />
        </div>
      </RDnDContainer>
    </div>
  )
}



























































// class Home extends Component {
//   constructor(props){
//     super(props)
//     this.myref = React.createRef();
//   }

//   onBoxMouseDown = (e) => {
//     const { myref } = this;

//     let prevX = e.clientX;
//     let prevY = e.clientY;

//     const onMouseMove = (e) => {
//       let newX = prevX - e.clientX;
//       let newY = prevY - e.clientY;

//       let rect = myref.current.getBoundingClientRect();

//       myref.current.style.left = rect.left - newX + 'px';
//       myref.current.style.top = rect.top - newY + 'px';
      
//       prevX = e.clientX;
//       prevY = e.clientY;
//     }

//     const onMouseUp = (e) => {
//       window.removeEventListener('mousemove', onMouseMove)
//       window.removeEventListener('mouseup', onMouseUp)
//     }

//     window.addEventListener('mousemove', onMouseMove)
//     window.addEventListener('mouseup', onMouseUp)
//   }

//   render(){
//     const { onBoxMouseDown, myref } = this;
//     return(
//       <div 
//         className='rdnd-box-container'
//         ref={myref}
//         onMouseDown={onBoxMouseDown}
//         >
//         <div className='rdnd-resizer tl'></div>
//         <div className='rdnd-resizer tr'></div>
//         <div className='rdnd-resizer bl'></div>
//         <div className='rdnd-resizer br'></div>
//       </div>
//     )
//   }
// }
// export default Home;
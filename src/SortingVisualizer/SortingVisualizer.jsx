import React from "react";
import {getMergeSortAnimations} from '../Algo/mergeSort';
import "./SortingVisualizer.css"

const noBars= Math.floor((window.innerWidth- 120)/(4.5+2));
const ANIMATION_SPEED_MS = 1.5;
const PRIMARY_COLOR = '#C69749';
const SECONDARY_COLOR = 'white';


export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    console.log("call");
    this.resetArray();
  }
  resetArray() {
      const array = [];
      for (let i = 0; i < noBars; i++) {
      array.push(RandomIntFromInterval(5, 1000));
    }
    this.setState({ array });
  }
  
  mergeSort(){
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('Array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight/1.75}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }


  quickSort(){}
  heapSort(){}
  bubbleSort(){}


  // testSortingAlgorithms() {
  //   for (let i = 0; i < 100; i++) {
  //     const array = [];
  //     const length = RandomIntFromInterval(1, 1000);
  //     for (let i = 0; i < length; i++) {
  //       array.push(RandomIntFromInterval(-1000, 1000));
  //     }
  //     const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  //     const mergeSortedArray = getMergeSortAnimations(array.slice());
  //     console.log(mergeSortedArray)
  //     console.log(this.state.array);
  //     console.log("M "+arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
  //     console.log("S "+arraysAreEqual(javaScriptSortedArray, this.state.array));
  //   }
  // }
  
  render() {
      const { array } = this.state;
      
      return (
        <div className="Array-container">
        {array.map((value, index) => (
            <div className="Array-bar" key={index} style={{height:`${value/1.75}px`}}>  
            
          </div>
          // we put key properity in value beacuse in react if we want to rendering it an iterable way you get a warning in the console.
        ))}
        <div className="btn-container">  
        <button className="gBtn" onClick={()=> this.resetArray()}>Generate New Array</button>
        <button className="gBtn" onClick={() => this.mergeSort()}>Merge Sort</button>
        <button className="gBtn" onClick={() => this.quickSort()}>Quick Sort</button>
        <button className="gBtn" onClick={() => this.heapSort()}>Heap Sort</button>
        <button className="gBtn" onClick={() => this.bubbleSort()}>Bubble Sort</button>
        {/* <button className="gBtn" onClick={() => this.testSortingAlgorithms()}>
        Test Sorting Algorithms 
        </button> */}
        </div>
        </div>
    );
    // in an map fn map(()=>{})  {} - Creates a code block that expects an explicit return statement.
    // map(()=>())  With () - implicit return takes place.
  }
}


function RandomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// function arraysAreEqual(arrayOne, arrayTwo) {
//     if (arrayOne.length !== arrayTwo.length) return false;
//     for (let i = 0; i < arrayOne.length; i++) {
//       if (arrayOne[i] !== arrayTwo[i]) {
//         return false;
//       }
//     }
//     return true;
//   }
  
  
  // const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
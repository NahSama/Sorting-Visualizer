import React, { Component } from 'react'
import './SortingVisualizer.css';
import { getMergeSortAnimation } from '../SortingAlgorithms/MergeSort';

// Change this value for the speed of the animations.
// const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
// const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'aqua';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class Sortingvisualizer extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            speed: 1,
            inputQty: 200,
            array: [],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    handleChangeInputQty(inputQty) {
        this.setState({inputQty: inputQty})
    }

    handleChangeSpeed(speed) {
        this.setState({speed: speed})
    }

    resetArray(){
        const array = [];
        for(let i = 0; i < this.state.inputQty; i++){
            array.push(randomIntFromInterval(5, 730));
        }
        this.setState({array});
    }

    mergeSort(){
        const animationSpeedMs = this.state.speed;
        const animations = getMergeSortAnimation(this.state.array);
        for(let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName("array-bar");
            const isColorChange = i % 3 !== 2;
            if(isColorChange){
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i*animationSpeedMs);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i*animationSpeedMs);
            }
        }
    }

    render() {
        const {array} = this.state
        return (
            <div>
                <div className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="form-control">  
                        <label>Input Quantity</label>
                        <input type="range"
                        min="50"
                        max="300"
                        defaultValue={this.state.inputQty}
                        onChange={e => this.handleChangeInputQty(e.target.value)}></input>
                        <label>{this.state.inputQty}</label>
                    </div>
                    <div className="form-control">
                        <label>Sorting Speed</label>
                        <input type="range"
                        min="1"
                        max="20"
                        defaultValue={this.state.speed}
                        onChange={e => this.handleChangeSpeed(e.target.value)}></input>
                        <label>{this.state.speed}</label> 
                    </div>
                    <button className="btn btn-success form-control" onClick={() => this.resetArray()}>Generate New Array</button>
                    <button className="btn btn-success form-control" onClick={() => this.mergeSort()}>Merge Sort</button>
                </div>
                <div className="array-container">
                    {array.map((value, index) => (
                        <div
                        className="array-bar"
                        key={index}
                        style={{
                            backgroundColor: PRIMARY_COLOR,
                            height: `${value}px`,
                        }}></div>
                    ))}
                </div>
            </div>
        )
    }
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
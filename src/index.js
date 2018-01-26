import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Title() {
  return (
      <h1> Tic Tac Whoa! </h1>
  )
}

function Square (props) {
  if (props.value === "X") {
    return (
      <button className="square xstyle" onClick={props.onClick}>
        {props.value}
      </button>
    );
  } else if (props.value === "O") {
      return (
        <button className="square ostyle" onClick={props.onClick}>
          {props.value}
        </button>
      );
  } else {
      return (
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
      )
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }


 handleClick(i) {
   const squares = this.state.squares.slice()
   if (calculateWinner(squares) || squares[i]) {
     return
   }
   squares[i] = this.state.xIsNext ? 'X' : 'O'
   console.log(calculateWinner(squares));

   this.setState({
       squares: squares,
       xIsNext: !this.state.xIsNext
   })
 }

  renderSquare (i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  render() {
    const winner = calculateWinner(this.state.squares)
    console.log(calculateWinner(this.state.squares));
    let status
    let animalwinner

    if (winner === "X") {
      animalwinner = 'cow'
    } else if (winner === "O") {
      animalwinner = 'horse'
    }

    if (winner) {
      status = 'Winner: ' + animalwinner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'cow' : 'horse');
    }
    let hoverColor
    if (this.state.xIsNext === true) {
      hoverColor = "xhover"
    } else if (this.state.xIsNext === false) {
      hoverColor = "ohover"
    } else {
      hoverColor = null
    }



    return (
        <div>
        <div className="status">{status}</div>
        <div className={hoverColor}>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game-container">
        <div className="game-info">
        <Title />
        <p> React.js's tictictoe tutorial. Now with cows and horses. </p>
        <p> NOT MOBILE FREINDLY! For now. Sorry.</p>
          <a href='https://www.freepik.com/free-vector/farm-elements-design_965160.htm'>Aniamls Designed by Freepik</a> <br />
          <a href="https://www.freepik.com/free-photo/texture-grass-field_969742.htm">Grass Designed by Freepik</a>
        </div>
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    console.log(squares[a], squares[b], squares[c]);
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

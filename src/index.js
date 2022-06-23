import React from 'react';
import ReactDOM  from 'react-dom/client';
import './index.css'



//Estos son los ocmponente declarados Square, Board y Game

//Componente 1 Square, renderiza el Button
//onClick={() => console.log('click')}, estamos pasando una función como valor de la prop onClick 
//class Square extends React.Component {
//se elimino el contructor 
function Square(props){
    return(
    <button className="square" onClick={props.onClick}>{props.value}</button>
    )
}


//Componente 2 Board, renderiza los cuadros colocados desde index.css de la clase board-row
class Board extends React.Component {
    renderSquare(i){
        return<Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
    }

    render(){
        const boardSize = 3;
        let squares = [];
        for(let i = 0 ; i < boardSize; i++){
            let row = [];
            for (let j = 0; j < boardSize; j++){
                row.push(this.renderSquare(i*boardSize + j));
            }
            squares.push(<div key={i} className="board-row"></div>) //esta mal el for pensando!!!
        }
        return(
            <div>{squares}
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
        );
    }
}


//Componente 3 Game, renderiza  la tabla
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsnext: true
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsnext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                latestMoveSquere: i,
            }]),
            stepNumber: history.length,
            xIsnext: !this.state.xIsnext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber : step,
            xIsnext: (step % 2) === 0,
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) =>{
            const latestMoveSquere = step.latestMoveSquere;
            const col = 1 + latestMoveSquere % 3;
            const row = 1 + Math.floor(latestMoveSquere / 3);
            const desc = move ? 
                `Go to move #${move} (${col}, ${row})`: 
                'Go to game start';
            return (
                <li key={move}>
                    <button className={move === this.state.stepNumber ? 'move-selec':''} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })


        let status;
        if(winner){
            status = 'Winner: ' + winner;
        }else{
            status = 'Next player: ' + (this.state.xIsnext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                     />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

//========
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

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
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}


import React from 'react';
import ReactDOM  from 'react-dom/client';
import './index.css'



//Estos son los ocmponente declarados Square, Board y Game

//Componente 1 Square, renderiza el Button
//onClick={() => console.log('click')}, estamos pasando una función como valor de la prop onClick 
class Square extends React.Component {
//se elimino el contructor 
    render(){
        return(
            <button className='square' onClick={() => this.props.onClick()}> 
                {this.props.value}
            </button>
        );
    }
}


//Componente 2 Board, renderiza los cuadros colocados desde index.css de la clase board-row
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        }
    }
// se crea la funcion handleClick
    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares: squares});
    }
//Board a Square y haremos que Square llame a esa función cuando un cuadrado sea clickeado. Cambiaremos el método renderSquare en Board en:
    renderSquare(i){
        return<Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
    }

    render(){
        const status = 'Next player: X';

        return(
            <div>
                <div className="status">{status}</div>
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
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <div>{/* Todo */}</div>
                </div>
            </div>
        );
    }
}

//========
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
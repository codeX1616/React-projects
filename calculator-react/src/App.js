import './App.css';
import Button from './components/Button';
import { Component } from "react";
import "./css/style.css"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '',
      previous: [],
      nextIsReset: false
    }
  }

  reset = () => {
    this.setState({current: "0", previous: [], nextIsReset: false});
  };

  addToCurrent = (symbol) => {
    if (["+", "-", "/", "*"].indexOf(symbol) > -1) {
      let {previous} = this.state;
      previous.push(this.state.current + symbol);
      this.setState({previous, nextIsReset: true});
    } else {
      if ((this.state.current === "0" && symbol!=".") || this.state.nextIsReset) {
        this.setState({current: symbol, nextIsReset: false});
      } else {
        this.setState({current: this.state.current + symbol});
      }
    }
  };

  calculate = () => {
    let {current, previous, nextIsReset} = this.state;
    if (previous.length > 0) {
      current = eval(String(previous[previous.length - 1] + current));
      this.setState({current, previous: [], nextIsReset: true});
    }
  }

  render() {
    const buttons = [
      {symbol: 'C', cols: 3, action: this.reset},
      {symbol: '/', cols: 1, action: this.addToCurrent},
      {symbol: '7', cols: 1, action: this.addToCurrent},
      {symbol: '8', cols: 1, action: this.addToCurrent},
      {symbol: '9', cols: 1, action: this.addToCurrent},
      {symbol: '*', cols: 1, action: this.addToCurrent},
      {symbol: '4', cols: 1, action: this.addToCurrent},
      {symbol: '5', cols: 1, action: this.addToCurrent},
      {symbol: '6', cols: 1, action: this.addToCurrent},
      {symbol: '-', cols: 1, action: this.addToCurrent},
      {symbol: '1', cols: 1, action: this.addToCurrent},
      {symbol: '2', cols: 1, action: this.addToCurrent},
      {symbol: '3', cols: 1, action: this.addToCurrent},
      {symbol: '+', cols: 1, action: this.addToCurrent},
      {symbol: '0', cols: 2, action: this.addToCurrent},
      {symbol: '.', cols: 1, action: this.addToCurrent},
      {symbol: '=', cols: 1, action: this.calculate},
    ]
  
      return (
        <div className="App">
          <div className='floaty-previous'>{this.state.previous[this.state.previous.length - 1]}</div>
          <input className='result' type='text' defaultValue={this.state.current}></input>
          {buttons.map((button, i) => {
            return <Button key={i} symbol={button.symbol} cols={button.cols} action={(symbol) => button.action(symbol)} />
          })}
        </div>
      );
  }
}

export default App;

import React from 'react';
import './App.css';
import Result from './component/Result.js'
import KeyPad from './component/KeyPad.js'

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
        result :"",
        pile : 0,
        temp : 0,
        tempOp : "+",
        flag : 0
    }
  }

  Calculate(){

    var x = this.state.pile;
    var y = this.state.pile;
    if (this.state.tempOp === "+"){
      x =  this.state.pile + this.state.temp
      this.setState({pile : x})

    }
    else if (this.state.tempOp === "-"){
      x = this.state.pile - this.state.temp
      this.setState({pile : x})
    }
    else if (this.state.tempOp === "x"){
      x = this.state.pile * this.state.temp
      this.setState({pile : x})
    }
    
    this.setState({ temp : y })
    return(x)
  }

  Reset(){
    this.setState({result : "", pile : 0, temp : 0, tempOp : "+" });
  }


  onClick = button => {

     if (button === "="){
      var xy = this.Calculate()

      this.setState({result : (''+ xy)})
     }

     else if (button === "CE") {
       this.Reset()
     }

     else {
       this.setState({
         result: this.state.result + button
       })
       if (button ==="+"){
         this.Calculate()
         this.setState({tempOp : "+"})
         this.setState({flag : 0})
       }
       else if (button === "x"){
        this.Calculate()
        this.setState({tempOp : "x"})
        this.setState({flag : 0})
       }
       else if (button ==="-"){
        this.Calculate()
        this.setState({tempOp : "-"})
        this.setState({flag : 0})
       }
       else if (this.state.flag){
         this.setState({pile: 10*this.state.pile + parseInt(button)})
       }
       else {
        this.setState({pile: parseInt(button)})
        this.setState({flag : 1})
       }
     }
  }

  render(){
    return(
    <div>
      <div className="calculator">
          <h1>Calculatrice</h1>
          <Result result={this.state.result}/>
          <KeyPad onClick={this.onClick}/>
         {/*  <p>la pile est de {this.state.pile}</p>
          <p>la temp est de {this.state.temp}</p>
          <p>l'opération temp est {this.state.tempOp}</p> */}
      </div>
   </div>
    );
  }

}

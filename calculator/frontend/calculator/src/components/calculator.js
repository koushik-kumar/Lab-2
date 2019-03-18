import React from 'react';
import Title from "./title";
import Screen from "./screen";
import Key from "./key";
import axios from 'axios';

class Calculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: '',
            output: ''
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        const value = e.target.value;

        switch(value){
            case '=': {
                if (this.state.input !== '') {
                    const data = {
                        statement: this.state.input
                    }
                    axios.default.withCredentials = true;
                    axios.post('http://localhost:3001/cal', data)
                        .then(response => {
                            console.log("Status Code : ", response.status);
                            if (response.status === 200) {
                                this.setState({
                                    output: response.data
                                });
                            }
                        })
                }
                break;
            }
            case 'Clear': {
                this.setState({input:'',output:''});
                break;
            }
            case 'Delete': {
                var entry = this.state.input; 
                entry = entry.substr(0,entry.length-1); 
                this.setState({input: entry}); 
                break;
            }
            default: { 
                this.setState({ input: (this.state.input)+value}) ;
                break; 
            }
        }
    }

    render() {
        return (
            <div className='CalculatorWindow'>
                {/* <Title value='Calculator' /> */}
                <div className='calculatorBoard'>
                    <Screen input={this.state.input} output={this.state.output} />
                    <div className="keys-row">
                        <Key label={'Clear'} handleClick = {this.handleClick} />
                        <Key label={'Delete'} handleClick = {this.handleClick} />
                        <Key label={'( )'} handleClick = {this.handleClick} />
                        <Key label={'/'}  handleClick = {this.handleClick}/>
                    </div>
                    <div className="keys-row">
                        <Key label={'7'} handleClick = {this.handleClick}/>
                        <Key label={'8'} handleClick = {this.handleClick}/>
                        <Key label={'9'} handleClick = {this.handleClick}/>
                        <Key label={'*'} handleClick = {this.handleClick}/>
                    </div>
                    <div className="keys-row">
                        <Key label={'4'} handleClick = {this.handleClick}/>
                        <Key label={'5'} handleClick = {this.handleClick}/>
                        <Key label={'6'} handleClick = {this.handleClick}/>
                        <Key label={'-'} handleClick = {this.handleClick}/>
                    </div>
                    <div className="keys-row">
                        <Key label={'1'} handleClick = {this.handleClick}/>
                        <Key label={'2'} handleClick = {this.handleClick}/>
                        <Key label={'3'} handleClick = {this.handleClick}/>
                        <Key label={'+'} handleClick = {this.handleClick}/>
                    </div>
                    <div className="keys-row">
                        <Key label={'+/-'} handleClick = {this.handleClick}/>
                        <Key label={'0'} handleClick = {this.handleClick}/>
                        <Key label={'.'} handleClick = {this.handleClick}/>
                        <Key label={'='} handleClick = {this.handleClick}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calculator;
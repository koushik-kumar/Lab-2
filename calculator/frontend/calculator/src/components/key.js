import React, { Component } from 'react'
// import axios from 'axios';

// const Key = (props) =>   {
export default class Key extends Component {
    render () {
    return (
        <input 
        type="button" 
        onClick = {this.props.handleClick}
        value={this.props.label} 
        />
    )
}
}


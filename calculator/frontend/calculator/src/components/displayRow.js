import React, { Component } from 'react'

// const DisplayRow = (props) =>  {
  export default class DisplayRow extends Component {
    render() {
    return (
        <div className = 'displayRow'>
        <input className="inputData" type = "text" value = {this.props.value} readOnly/>
    </div>
    )
  }
}

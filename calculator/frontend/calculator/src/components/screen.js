import React, { Component } from 'react'
import DisplayRow from './displayRow';

export default class Screen extends Component {
// const Screen = (props) => {
    render () {
        return (
            <div className='screen'>
                <DisplayRow value={this.props.input} />
                <DisplayRow value={this.props.output} />
            </div>
        )
    }
}

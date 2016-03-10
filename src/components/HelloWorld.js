require('./HelloWorld.scss');

import React from 'react'

export default class HelloWorld extends React.Component {
    render() {
        return (
            <p>Hello, <span>world!</span></p>
        )
    }
}

/**
 * Created by hobl on 08.04.17.
 */

import React from 'react';
import { get } from 'node-emoji';

export class SayHello extends React.Component {

    constructor() {
        super();
        this.state = {
            emojiName: 'bomb'
        }
    }

    render() {
        return (
            <h1>{get(this.state.emojiName)} Ola Erfan {get(this.state.emojiName)}</h1>
        );
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                emojiName: 'boom'
            });
        }, 3000);
    }
}
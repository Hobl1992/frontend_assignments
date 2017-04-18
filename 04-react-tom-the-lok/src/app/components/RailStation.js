/**
 * Created by hobl on 08.04.17.
 */

import React from 'react';
import { get } from 'node-emoji';

import { Tom } from './Tom';
import { ParkingArea } from './ParkingArea';

export class RailStation extends React.Component {

    constructor() {
        super();

        this.warning = null;
        this.maxWagons = 7;

        this.state = {
            tomTheLok: [],
            parkingArea: []
        }
    }

    addWagonToTom() {
        let wagon = get('railway_car');
        if (this.state.tomTheLok.length == 0) {
            wagon = get('steam_locomotive');
        }

        this.setState({
            tomTheLok: [...this.state.tomTheLok, wagon]
        });
    }

    moveWagonsToParkingArea() {

        this.setState({
            parkingArea: [...this.state.parkingArea ,...this.state.tomTheLok.slice(1)],
            tomTheLok: this.state.tomTheLok.slice(0,1)
        });
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextState.tomTheLok.length > this.maxWagons) {
            this.warning = <h1>Uh uh des wird erm z´geil</h1>;
        }
        else {
            this.warning = null;
        }

    }

    render() {
        return (
            <div>
                {this.warning}
                <Tom tomTheLok={this.state.tomTheLok}/>
                <button className="btn btn-primary" onClick={() => this.addWagonToTom() }>Add wagon</button>
                <br/>
                <br/>
                <button className="btn btn-primary" onClick={() => this.moveWagonsToParkingArea() }>Move to parking area</button>
                <ParkingArea parkingArea={this.state.parkingArea}/>
            </div>
        );
    }
}
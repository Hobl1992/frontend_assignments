/**
 * Created by hobl on 10.04.17.
 */

import React from 'react';

export const ParkingArea = (props) => {

    return (
        <div>
            <h3>Parking Area</h3>
            <h1>
                {props.parkingArea.map(
                    (element, i) => {
                        return <span key={i}>{element}</span>
                    })
                }
            </h1>
        </div>
    )
}
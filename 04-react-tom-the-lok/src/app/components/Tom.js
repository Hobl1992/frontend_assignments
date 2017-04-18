/**
 * Created by hobl on 10.04.17.
 */

import React from 'react';

export const Tom = (props) => {

    return (
        <div>
            <h3>Tom the Lok</h3>
            <h1>
                {props.tomTheLok.map(
                    (element, i) => {
                        return <span key={i}>{element}</span>
                    })
                }
            </h1>
        </div>
    );
}
import React from 'react';

export default class AsyncComponent extends React.Component {
    setStateAsync(newState) {
        return new Promise((resolve) => {
            this.setState(newState, () => {
                resolve();
            });
        });
    }
}
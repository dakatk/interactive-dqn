import React from 'react';

export default class AsyncComponent extends React.Component {
    /**
     * Wrapper for React's setState function
     * in an async context
     * 
     * @param {*} newState 
     * @returns 
     */
    setStateAsync(newState) {
        return new Promise((resolve) => {
            this.setState(newState, () => {
                resolve();
            });
        });
    }
}
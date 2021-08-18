import { Enumify } from "enumify";

class Transition {
    constructor(action, state, reward, done, nextState, allowedActions) {
        this.action = action;
        this.state = state;
        this.reward = reward;
        this.done = done;
        this.nextState = nextState;
        this.allowedActions = allowedActions;
    }
}

class Action extends Enumify {
    static UP = new Action();
    static DOWN = new Action();
    static LEFT = new Action();
    static RIGHT = new Action();
    static _ = this.closeEnum();

    opposite() {
        switch (this.enumKey) {
            case 'UP': 
                return Action.DOWN;
            case 'DOWN':
                return Action.UP;
            case 'LEFT':
                return Action.RIGHT;
            case 'RIGHT':
                return Action.LEFT;
            default:
                console.error(`Action '${this.enumKey}' doesn't have an opposite`);
                break;
        }
    }

    static fromOrdinal(ordinal) {
        switch (ordinal) {
            case 0:
                return Action.UP;
            case 1:
                return Action.DOWN;
            case 2:
                return Action.LEFT;
            case 3:
                return Action.RIGHT;
            default:
                console.error(`Not an Action: ${ordinal}`);
                break;
        }
    }
}

export {
    Transition, Action
}
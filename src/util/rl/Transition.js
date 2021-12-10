export default class Transition {
    constructor(action, state, reward, done, nextState, allowedActions) {
        this.action = action;
        this.state = state;
        this.reward = reward;
        this.done = done;
        this.nextState = nextState;
        this.allowedActions = allowedActions;
    }
}
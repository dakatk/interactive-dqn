import { Enumify } from "enumify";

export default class Action extends Enumify {
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
            case Action.UP.enumOrdinal:
                return Action.UP;
            case Action.DOWN.enumOrdinal:
                return Action.DOWN;
            case Action.LEFT.enumOrdinal:
                return Action.LEFT;
            case Action.RIGHT.enumOrdinal:
                return Action.RIGHT;
            default:
                console.error(`Not an Action: ${ordinal}`);
                break;
        }
    }
}

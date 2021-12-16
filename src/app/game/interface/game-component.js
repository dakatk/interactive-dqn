import AsyncComponent from "../../../util/async-component";

export default class GameComponent extends AsyncComponent {
    /**
     * Set game to intial state
     */
    async reset() {}

    /**
     * @returns Array of ordinal values for each 
     * action allowed in the game's current state
     */
    allowedActions() {}

    /**
     * Move from the current state to the next state
     * after applying the action that corresponds to
     * the given rodinal value
     * 
     * @param {number} actionOrdinal Numeric value
     * that decodes into a legal action
     */
    async step(actionOrdinal) {}

    /**
     * @returns Current game state transformed 
     * into a 2d tensor
     */
    stateAsTensor() {}
}
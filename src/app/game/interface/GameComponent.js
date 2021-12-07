import AsyncComponent from "../../../util/interface/AsyncComponent";

export default class GameComponent extends AsyncComponent {
    async reset() {}
    allowedActions() {}
    async step(action) {}
    stateAsTensor() {}
}
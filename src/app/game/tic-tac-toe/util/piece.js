import { Enumify } from "enumify";

export default class Piece extends Enumify {
    static X = new Piece();
    static O = new Piece();
    static SPACE = new Piece();
    static _ = this.closeEnum();

    toString() {
        switch (this.enumKey) {
            case 'SPACE':
                return ' ';
            default:
                return this.enumKey;
        }
    }

    /**
     * Create Piece object from string
     * @param {string} repr String representation of Piece
     */
    fromString(repr) {
        switch (repr) {
            case 'X':
                return Piece.X;
            case 'O':
                return Piece.O;
            case ' ':
                return Piece.SPACE;
            default:
                console.error(`"${repr}" is not a valid Piece`);
                break;
        }
    }
}
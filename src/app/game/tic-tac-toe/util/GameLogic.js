const WIN_CONDITIONS = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],

    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],

    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
]

export default class GameLogic {
    constructor(board) {
        this.board = board || [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
    }

    /**
     * 
     */
    reset() {
        this.board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
    }

    /**
     * 
     */
    legalMoves() {
        const moves = [];
        for (const [i, row] in Object.entries(this.board)) {
            for (const [j, cell] in Object.entries(row)) {
                if (cell === ' ') {
                    moves.push([i, j]);
                }
            }
        }
        return moves;
    }

    /**
     * 
     * @param {*} player 
     * @returns 
     */
    isWinner(player) {
        for (const winCondition of WIN_CONDITIONS) {
            const winCells = winCondition.map(value => {
                const row = value[0];
                const col = value[1];
                return this.board[row][col] === player;
            });

            if (winCells.every(value => value)) {
                return true; 
            }
        }
        return false;
    }

    /**
     * 
     * @param {*} move 
     * @param {*} player 
     */
    makeMove(move, player) {
        const row = move[0];
        const col = move[1];
        this.board[row][col] = player;
    }

    /**
     * 
     * @returns 
     */
    clone() {
        return new GameLogic([
            [...this.board[0]],
            [...this.board[1]],
            [...this.board[2]]
        ]);
    }
}
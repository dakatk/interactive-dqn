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
     * Game is reset to inital state
     */
    reset() {
        this.board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
    }

    /**
     * @returns Array of all legal moves for the current 
     * board state in the form [row, col] 
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
     * @param {string} player 
     * @returns 'true' if the given player has won, 'false' otherwise
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
     * @param {Array<number>} move [row, col] coordinates of player's move
     * @param {string} player 
     */
    makeMove(move, player) {
        const row = move[0];
        const col = move[1];
        this.board[row][col] = player;
    }

    /**
     * @returns New GameLogic instance with the same board values
     */
    clone() {
        return new GameLogic([
            [...this.board[0]],
            [...this.board[1]],
            [...this.board[2]]
        ]);
    }
}
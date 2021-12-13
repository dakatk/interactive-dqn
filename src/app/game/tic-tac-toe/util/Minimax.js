const MAX_DEPTH = 9;
const MAX_SCORE = 10 + MAX_DEPTH;
const MIN_SCORE = -10 - MAX_DEPTH;

class Node {
    constructor(move, score) {
        this.move = move;
        this.score = score;
        this.children = [];
    }
}

/**
 * 
 * @param {*} game 
 * @param {*} player1 
 * @param {*} player2 
 * @returns 
 */
export default function bestMove(game, player1, player2) {
    const head = new Node(undefined, 0);
    generateTree(game, head, player1, player2);

    const alpha = MIN_SCORE - 1;
    const beta = MAX_SCORE + 1;
    const [_, move] = alphabeta(head, alpha, beta);

    return move
}

function generateTree(game, node, player1, player2, maximize=true, depth=MAX_DEPTH) {
    if (depth === 0 || game.isWinner(player1) || game.isWinner(player2)) {
        return;
    }

    for (const move of game.legalMoves()) {
        const gameClone = game.clone();
        gameClone.makeMove(move, player1);

        const childScore = heuristicScore(gameClone, player1, player2, maximize, depth);
        const child = new Node(move, childScore);
        node.children.push(child);

        generateTree(gameClone, child, player2, player1, !maximize, depth - 1);
    }
}

function heuristicScore(game, player1, player2, maximize, depth) {
    if (game.isWinner(player1)) {
        return (maximize && (MAX_SCORE + depth)) || (MIN_SCORE - depth);
    }
    else if (game.isWinner(player2)) {
        return (maximize && (MIN_SCORE - depth)) || (MAX_SCORE + depth);
    }
    return (maximize && depth) || -depth; 
}

function alphabeta(node, alpha, beta, maximize=true) {
    if (node.children.length === 0) {
        return [node.score, node.move];
    }

    let score = maximize ? MIN_SCORE - 1 : MAX_SCORE + 1;
    let move = undefined;

    for (const child of node.children) {
        const [nextScore, _] = alphabeta(child, alpha, beta, !maximize);
        move = child.move;

        if (maximize) {
            score = Math.max(score, nextScore);
            if (score >= beta) {
                break;
            }
            alpha = Math.max(alpha, score);
        }
        else {
            score = Math.min(score, nextScore);
            if (score <= alpha) {
                break;
            }
            beta = Math.min(beta, score);
        }
    }
    return [score, move];
}

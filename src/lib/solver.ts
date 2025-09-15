import { Trie, TrieNode } from "./trie";
import { Board, FoundWord } from "@/types/wordhunt";

const directions = [
    [0, 1], [0, -1], [1, 0], [-1, 0],
    [1, 1], [1, -1], [-1, 1], [-1, -1]
];

function dfs(
    grid: Board,
    visited: boolean[][],
    row: number,
    col: number,
    current: string,
    node: TrieNode | undefined,
    pathList: number[],
    minWordLength: number,
    results: Map<string, number[]>
): void {
    if (!node || row < 0 || col < 0 || row >= grid.length || col >= grid[0].length || visited[row][col]) {
        return;
    }

    node = node.children.get(grid[row][col]);
    if (!node) return;

    current += grid[row][col];
    pathList.push(row * grid.length + col);

    if (current.length >= minWordLength && node.isWord && !results.has(current)) {
        results.set(current, [...pathList]);
    }

    visited[row][col] = true;

    for (const [dr, dc] of directions) {
        dfs(grid, visited, row + dr, col + dc, current, node, pathList, minWordLength, results);
    }

    visited[row][col] = false;
    pathList.pop();
}

export function solveBoard(board: string, numRows: number, trie: Trie, minWordLength = 3): Map<string, number[]> {
    if (board.length < numRows * numRows) return new Map();

    const grid: Board = Array.from({ length: numRows }, (_, row) =>
        Array.from({ length: numRows }, (_, col) => board[row * numRows + col])
    );

    const visited = Array.from({ length: numRows }, () => Array(numRows).fill(false));
    const results: Map<string, number[]> = new Map();

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numRows; col++) {
            dfs(grid, visited, row, col, "", trie.root, [], minWordLength, results);
        }
    }

    // Sort by word length
    return new Map([...results.entries()].sort((a, b) => b[0].length - a[0].length));
}

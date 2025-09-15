// A single position on the board
export type Position = {
    row: number;
    col: number;
};

// The board itself: 2D grid of characters
export type Board = string[][];

// A found word, along with the path of positions
export type FoundWord = {
    word: string;
    path: Position[]; // sequence of cells used to make this word
};

// Config options for the solver (optional, in case you extend later)
export type SolverOptions = {
    minLength?: number; // ignore words shorter than this
    maxLength?: number; // optional cap
};

// Result of solving the board
export type SolverResult = {
    words: FoundWord[];
    elapsedMs: number; // performance metric
};

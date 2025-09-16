export type SolutionDisplayProps = {
    answers: Map<string, number[]>;
    handleMouseEvent: (path: number[], idx: number) => void;
};

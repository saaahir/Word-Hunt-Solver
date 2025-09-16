import { SolutionDisplayProps } from "@/types/components";



const SolutionDisplay = ({ answers, handleMouseEvent }: SolutionDisplayProps) => {
    const pointsMap = new Map<number, number>([
        [3, 300],
        [4, 400],
        [5, 800],
        [6, 1400],
        [7, 1800],
        [8, 2200],
    ]);

    return (
        <div className="bg-boardGreen border-borderGreen border-8 rounded-2xl mt-2 flex flex-col items-center overflow-y-auto w-[353px] h-[353px] lg:w-[484px] lg:h-[480px]">
            {answers.size === 0 ? (
                <div className="text-white font-bold text-xl mb-2 text-center w-full flex items-center justify-center h-full">
                    Answers show here!
                </div>
            ) : (
                Array.from(answers.entries()).map(([word, pathlist], idx) => (
                    <div
                        key={word}
                        onMouseOver={() => handleMouseEvent(pathlist, idx)}
                        className="bg-[url('/resources/wood.png')] bg-cover bg-center rounded-md my-1 flex flex-row font-bold text-lg border shadow-xl text-center w-[98%] place-content-between hover:opacity-60 text-black"
                    >
                        <div>{word}</div>
                        <div>{word.length <= 8 ? pointsMap.get(word.length) : pointsMap.get(8)}</div>
                    </div>
                ))
            )}
        </div>
    );
};

export default SolutionDisplay;

"use client";

import { useEffect, useState } from "react";

type GridProps = {
    board: string;
    path: number[];
};

export default function Grid({ board, path }: GridProps) {
    const [points, setPoints] = useState<string>("");

    useEffect(() => {
        if (path.length === 0) {
            setPoints("");
            return;
        }

        const gridRect = document.querySelector<HTMLDivElement>("#grid")?.getBoundingClientRect();
        if (!gridRect) return;

        const newPoints: string[] = [];

        for (let i = 0; i < path.length; i++) {
            const tileRect = document.querySelector<HTMLDivElement>(`#idx${path[i]}`)?.getBoundingClientRect();
            if (tileRect) {
                const x = tileRect.left - gridRect.left + tileRect.width / 2;
                const y = tileRect.top - gridRect.top + tileRect.height / 2;
                newPoints.push(`${x},${y}`);
            }
        }

        setPoints(newPoints.join(" "));
    }, [path]);

    // Initialize all cells with wood background
    const styles = Array.from({ length: 16 }, () => "bg-[url('/resources/wood.png')]");

    // Highlight visited path cells
    for (const idx of path) {
        styles[idx] = "bg-slate-300";
    }

    return (
        <div
            id="grid"
            className="grid grid-cols-4 gap-4 mt-2 p-4 bg-boardGreen border-borderGreen border-8 rounded-2xl relative"
        >
            {Array.from({ length: 16 }).map((_, idx) => (
                <div
                    id={`idx${idx}`}
                    key={idx}
                    className={`${styles[idx]} bg-cover aspect-square 
            flex flex-col items-center justify-center 
            w-16 md:w-24 text-3xl md:text-6xl text-center font-bold 
            border rounded-md shadow-xl text-black`}
                >
                    {board.length <= idx ? "?" : board.charAt(idx)}
                </div>
            ))}

            {points && (
                <svg className="absolute h-full w-full text-line">
                    <polyline
                        points={points}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="15"
                        opacity={0.75}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        style={{
                            strokeDasharray: 30,
                            animation: "dash 3s linear infinite",
                            strokeDashoffset: 1000,
                        }}
                    />
                    <style>
                        {`@keyframes dash { 
                to { stroke-dashoffset: 0; } 
              }`}
                    </style>
                </svg>
            )}
        </div>
    );
}

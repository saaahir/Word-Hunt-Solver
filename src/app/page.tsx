"use client";

import { useState, useEffect, use } from "react";
import Form from "@/components/Form";
import Grid from "@/components/Grid";
import SolutionDisplay from "@/components/SolutionDisplay";
import { Trie } from "@/lib/trie";
import { loadDictionary } from "@/lib/loadDictionary";
import { solveBoard } from "@/lib/solver";

export default function Page() {
  const [board, setBoard] = useState("");
  const [trie, setTrie] = useState<Trie | null>(null);
  const [answers, setAnswers] = useState<Map<string, number[]>>(new Map());
  const [path, setPath] = useState<number[]>([]);
  const [currentSolutionIdx, setCurrentSolutionIdx] = useState(0);
  const numRows = 4;

  useEffect(() => {
    loadDictionary(3).then(setTrie);
  }, []);


  const handleSubmission = () => {
    if (!trie) return;
    const newAnswers = solveBoard(board, numRows, trie, 3)
    setAnswers(newAnswers);

    const firstEntry = newAnswers.entries().next();
    if (!firstEntry.done) {
      setPath(firstEntry.value[1]);
      setCurrentSolutionIdx(0);
    } else {
      setPath([]);
      setCurrentSolutionIdx(0);
    }
  };

  const showNextSolution = () => {
    const entries = Array.from(answers.entries());
    if (entries.length === 0) return;

    const nextIdx = (currentSolutionIdx + 1) % entries.length;
    setCurrentSolutionIdx(nextIdx);
    setPath(entries[nextIdx][1]);
  };

  const resetBoard = (clearBoard: boolean) => {
    if (clearBoard) {
      setBoard("");
    }
    setAnswers(new Map());
    setPath([]);
    setCurrentSolutionIdx(0);
  };


  useEffect(() => {
    const handleSpace = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        showNextSolution();
      }
    };
    window.addEventListener("keydown", handleSpace);
    return () => window.removeEventListener("keydown", handleSpace);
  }, [showNextSolution, answers, currentSolutionIdx]);


  return (
    <div className="bg-[url('/resources/background.png')] min-h-screen bg-cover flex flex-col">
      {/* Header always sticks to top */}
      <header className="w-full bg-darkGreen/50 backdrop-blur-md text-white text-center rounded-b-2xl shadow-lg py-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide drop-shadow">
          Word Hunt Solver
        </h1>
        <p className="text-base md:text-lg mt-2 opacity-90">
          Solve your iMessage Word Hunt boards instantly!
        </p>
        <section className="text-center mt-6 max-w-2xl mx-auto px-6">
          <p className="text-white/90 leading-relaxed text-sm md:text-base">
            Enter your Word Hunt board letters below (left to right, top to bottom).
            Then click <span className="font-bold">Solve</span> to see all possible
            words and paths. Hover over a word to see its path highlighted on the grid!
          </p>
        </section>
      </header>

      {/* Main content flexes below */}
      <main className="flex flex-col items-center justify-center flex-1 mt-6">
        <Form
          handleFormChange={setBoard}
          handleSubmission={handleSubmission}
          resetBoard={resetBoard}
          showNextSolution={showNextSolution}
        />
        <div className="flex flex-col items-center md:flex-row gap-4 mt-6">
          <Grid board={board} path={path} />
          <SolutionDisplay
            answers={answers}
            handleMouseEvent={(path: number[], idx: number) => {
              setPath(path);
              setCurrentSolutionIdx(idx);
            }}
          />
        </div>
      </main>
    </div>
  );

}

"use client";

import { useState, useEffect, use } from "react";
import Form from "@/components/Form";
import Grid from "@/components/Grid";
import SolutionDisplay from "@/components/SolutionDisplay";
import { Trie } from "@/lib/trie";
import { loadDictionary } from "@/lib/loadDictionary";
import { solveBoard } from "@/lib/solver";
import posthog from "posthog-js";

export default function Page() {
  const [board, setBoard] = useState("");
  const [trie, setTrie] = useState<Trie | null>(null);
  const [answers, setAnswers] = useState<Map<string, number[]>>(new Map());
  const [path, setPath] = useState<number[]>([]);
  const [currentSolutionIdx, setCurrentSolutionIdx] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const numRows = 4;

  useEffect(() => {
    loadDictionary(3).then(setTrie);
  }, []);


  const handleSubmission = () => {
    if (!trie) return;
    const newAnswers = solveBoard(board, numRows, trie, 3)
    setAnswers(newAnswers);

    posthog.capture("board_submitted", {
      board,
      answers_count: newAnswers.size,
      timestamp: new Date().toISOString(),
    });

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

      if (
        (e.key == "Backspace" || e.key == "Delete") && (e.metaKey || e.ctrlKey)
      ) {
        e.preventDefault();
        resetBoard(true);
        setInputValue("");
      }
    };
    window.addEventListener("keydown", handleSpace);
    return () => window.removeEventListener("keydown", handleSpace);
  }, [showNextSolution, answers, currentSolutionIdx, resetBoard]);


  return (
    <div className="min-h-screen flex flex-col">
      {/* Header always sticks to top */}
      <header className="w-full bg-darkGreen/30 backdrop-blur-xs  text-white text-center rounded-b-2xl shadow-xl py-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide drop-shadow">
          Word Hunt Solver
        </h1>
        <p className="text-lg md:text-xl opacity-90">
          Solve your iMessage Word Hunt boards instantly!
        </p>
        <section className="text-center mt-2 max-w-2xl mx-auto px-6">
          <p className="text-white/90 leading-relaxed text-base md:text-lg">
            Enter your Word Hunt board letters below (left to right, top to bottom).
            Then click <span className="font-extrabold">Solve</span> or press <span className="font-extrabold">Enter</span> to see all possible
            words and paths. Hover over a word or press the <span className="font-extrabold">spacebar</span> to see next path highlighted on the grid!
            Click <span className="font-extrabold">Clear</span> or press <span className="font-extrabold">Cmd/Ctrl + Backspace</span> to reset.
          </p>
        </section>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 mt-6">
        <Form
          handleFormChange={setBoard}
          handleSubmission={handleSubmission}
          resetBoard={resetBoard}
          showNextSolution={showNextSolution}
          inputValue={inputValue}
          setInputValue={setInputValue}
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

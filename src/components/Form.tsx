import { useState } from "react";

type FormProps = {
    handleFormChange: (value: string) => void;
    handleSubmission: () => void;
    resetBoard: () => void; // New prop to reset answers/board
};


const Form = ({ handleFormChange, handleSubmission, resetBoard }: FormProps) => {

    function handleClear() {
        resetBoard();        // Clear answers and board state
        // Clear input text box
        const inputElement = document.querySelector('input[placeholder="Enter Board"]') as HTMLInputElement;
        console.log(inputElement);
        if (inputElement) {
            inputElement.value = "";
        }

    }

    function updateBoard(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value.toUpperCase().replace(/[^A-Z]/g, ""); // Only alpha chars
        if (value.length > 16) value = value.slice(0, 16); // Max 16 chars

        // Reset if input is empty
        if (value.length === 0) {
            resetBoard();
        }

        handleFormChange(value);
    }

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="text-center bg-slate-200 p-4 rounded-lg shadow-md font-semibold mt-[50px] lg:m-0"
        >
            <input
                placeholder="Enter Board"
                onChange={updateBoard}
                value={undefined} // or pass a board state if needed
                className="px-4 py-2 rounded-md bg-slate-200 focus:outline-none text-black"
            />

            {/* Buttons container */}
            <div className="mt-2 flex sm:flex-row justify-center gap-2">
                <button
                    type="button"
                    onClick={handleSubmission}
                    className="px-4 py-2 bg-lightGreen text-white rounded-md hover:bg-darkGreen focus:outline-none"
                >
                    Solve!
                </button>

                <button
                    type="button"
                    onClick={handleClear}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                >
                    Clear
                </button>
            </div>

        </form>
    );
};

export default Form;

import { useState } from "react";

type FormProps = {
    handleFormChange: (value: string) => void;
    handleSubmission: () => void;
    resetBoard: (clearBoard: boolean) => void;
};

const Form = ({ handleFormChange, handleSubmission, resetBoard }: FormProps) => {
    const [inputValue, setInputValue] = useState("");

    function handleClear() {
        resetBoard(true);
        setInputValue("");
    }

    function updateBoard(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
        if (value.length > 16) value = value.slice(0, 16);

        setInputValue(value);

        // Reset if input is empty
        if (value.length === 0) {
            resetBoard(true);
        }

        handleFormChange(value);
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmission();
            }}
            className="text-center bg-slate-200 p-4 rounded-lg shadow-md font-semibold mt-[50px] lg:m-0"
        >
            <input
                placeholder="Enter Board"
                onChange={updateBoard}
                value={inputValue}
                maxLength={16}
                className="px-4 py-2 rounded-md bg-slate-200 focus:outline-none text-black uppercase"
                onKeyDown={(e) => {
                    if (e.key === "Backspace") {
                        resetBoard(false);
                    }
                }}
                pattern="[A-Za-z]{0,16}"
                autoComplete="off"
            />

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
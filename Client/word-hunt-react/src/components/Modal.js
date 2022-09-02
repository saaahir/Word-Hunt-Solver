import ReactDOM from "react-dom";

const Modal = ({ setClicked }) => {
    const closePopup = () => {
        setClicked(false);
    }

    // return (
    //     <div>Modal</div>
    // )

    return ReactDOM.createPortal(
        <div className="modal">
            <div className="innerModal">
                <div className="topBar">

                    <h2>Info</h2>
                    <button className="exitButton" onClick={() => closePopup()}>X</button>
                </div>
                <div className="steps">
                    <h3>Step 1: Enter the board in the input box</h3>
                    <h3>Step 2: Press solve to see solutions</h3>
                    <h3>Solutions will show up with most valuable words shown first.</h3>
                    <h3>Hover over each word to see the path on the board!</h3>
                    {/* <h3>Alternatively, press spacebar to show next solution!</h3> */}
                </div>

            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default Modal
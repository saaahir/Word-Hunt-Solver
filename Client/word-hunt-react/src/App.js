import Grid from "./components/Grid"

import { useEffect, useState, useRef } from "react"
import axios from "axios"
import fallback, { altAnswers } from "./fallback"
import githublogo from './resources/github.png'
import linkedinlogo from './resources/linkedin.png'
import saahirlogo from './resources/saahir.png'
import Modal from "./components/Modal"

const App = () => {
  const [text, setText] = useState("")
  const [clicked, setClicked] = useState(false)
  const [words, setWords] = useState([])
  const [answers, setAnswers] = useState({})
  const [path, setPath] = useState([])
  const refList = useRef([])
  const pointsMap = {
    3: 300,
    4: 400,
    5: 800,
    6: 1400,
    7: 1800,
    8: 2200
  };

  const NUMTILES = 4;

  function getSolutions() {
    if (text.length < NUMTILES * NUMTILES) return;
    axios(`${process.env.REACT_APP_APIURL}?letters=${text}&dimensions=${NUMTILES}`,
      {
        method: "GET",
      }
    )
      .then(res => {
        const answers = res.data;
        setAnswers(answers);
        setWords(Object.keys(answers).sort(function (a, b) { return b.length - a.length }))
      }).catch(() => {
        setAnswers(altAnswers)
        setWords(Object.keys(altAnswers).sort(function (a, b) { return b.length - a.length }))
      })
  }

  useEffect(() => {
    for (let i = 0; i < NUMTILES * NUMTILES; i++) {
      refList.current[i].style.background = "#52796f"
      refList.current[i].style.color = "#cad2c5"
    }

    for (let i = 0; i < path.length; i += 2) {
      let x = path[i]
      let y = path[i + 1]
      // console.log(refList.current[x * NUMTILES + y]) 
      let offset = ((i) * (i)) / 2
      let red = 58 + offset;
      let green = 90 + offset;
      let blue = 64 + offset;
      refList.current[x * NUMTILES + y].style.background = `rgb(${red}, ${green}, ${blue})`
      // refList.current[x * NUMTILES + y].style.color = "black"

    }
  }, [path])

  return (
    <>
      <div className="header">
        <div className="innerHeader">
          <div className="logo">
            <a href="http://localhost:3000/">
              <h3>WHS</h3>
            </a>
          </div>
          <div className="links">

            <div className="saahirLink">
              <a href="https://www.saahird.com">
                <img src={saahirlogo} alt="" />
                <h3>Portfolio</h3>

              </a>
            </div>

            <div className="githubLink">
              <a href="https://github.com/saaahir">
                <img src={githublogo} alt="" />
                <h3>GitHub</h3>

              </a>
            </div>

            {/* <div className="linkedinLink">
              <a href="https://www.linkedin.com/in/saahird/">
                <img src={linkedinlogo} alt="" />
                <h3>LinkedIn</h3>

              </a>
            </div> */}
          </div>

        </div>


      </div>
      <div className="outerLayout">
        <h1>Word Hunt Solver</h1>
        <div className="form">

          <form onSubmit={(e) => { e.preventDefault(); getSolutions(); }}>
            <div className="inputAndButtons">
              <button className="helpButton" type="button" onClick={() => setClicked(true)}>?</button>

              <input placeholder="Enter Board" onChange={(value) => {
                let t = value.target.value.replace(/[^a-zA-Z]/g, "").toLowerCase()
                if (t.length <= NUMTILES * NUMTILES) setText(t)
                else setText(t.substring(0, NUMTILES * NUMTILES))
              }} />
              <button className="submitButton" onClick={() => { getSolutions(); }}>Solve</button>
            </div>
          </form>
        </div>
        {clicked &&
          <Modal setClicked={setClicked} />
        }
        <div className="mainContent">
          <Grid Text={text} NUMTILES={NUMTILES} path={path} refList={refList} />
          <div className="solutions">
            {
              words.map((word, index) =>
              (
                <div className="solution" key={index} onMouseOver={() => setPath(answers[word])}>
                  <h3 >
                    {index + 1}) {word}
                  </h3>
                  <h3 className="points">

                    {word.length <= 8 ? pointsMap[word.length] : pointsMap[8]}
                  </h3>
                  <div></div>
                </div>
              ))}
          </div>
        </div>
      </div>

    </>
  )
}

export default App
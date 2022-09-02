import Tile from './Tile'

const Grid = ({ Text, NUMTILES, path, refList }) => {


    return (
        <div className='grid'>
            {/* <Tile letter={Text}></Tile> */}
            {[...new Array(NUMTILES)].map((e, idx1) => (
                <div className="row" key={idx1}>
                    {[...new Array(NUMTILES)].map((e, idx2) => (
                        < Tile
                            key={idx1 * NUMTILES + idx2}
                            idx={idx1 * NUMTILES + idx2}
                            refList={refList}
                            // There is a whitespace char that i copied from online in the seemingly empty quotes below
                            letter={Text.length < idx1 * NUMTILES + idx2 ? "​" : Text.charAt(idx1 * NUMTILES + idx2)} >
                        </Tile >
                    ))
                    }
                </div >
            ))

            }
        </div >
    )
}

export default Grid
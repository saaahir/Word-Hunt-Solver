import React, { useRef } from 'react'

const Tile = ({ idx, letter, refList }) => {
    return (
        <>
            {/* {console.log(refList)} */}
            < div ref={el => refList.current[idx] = el} className="tile" > {letter}</ div>
        </>
    )
}

export default Tile
import axios from "axios";
import React, { useEffect, useState } from "react";

import styles from './Radio.module.scss'

const Radio = ({ setPositionValue }) => {
    const [isLoading, setIsloading] = useState(true)
    const [positions, setPositions] = useState([])
    const [clickedPosition, setClickedPosition] = useState('Lawyer')

    useEffect(() => {
        setPositionValue(clickedPosition)
    }, [clickedPosition])

    useEffect(() => {
        axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
            .then(res => {
                setPositions(res.data.positions)
                setIsloading(false)
            })
    }, [])


    return (
        <div className={styles.radio}>
            <p>Select your position</p>
            {isLoading
                ?
                <div className='lds_ring'><div></div><div></div><div></div><div></div></div>
                :
                positions.map((position, index) => (
                    <label key={index}>
                        <input
                            type="radio"
                            name="position"
                            value={position.name}
                            checked={position.name === clickedPosition ? true : false}
                            onChange={() => { }} />
                        <label
                            htmlFor={position.name}
                            className={styles.wide}
                            onClick={e => setClickedPosition(e.target.htmlFor)}>{position.name}</label>
                    </label>
                ))}

        </div>
    )
}

export default Radio
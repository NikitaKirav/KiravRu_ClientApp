/** Absolute imports */
import React from 'react';

/** Styles */
import s from './difficulty.module.less';

const Difficulty = ({difficultyLevel}) => {
    return <div className={s.difficulty}>
        <DifficultyIcon difficultyLevel={difficultyLevel} />
        <span className={s.text}>difficulty</span>
    </div>
}

const DifficultyIcon = ({difficultyLevel}) => {
    switch(difficultyLevel) {
        case 1: 
            return <div className={s.levelDifficulty1}></div>
        case 2: 
            return <div className={s.levelDifficulty2}></div>
        case 3: 
            return <div className={s.levelDifficulty3}></div>
        case 4: 
            return <div className={s.levelDifficulty4}></div>
        case 5: 
            return <div className={s.levelDifficulty5}></div>
        default: 
            return <div className={s.levelDifficulty1}></div>
    }
}

export default Difficulty;
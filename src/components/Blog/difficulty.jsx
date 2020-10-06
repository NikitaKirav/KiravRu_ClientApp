import React from 'react';
import s from './difficulty.module.less';

let Difficulty = (props) => {
    return <div className={s.difficulty}>
        <DifficultyIcon difficultyLevel={props.difficultyLevel} />
        <span className={s.text}>difficulty</span>
    </div>
}

let DifficultyIcon = (props) => {
    switch(props.difficultyLevel) {
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
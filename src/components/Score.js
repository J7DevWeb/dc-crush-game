import React from 'react';

const Score = ({score}) => {

    return (
        <div className="score-board">
            <h2>Score</h2>
            <p>{score}</p>
        </div>
    );
};

export default Score;
'use strict';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  increment, decrement, incrementByAmount, decrementByAmount, selectCount } from '../slices/counter/counterSlice.js';
import {  incrementEmojis, selectEmojisCount, resetCountEmojis, showEmojisResults, selectShowResults, selectFlyingEmojis, addFlyingEmojis, removeFlyingEmoji } from '../slices/counter/counterEmojisSlice.js';

export default function Main()  {
    // simple-counter
    const countSimple = useSelector(selectCount);
    const dispatch = useDispatch();

    const incrementValue = 5;
    const decrementValue = 5;

    // emojis-counter

    const emojis = ["😒", "😂", "😇", "😎", "🙄"];
    const emojiCounts = useSelector(selectEmojisCount);
    const showResults = useSelector(selectShowResults);
    const flyingEmojis = useSelector(selectFlyingEmojis);

    function emojiClick(index, event) {
        dispatch(incrementEmojis(index));
        dispatch(showEmojisResults(false));

        // анімація кліків emoji
        const rect = event.target.getBoundingClientRect();
        const randomOffset = (Math.random() - 0.8) * 40; 
        const x = rect.left + rect.width / 2 + randomOffset;
        const y = rect.top; 
        const emojiId = Date.now();

        const newFlyingEmoji = { id: emojiId, emoji: emojis[index], x, y };
        dispatch(addFlyingEmojis(newFlyingEmoji));

        setTimeout(() => {
            dispatch(removeFlyingEmoji(emojiId));
        }, 1500);
    };

    function showResultsHandler() {
        dispatch(showEmojisResults(true));
    };

        function getMaxCount() {
        return Math.max(...emojiCounts);
    };

    function getWinningEmojiIndex() {
        const maxCount = getMaxCount();
        return emojiCounts.indexOf(maxCount);
    };

    function clearResults() {
        dispatch(resetCountEmojis());
        dispatch(showEmojisResults(false));
    };

    return (
        <div className='counter-wrap'>
            <h1>Redux-Counter</h1>
            {/* {simple-counter} */}
            <div className='simple-counter'>
                <h2>Simple-Counter</h2>
                <div className='simple-counter-value'>Value: {countSimple}</div>
                <div className='simple-counter-controls'>
                    <div>
                        <button onClick={() => dispatch(increment())}>+</button>
                        <button onClick={() => dispatch(decrement())}>-</button>
                    </div>
                    <div>
                        <button onClick={() => dispatch(incrementByAmount(incrementValue))}> +{incrementValue}</button>
                        <button onClick={() => dispatch(decrementByAmount(decrementValue))}> -{decrementValue}</button>
                    </div>
                </div>
            </div>
            
            {/* {emojis-counter} */}
            <div className="emoji-block">
            <h2>Emoji-counter</h2>

            <ul className="emoji-list">
                {emojis.map((emoji, index) => (
                    <li className="emoji-item" key={index}>
                        <span className="emoji" onClick={(event) => emojiClick(index, event)}>
                            {emoji}
                        </span>
                        {showResults && (
                            <span className="click-counter">
                                {emojiCounts[index]}
                            </span>
                        )}
                    </li>
                ))}
            </ul>

            <div className="btn-wrap">
                <button className="btn btn-show" onClick={showResultsHandler}>Show Results</button>
                <button className="btn btn-clear" onClick={clearResults}>Clear</button>
            </div>

            {showResults && (
                getMaxCount() === 0 ? (
                    <div className='results-block'>
                        <h2>You have to vote for someone</h2>
                    </div>
                ) : (
                    <div className='results-block'>
                        <h2>Winner:</h2>
                        <div className="emoji-item" key={getWinningEmojiIndex()}>
                            <div className="emoji">
                                {emojis[getWinningEmojiIndex()]}
                            </div>
                            <div className="click-counter">
                                Number of votes: {getMaxCount()}
                            </div>
                        </div>
                    </div>
                )
            )}

            {flyingEmojis.map((emoji) => (
                <span
                    key={emoji.id}
                    className="flying-emoji"
                    style={{ left: emoji.x, top: emoji.y }}
                >
                    {emoji.emoji}
                </span>
            ))}
            </div>
        </div>
    );
};

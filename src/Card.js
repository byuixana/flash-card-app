/**
 * A flashcard component that displays question and answer with flip animation.
 * Shows an image, question on the front, and answer on the back with navigation buttons.
 *
 * @typedef {object} CardProps
 * @property {object} cardData - Card data object containing question, answer, and img_src
 * @property {string} cardData.question - Question text displayed on the front
 * @property {string} cardData.answer - Answer text displayed on the back
 * @property {string} cardData.img_src - Image source URL for the card
 * @property {function} moveNext - Callback function to move to the next card
 * @property {number|string} resetTrigger - Trigger value that resets the card state when changed
 * 
 * @returns {JSX.Element} A flipable flashcard component
 */

import {useState, useEffect} from 'react';
import { useFlashcardContext } from './context/FlashcardContext.js';

export default function Card({cardData, moveNext, resetTrigger}){

    const { markCardAsKnown } = useFlashcardContext();
    const [isFlipped, setFlipped] = useState(false)
    const [correct, setCorrect] = useState(false)
    console.log("Card", cardData)
    // Reset state whenever the index changes
    useEffect(() => {
        setFlipped(false);
        setCorrect(false);
    }, [resetTrigger]);
    
    // Get question and answer from cardData
    const question = cardData?.question
    const answer = cardData?.answer
    const img = cardData?.img_src

    return (
        <div
            className="relative mx-auto w-screen
            ml-10 mr-10
            max-w-[480px]
            max-h-[500px]
            aspect-[9/16] origin-center transition-transform duration-[600ms] 
            [transform-style:preserve-3d] outline outline-1 outline-blue-500
            rounded shadow-sm"
            style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
        
            {/* Front Side */}
            <div
                onClick={() => setFlipped(true)}
                style={{ backfaceVisibility: 'hidden' }}
                className="absolute inset-0 flex flex-col items-center justify-center
                h-fit max-h-[100%]
                 bg-white rounded p-6 cursor-pointer"
            >
                <img
                    src={img}
                    alt="Question"
                    className="w-full h-fit mb-4 rounded overflow-hidden object-contain"
                    style={{ width: '100%', aspectRatio: '9 / 16'}}
                />
                <div className="text-center">{question}</div>
            </div>

            {/* Back Side */}
            <div
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded p-6"
            >
                <img
                    src={img}
                    alt="Answer"
                    className="w-full max-h-96 mb-4 rounded overflow-hidden object-contain"
                    style={{ width: '100%', aspectRatio: '9 / 16' }}
                />
                <div className="text-center mb-4">{answer}</div>

                <div className={`flex flex-row ${isFlipped ? 'visible' : 'hidden'}`}>
                    <button
                        className="rounded-full bg-green-500 font-bold p-2 m-2 w-fit h-fit"
                        onClick={() => {
                            setCorrect(true);
                            markCardAsKnown(cardData);
                            moveNext();
                        }}
                    >
                        <svg width="90" height="90" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          <path d="M 30 50 L 42 62 L 70 34" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                        className="rounded-full bg-red-500 font-bold p-2 m-2 w-fit h-fit"
                        onClick={() => {
                            setCorrect(false);
                            moveNext();
                        }}
                    >
                        <svg width="90" height="90" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 32 32 L 68 68 M 68 32 L 32 68" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
    
}
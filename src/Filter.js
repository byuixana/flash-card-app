/**
 * A filter component that allows users to select cards by answer.
 * Provides options to select all, deselect all, or filter by specific answers.
 *
 * @returns {JSX.Element} A filter dropdown with card answer options
 */

import { useFlashcardContext } from './context/FlashcardContext.js';
import { useMemo } from 'react';

export default function Filter(){
    const { cardArray, selectedCardIds, setCardSelection } = useFlashcardContext();

    // compute unique questions from current deck

    const cardQuestions = useMemo(() => {
        const uniqueQuestions = cardArray.map(card => card.question).filter(Boolean);
        return [...new Set(uniqueQuestions)].sort();
    }, [cardArray])

    function handleSelectionChange(event) {
        const selectedValues = Array.from(event.target.selectedOptions, opt => opt.value);
        
        // Handle special options
        if (selectedValues.includes('__SELECT_ALL__')) {
            const allIds = cardArray.map(card => card.id);
            setCardSelection(allIds);
            return;
        }
        
        if (selectedValues.includes('__DESELECT_ALL__')) {
            setCardSelection([]);
            return;
        }
    
        // Find every card that belongs to the chosen answers
        const idsToEnable = cardArray
            .filter(card => selectedValues.includes(card.question))
            .map(card => card.id);

        setCardSelection(idsToEnable); 
        // This replaces the set, immediately removing cards not in these subjects
    };


    // This will change whenever selection or cardArray changes. 
    const selectedQuestions = useMemo(() => {
        // For each question, check if its id is still selected and ensure 
        // its question has some match in the deck. 
        // Question strings are checked because that is what the the filter is deriving from the deck. 
        // If both match, include in the dropdown.
        return cardQuestions.filter(question =>
            cardArray.some(c => c.question === question && selectedCardIds.has(c.id))
        );
    }, [cardQuestions, cardArray, selectedCardIds]);

        
    return (
        <form className="flex flex-row items-center justify-end w-full sm:w-2/5 p-1 min-w-0">
            <label htmlFor="cards-select" className="
                flex
                items-center
                justify-center
                text-center
                text-sm sm:text-base
                p-1
                text-white 
                bg-blue-500 
                outline-blue-500
                outline
                h-7 sm:h-8
                w-[36%] sm:w-[40%]
            ">Cards</label>
            <select 
                id="cards-select"
                multiple 
                size="1"
                className="
                hide-selected-count 
                text-sm sm:text-base
                p-1
                outline-blue-500
                outline
                h-7 sm:h-8
                w-[64%] sm:w-[60%]
                min-w-0
                "
                value={ selectedQuestions }

                onChange={handleSelectionChange}
            >
                <option value="__SELECT_ALL__">Select All</option>
                <option value="__DESELECT_ALL__">Deselect All</option>
                {cardQuestions.map(question => (
                    <option key={question} value={question}>
                        {question}
                    </option>
                ))}
            </select>
        </form>
    );
}
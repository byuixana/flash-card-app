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

    const cardAnswers = useMemo(() => {
        const uniqueAnswers = cardArray.map(card => card.answer).filter(Boolean);
        return [...new Set(uniqueAnswers)].sort();
    }, [cardArray])

    function handleSelectionChange(event) {
        const selectedValues = Array.from(event.target.selectedOptions, opt => opt.value);
        
        // Handle special options
        if (selectedValues.includes('__SELECT_ALL__')) {
            const allIds = cardArray.map(card => card.img_src);
            setCardSelection(allIds);
            return;
        }
        
        if (selectedValues.includes('__DESELECT_ALL__')) {
            setCardSelection([]);
            return;
        }
    
        // Find every card that belongs to the chosen answers
        const idsToEnable = cardArray
            .filter(card => selectedValues.includes(card.answer))
            .map(card => card.img_src);

        setCardSelection(idsToEnable); 
        // This replaces the set, immediately removing cards not in these subjects
    };




        
    return (
        <form className="flex flex-row items-center justify-end w-[50%] p-1">
            <label htmlFor="cards-select" className="
                flex
                text-center
                p-1
                text-white 
                bg-blue-500 
                outline-blue-500
                outline
                h-8
                w-[40%]
            ">Cards</label>
            <select 
                id="cards-select"
                multiple 
                size="1"
                className="
                hide-selected-count 
                p-1
                outline-blue-500
                outline
                h-8
                w-[90%]
                "
                value={cardAnswers.filter
                        (answer => 
                            cardArray.some(c => c.answer === answer && selectedCardIds.has(c.img_src))
                        )
                    }

                onChange={handleSelectionChange}
            >
                <option value="__SELECT_ALL__">Select All</option>
                <option value="__DESELECT_ALL__">Deselect All</option>
                {cardAnswers.map(answer => (
                    <option key={answer} value={answer}>
                        {answer}
                    </option>
                ))}
            </select>
        </form>
    );
}
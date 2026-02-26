import { useState } from 'react'
export default function LabDeckSelector({ onSelection }){
    
    const moduleLinks = {
        'Skull': './skull_questions_restructured.json'
    }

    const [curLink, setCurLink] = useState('')

    // const selectLink = (selection) => {
    //     setCurLink(selection);
    // }

    const handleSelection = (e) => {
        const selectedModule = e.target.value;
        if (!selectedModule) return;
        const link = moduleLinks[selectedModule]

        onSelection(link);
    }

    return (
        <>
            <label htmlFor="deck-select" className="
                flex
                text-center
                p-1
                text-white 
                bg-blue-500 
                outline-blue-500
                outline
                h-8
                w-[30%]
            ">Deck</label>
            <select
                id="deck-select"
                defaultValue=""
                onChange={handleSelection}
                className="hide-selected-count 
                        p-1
                        outline-blue-500
                        outline
                        h-8
                        ml-0
                        mr-0
                        w-[30%]">
                <option value="" disabled></option>
                {/* Generates an option in the select menu for each key */}
                {Object.keys(moduleLinks).map(name => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))
                }
            </select>
        </>
    )
    
}


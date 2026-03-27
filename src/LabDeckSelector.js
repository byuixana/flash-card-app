import { useEffect, useState } from 'react'

const moduleLinks = {
    'Prefixes': './Prefixes.json',
    'Suffixes': './Suffixes.json'
}

const moduleNames = Object.keys(moduleLinks)

export default function LabDeckSelector({ onSelection }){
    const [selectedModule, setSelectedModule] = useState(moduleNames[0] ?? '')

    // const selectLink = (selection) => {
    //     setCurLink(selection);
    // }

    useEffect(() => {
        if (!selectedModule) return;
        onSelection(moduleLinks[selectedModule]);
    }, [onSelection, selectedModule]);

    const handleSelection = (e) => {
        setSelectedModule(e.target.value);
    }

    return (
        <div className="flex flex-row items-center justify-start w-full sm:w-3/5 p-1 min-w-0">
            <label htmlFor="deck-select" className="
                flex
                items-center
                justify-center
                text-center
                text-sm sm:text-base
                whitespace-nowrap
                p-1
                text-white 
                bg-blue-500 
                outline-blue-500
                outline
                h-7 sm:h-8
                w-[36%] sm:w-[38%]
            ">Select a Deck</label>
            <select
                id="deck-select"
                value={selectedModule}
                onChange={handleSelection}
                className="hide-selected-count 
                        text-sm sm:text-base
                        p-1
                        outline-blue-500
                        outline
                        h-7 sm:h-8
                        ml-0
                        mr-0
                        w-[64%] sm:w-[62%]
                        min-w-0">
                {/* Generates an option in the select menu for each key */}
                    {moduleNames.map(name => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))
                }
            </select>
        </div>
    )
    
}


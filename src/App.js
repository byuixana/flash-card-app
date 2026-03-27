/**
 * Main application component for the flashcard app.
 * Manages deck loading, card shuffling, and renders the main UI.
 *
 * @returns {JSX.Element} The main flashcard application
 */

import {useState, useEffect} from 'react'
import { useFlashcardContext } from './context/FlashcardContext.js';
import FlashcardContextProvider from './context/FlashcardContext.js';
import CardList from './CardList.js';
import {shuffleCards, addFlags} from './utils/cardProcessing.js'
import Filter from './Filter.js'
import LabDeckSelector from './LabDeckSelector.js';


function AppContent() {

  const { setCardArray } = useFlashcardContext();
  
  const [isLoading, setIsLoading] = useState(true);

  const [link, setLink] = useState('');

  // const link = "./skull_questions_restructured.json"
  
  useEffect(() => {
    console.log('Link in', link)
    if (!link) return;

    let isCancelled = false;
    setIsLoading(true);

    fetch(link)
    .then(response => response.json())
    .then(data => {
      if (isCancelled) return;
      const cardArray = Object.values(data);
      const shuffledCardArray = shuffleCards(cardArray);
      addFlags(shuffledCardArray);
      setCardArray(shuffledCardArray);
      setIsLoading(false);
    })
    .catch(error => {
      if (isCancelled) return;
      console.error("Error fetching data:", error);
      setIsLoading(false);
    });

    return () => {
      isCancelled = true;
    };
  }, [setCardArray, link]);

  return (
    <>
      <div className='flex 
        justify-center items-center
        bg-blue-200
        p-4
        shadow-md'> 
        <h1 className='text-center text-3xl font-bold m-4 w-screen md:w-screen lg:w-screen sm:w-screen'>Bio 264 Flashcards</h1>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center w-[92vw] max-w-[480px]">
        <LabDeckSelector onSelection={setLink} />
        <Filter />
      </div>
      
      {isLoading ? (
        <div>Loading flashcards...</div>
      ) : (
        <CardList section="" />
      )}
    </>
  );
}

function App() {
  return (
    <div className='flex flex-col 
    w-screen h-full 
    max-w-fit
    max-h-fit
    items-center'>
      <FlashcardContextProvider>
        <AppContent />
      </FlashcardContextProvider>
    </div>
  );
}

export default App;

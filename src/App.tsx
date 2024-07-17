import { useCallback, useEffect, useState } from "react";
import words from "./wordList.json"
import { HangmanDrawing } from "./components/HangmanDrawing";
import { HangmanWord } from "./components/HangmanWord";
import { Keyboard } from "./components/Keyboard";
import { isVisible } from "@testing-library/user-event/dist/utils";
import MessageComponent from "./components/MessageComponents";




function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}


function App() {

  const [wordToGuess, setWordToGuess] = useState(getWord())

  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const inCorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  const isLoser = inCorrectLetters.length >= 6
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback( //guessedLetters değişirse, addGuessedLetter değişir ve fonksiyon çalışır
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return

      setGuessedLetters(currentLetters => [...currentLetters, letter])
    }, [guessedLetters, isWinner, isLoser])

  console.log(guessedLetters)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }
    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }

  }, [guessedLetters])

  //Enter'a basınca sayfa yenileme
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }
    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])


  function handleRefresh() {
    window.location.reload();
  }







  return (
    <div style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto",
      alignItems: "center"
    }}>
      <div style={{ fontSize: "rem", textAlign: "center" }}>
        {isWinner && <MessageComponent message="Winner!! - Refresh to try again" />}
        {isLoser && <MessageComponent message="Nice Try! - Refresh to try again" />}

        {(isWinner || isLoser) && <button
          style={{
            backgroundColor: 'blue',
            color: 'white',
            fontSize: '40px',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            margin: '10px',
            position: 'fixed', /* Sayfanın altında sabit kalacak */
            bottom: '20px', /* Sayfanın altından 20px yukarıda olacak */
            left: '50%', /* Sayfanın ortasına gelecek */
            transform: 'translateX(-50%)', /* Yatayda merkez alacak */
          }} onClick={handleRefresh}
        >
          Refresh
        </button>}
      </div>


      <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={inCorrectLetters}
          addGuessedLetter={addGuessedLetter}


        />
      </div>

    </div>
  );
}

export default App;

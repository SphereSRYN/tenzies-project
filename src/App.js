import React, { useEffect, useState } from "react";
import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";
import "tailwindcss/tailwind.css";
/**
 * Challenge:
 *
 * Write a function (allNewDice) that returns an array
 * of 10 random numbers between 1-6 inclusive.
 *
 * Log the array of numbers to the console for now
 */
/**
 * Challenge:
 *
 * Create state to hold our array of numbers. (Initialize
 * the state by calling our `allNewDice` function so it
 * loads all new dice as soon as the app loads)
 *
 * Map over the state numbers array to generate our array
 * of Die elements and render those in place of our
 * manually-written 10 Die elements.
 */
/**
 * Challenge: Update the array of numbers in state to be
 * an array of objects instead. Each object should look like:
 * { value: <random number>, isHeld: false }
 *
 * Making this change will break parts of our code, so make
 * sure to update things so we're back to a working state
 */

/**
 * Challenge: Create a function `holdDice` that takes
 * `id` as a parameter. For now, just have the function
 * console.log(id).
 *
 * Then, figure out how to pass that function down to each
 * instance of the Die component so when each one is clicked,
 * it logs its own unique ID property. (Hint: there's more
 * than one way to make that work, so just choose whichever
 * you want)
 *
 */

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  /**
   * Challenge:
   * 1. Add new state called `tenzies`, default to false. It
   *    represents whether the user has won the game yet or not.
   * 2. Add an effect that runs every time the `dice` state array
   *    changes. For now, just console.log("Dice state changed").
   */
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      const modal = document.querySelector(".alert");
      modal.style.display = "block";
      console.log("You won!");
    }

    /**
     * let allHeld = dice.filter(elem => !elem.isHeld ? elem : "");
      let allSameValue = dice.filter(elem => dice[0].value !== elem.value);
      if(allHeld.length ===0 && allSameValue.length === 0){
      setTenzies(true);
            console.log("You won!");
      }
    */
  }, [dice]);

  /**
   * Challenge: Tie off loose ends!
   * 1. If tenzies is true, Change the button text to "New Game"
   * 2. If tenzies is true, use the "react-confetti" package to
   *    render the <Confetti /> component 🎉
   *
   *    Hint: don't worry about the `height` and `width` props
   *    it mentions in the documentation.
   */

  /**
   * Challenge: Check the dice array for these winning conditions:
   * 1. All dice are held, and
   * 2. all dice have the same value
   *
   * If both conditions are true, set `tenzies` to true and log
   * "You won!" to the console
   */

  function generateNewdie() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false,
    };
  }

  function allNewDice() {
    let diceArray = new Array(10);
    for (let index = 0; index < diceArray.length; index++) {
      // let number = Math.ceil(Math.random() * 6);
      diceArray[index] = generateNewdie();
    }
    return diceArray;
    /** 
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6));
    }
    return newDice;
    */
  }

  /**
   * Challenge: Update the `holdDice` function to flip
   * the `isHeld` property on the object in the array
   * that was clicked, based on the `id` prop passed
   * into the function.
   *
   * Hint: as usual, there's > 1 way to accomplish this.
   * I'll be using `dice.map()` and checking for the `id`
   * of the die to determine which one to flip `isHeld` on,
   * but you can do whichever way makes the most sense to you.
   */
  function holdDice(clickedId) {
    /**  let newDiceArray = [];
    dice.map((elem, index) => {
      if (elem.id !== clickedId) {
        newDiceArray.push(elem);
      } else {
        let { isHeld, ...lefts } = elem;
        newDiceArray.push({ ...lefts, isHeld: !isHeld });
      }
      return newDiceArray;
    });
    setDice(newDiceArray);*/

    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === clickedId ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  /**
   * Challenge: Update the `rollDice` function to not just roll
   * all new dice, but instead to look through the existing dice
   * to NOT role any that are being `held`.
   *
   * Hint: this will look relatively similiar to the `holdDice`
   * function below. When creating new dice, remember to use
   * `id: nanoid()` so any new dice have an `id` as well.
   */

  function reRoll() {
    setDice((prevDice) =>
      prevDice.map((dice) => {
        //let number = Math.ceil(Math.random() * 6);
        return dice.isHeld ? dice : generateNewdie();
      })
    );
  }

  function newGame() {
    setTenzies(false);
    setDice(allNewDice());
    const modal = document.querySelector(".alert");
    modal.style.display = "none";
  }

  const diceElements = dice.map((diceNum, index) => {
    return (
      <Die
        key={diceNum.id}
        value={diceNum.value}
        isHeld={diceNum.isHeld}
        diceId={diceNum.id}
        // holdDice={holdDice}
        holdDice={() => holdDice(diceNum.id)}
      />
    );
  });

  const alertStyle = {
    position: "absolute",
    top: "100px",
    left: "300px",
    width: "10%",
    height: "100 %",
    display: "none",
  };
  return (
    <main data-theme="aqua">
      {tenzies && <ReactConfetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{diceElements}</div>
      {tenzies === false ? (
        <button
          type="button"
          class="btn btn-outline btn-primary"
          onClick={tenzies ? newGame : reRoll}
        >
          {/* {tenzies ? "New Game" : "roll"} */}
          roll
        </button>
      ) : (
        ""
      )}

      <div class="alert shadow-lg" style={alertStyle}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-info flex-shrink-0 w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <h3 class="text-xs">New message!</h3>
            <div class="font-bold">You one the game!</div>
          </div>
        </div>
        <br />
        <div class="flex-none">
          &nbsp;&nbsp; &nbsp; &nbsp;
          <button class="btn btn-sm" onClick={tenzies ? newGame : reRoll}>
            new game?
          </button>
        </div>
      </div>
    </main>
  );
}

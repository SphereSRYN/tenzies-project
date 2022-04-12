import React from "react";
/**
 * Challenge:
 *
 * - Create a Die component that takes a `value` prop
 * - Render 10 instances of the Die component (manually)
 *      - Provide a number between 1-6 for the value on each
 *        for now
 * - Style the <main> and <Die> components
 *   to look like they do in the slide
 *      - Hints: Create a container to hold the 10 instances
 *        of the Die component, and use CSS Grid to lay them
 *        out evenly in 2 rows of 5 columns
 *      - Use flexbox on main to center the dice container
 *        in the center of the page
 */
/**
 * Challenge: Add conditional styling to the Die component
 * so that if it's held (isHeld === true), its background color
 * changes to a light green (#59E391)
 *
 * Remember: currently the Die component has no way of knowing
 * if it's "held" or not.
 */
export default function Die({ value, isHeld, diceId, holdDice }) {
  const styles = {
    backgroundColor: isHeld ? "#62ddff" : "white",
    color: isHeld ?? "white",
  };

  // function hold() {
  //   holdDice(diceId);
  // }

  return (
    <div
      className="die-face"
      style={styles}
      /**  onClick={hold}*/
      onClick={holdDice}
    >
      <div className="die-num">{value}</div>
    </div>
  );
}

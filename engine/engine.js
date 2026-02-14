// engine.js

// Safe shuffle
export function shuffle(arr) {
  if (!Array.isArray(arr)) {
    console.error("Shuffle received non-array:", arr);
    return [];
  }

  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

// Helpers
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function findByNumber(players, num) {
  return players.find((p) => p.number === num);
}

// Generate a math question from a team list
export function generateQuestion(players, difficulty = "Easy") {
  if (!Array.isArray(players) || players.length < 3) {
    throw new Error("generateQuestion requires at least 3 players");
  }

  // Pick the answer first so it is always real
  const answerPlayer = randomItem(players);
  const answerValue = answerPlayer.number;

  // Difficulty operator rules
  let operatorPool = ["+", "-"];
  if (difficulty === "Medium" || difficulty === "Hard") {
    operatorPool = ["+", "-", "×", "÷"];
  }

  // Hard must always use 3 players, others use 2
  const operandCount = difficulty === "Hard" ? 3 : 2;

  // Try multiple times to build a valid equation
  for (let attempt = 0; attempt < 400; attempt++) {
    const operator = randomItem(operatorPool);

    // ---------- ADDITION ----------
    if (operator === "+") {
      // p1 + p2 (+ p3) = answerValue
      const chosen = [];
      let sum = 0;

      for (let i = 0; i < operandCount - 1; i++) {
        const p = randomItem(players);
        chosen.push(p);
        sum += p.number;
      }

      const needed = answerValue - sum;
      const last = findByNumber(players, needed);

      if (!last) continue;
      if (chosen.some((p) => p.number === last.number)) continue;

      return {
        players: [...chosen, last],
        operator: "+",
        answerPlayer
      };
    }

    // ---------- SUBTRACTION ----------
    if (operator === "-") {
      if (operandCount === 2) {
        // p1 - p2 = answerValue  =>  p2 = p1 - answerValue
        const p1 = randomItem(players);
        const needed = p1.number - answerValue;
        if (needed < 0) continue;

        const p2 = findByNumber(players, needed);
        if (!p2) continue;
        if (p1.number === p2.number) continue;

        return {
          players: [p1, p2],
          operator: "-",
          answerPlayer
        };
      }

      // HARD: p1 - p2 - p3 = answerValue  =>  p1 = answerValue + p2 + p3
      const p2 = randomItem(players);
      const p3 = randomItem(players);
      if (p2.number === p3.number) continue;

      const needed = answerValue + p2.number + p3.number;
      const p1 = findByNumber(players, needed);
      if (!p1) continue;

      if (p1.number === p2.number || p1.number === p3.number) continue;

      return {
        players: [p1, p2, p3],
        operator: "-",
        answerPlayer
      };
    }

    // ---------- MULTIPLICATION ----------
    if (operator === "×") {
      // p1 × p2 (× p3) = answerValue
      const chosen = [];
      let product = 1;

      for (let i = 0; i < operandCount - 1; i++) {
        const p = randomItem(players);

        // avoid multiplying by 0 to keep it workable
        if (p.number === 0) continue;

        chosen.push(p);
        product *= p.number;
      }

      if (product === 0) continue;
      if (answerValue % product !== 0) continue;

      const needed = answerValue / product;
      const last = findByNumber(players, needed);

      if (!last) continue;
      if (chosen.some((p) => p.number === last.number)) continue;

      return {
        players: [...chosen, last],
        operator: "×",
        answerPlayer
      };
    }

    // ---------- DIVISION ----------
    if (operator === "÷") {
      if (operandCount === 2) {
        // p1 ÷ p2 = answerValue  =>  p1 = answerValue * p2
        const p2 = randomItem(players);
        if (p2.number === 0) continue;

        const needed = answerValue * p2.number;
        const p1 = findByNumber(players, needed);

        if (!p1) continue;
        if (p1.number === p2.number) continue;

        return {
          players: [p1, p2],
          operator: "÷",
          answerPlayer
        };
      }

      // HARD: p1 ÷ p2 ÷ p3 = answerValue  =>  p1 = answerValue * p2 * p3
      const p2 = randomItem(players);
      const p3 = randomItem(players);

      if (p2.number === 0 || p3.number === 0) continue;
      if (p2.number === p3.number) continue;

      const needed = answerValue * p2.number * p3.number;
      const p1 = findByNumber(players, needed);

      if (!p1) continue;
      if (p1.number === p2.number || p1.number === p3.number) continue;

      return {
        players: [p1, p2, p3],
        operator: "÷",
        answerPlayer
      };
    }
  }

  // Fallback: always valid if possible (2-player addition)
  for (let i = 0; i < 300; i++) {
    const p1 = randomItem(players);
    const needed = answerValue - p1.number;
    const p2 = findByNumber(players, needed);
    if (p2 && p1.number !== p2.number) {
      return { players: [p1, p2], operator: "+", answerPlayer };
    }
  }

  // Last resort
  return {
    players: [players[0], players[1]],
    operator: "+",
    answerPlayer: players[2]
  };
}

// Validate the guess
export function validateAnswer(guess, correctName) {
  if (!guess) return false;
  return guess.trim().toLowerCase() === correctName.trim().toLowerCase();
}

'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
// This function enables us to see what numbers are on what stack.
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
// This function should move the piece, from stack to stack.
const movePiece = (from, to) => {
  // Your code here
  const piece = stacks[from].pop();
  stacks[to].push(piece);

}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
// To check if your move is valid. Larger can't be stacked on smaller. 3 cannot be stacked on 2.
const isLegal = (from, to) => {
  // Your code here
  let stackFrom = stacks[from];
  let stackTo = stacks[to];
  // try {

  if (stackFrom[from.length - 1] > stackTo[to.length - 1]) {
      // throw "Not allowed!";
      return false;
  } else {
      return true;
    }
// }   catch(err) {
//   console.error(err);
//   event.preventDefault();
// }
// finally {
//   return (stackFrom, stackTo);
// }

}

// What is a win in Towers of Hanoi? When should this function run?
// A win is when all the towers are arranged from smallest to largest (top down). We can run this function after every move.
// Or we can run this after a certain number of moves
const checkForWin = () => {
  // Your code here

  if (stacks['b'].length == 4) {
    return true;
  } else {
    return false;
  }

}

// When is this function called? What should it do with its argument?
// This function is called when you're moving pieces from stack to stack. 
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  
  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack);
    if (checkForWin()) {
      console.log('You won! Great work!')
    }
  } else {
    console.log('Not allowed! Larger piece cannot be moved on top of smaller piece');
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}

function dotsAndBoxes(moves){
    
    let changePlayer = true;
    const dimension = gridSizeDeterminer(moves);
    const boxIds = getPossibleBoxIdsForDimension(dimension);

    const boxesThing = {};
    for (let id of boxIds) {
        boxesThing[id] = { top: false, bottom: false, left: false, right: false }
    }

    const state = {
        playersTurn: 1,
        boxes: boxesThing,
        score: {
            "Player 1": 0,
            "Player 2": 0
        }
    }

    for (let move of moves) {
        updateState(move, dimension, state);
    }
    return [state.score["Player 1"], state.score["Player 2"]];
}

/**
 * Given a grid dimension, determines what the top left values of each of the potential boxes could be for this game
 * Returns an array. Numbers in the array are potential boxes contributed to by that line
 */
function getPossibleBoxIdsForDimension(dimension) {
    possibleBoxes = [];
    let j;
    for (j = 0; j < (dimension * dimension); j++) {
        if (
            !(
                (
                    (((dimension * dimension)-dimension) <= j) 
                    && 
                    (j < (dimension * dimension))
                ) || (
                    Number.isInteger((j + 1)/dimension)
                )
            )
        ){
            possibleBoxes.push(j);
        }
    }
    return possibleBoxes;
};

/**
 * Takes the input array and determines the grid size
 * e.g. returns 3 if grid is 3x3 dots
 */
function gridSizeDeterminer(array) {
    return (2+Math.sqrt((4+(8*array.length))))/4; 
};

/**
 * Takes a tuple and determines if the line is vertical or horizontal
 */
function vertOrHorizChecker([a,b]) {
    return Math.abs(a-b) === 1 ? "Horizontal" : "Vertical"
};

/**
 * Given a tuple and the grid dimension, determines what the top left values of each of the potential boxes could be for a given line input
 * Returns an array. Numbers in the array are potential boxes contributed to by that line
 */
function determineContributionToWhichBoxes([a,b], dimension) {
    switch (vertOrHorizChecker([a,b])) {
        case "Vertical":
            return [
                Number.isInteger((Math.min(a,b) + 1)/dimension)
                    ?"empty"
                    :Math.min(a,b), 
                Number.isInteger(Math.min(a,b)/dimension) 
                    ?"empty" 
                    :(Math.min(a,b)-1)
            ].filter(x => x !== "empty");

        case "Horizontal":
            return [
                Math.min(a,b) >= dimension*(dimension - 1)
                    ?"empty"
                    :Math.min(a,b), 
                Math.min(a,b) < dimension
                    ?"empty" 
                    :(Math.min(a,b)-dimension)
            ].filter(x => x !== "empty");
    }
};

/**
 * Given a tuple line input and the grid dimension, determines which sides of the relevant boxes are filled in
 * Returns an array. Numbers in the array are sides constructed by that line
 */
function determineContributionToWhichSides([a,b], dimension) {
    switch (vertOrHorizChecker([a,b])) {
        case "Vertical":
            return [
                Number.isInteger((Math.min(a,b) + 1)/dimension)
                    ?"empty"
                    :"left", 
                Number.isInteger(Math.min(a,b)/dimension) 
                    ?"empty" 
                    :"right"
            ].filter(x => x !== "empty");

        case "Horizontal":
            return [
                Math.min(a,b) >= dimension*(dimension - 1)
                    ?"empty"
                    :"top", 
                Math.min(a,b) < dimension
                    ?"empty" 
                    :"bottom"
            ].filter(x => x !== "empty");
    }
};

/**
 * Given the current state and a box id, returns true if that box has lines on all four sides
 */
function isComplete(box, state) {
    return state.boxes[box].top && state.boxes[box].left && state.boxes[box].right && state.boxes[box].bottom;
};

/**
 * Given the current state, the game dimension and a tuple line input, updates the state based on the results of that line being played 
 */
function updateState(tuple, dimension, state) {
    let updatedBoxes = determineContributionToWhichBoxes(tuple, dimension);
    let updatedSides = determineContributionToWhichSides(tuple, dimension);
    let changePlayer = true;

    let i;    
    for (i = 0; i < updatedBoxes.length; i++) {
        state.boxes[updatedBoxes[i]][updatedSides[i]] = true;
        if (isComplete(updatedBoxes[i], state)) {
            state.score["Player " + state.playersTurn] ++
            changePlayer = false;
        } 
    }
    if (changePlayer) {
        state.playersTurn = 3 - state.playersTurn;
    }
};

function ignoreRandomStuff() {
    const dimension = 4;
    const boxesThing = {};
    const boxIds = [0, 1, 2, 4, 5, 6, 8, 9, 10];

    for (let id of boxIds) {
        boxesThing[id] = { top: false, bottom: false, left: false, right: false }
    }

    const state = {
        playersTurn: 1,
        boxes: boxesThing,
        score: {
            "Player 1": 0,
            "Player 2": 0
        }
    }

    const id = "height"

    const foo = {}
    foo[id] = 165
    foo.height = 165
    foo["height"] = 165
    foo[aFunction()] = 165


    function aFunction() {
        return "height"
    }

    const newFoo = {
        height: 165,
        likes: {
            "coffee": 0.9,
            "mushrooms": 0.3
        }
    }




    function demonstratePlusplus() {
        let foo = 0;

        console.log(++foo)
        console.log(foo)

        const arr = [ 1, 2, 3 ]
        let x = 0;
        while (x < arr.length) {
            arr[++x] *= 2;
        }
    }
}
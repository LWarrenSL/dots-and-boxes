function dotsAndBoxes(moves) {
    const dimension = gridSizeDeterminer(moves);
    const boxIds = getPossibleBoxIdsForDimension(dimension);

    const boxSides = {};
    for (let id of boxIds) {
        boxSides[id] = { top: false, bottom: false, left: false, right: false }
    }

    const state = {
        playersTurn: 1,
        boxes: boxSides,
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

function range(fromInclusive, toExclusive) {
    const arr = new Array(toExclusive - fromInclusive);

    for (let i = 0; i < arr.length; i++) {
        arr[i] = i + fromInclusive;
    }

    return arr;
}

/**
 * Given a grid dimension, determines what the top left values of each of the potential boxes could be for this game
 * Returns an array. Numbers in the array are potential boxes contributed to by that line
 */
function getPossibleBoxIdsForDimension(dimension) {
    return range(0, dimension * dimension)
        .filter(j => !Number.isInteger((j + 1) / dimension)) // Exclude right column of grid
        .filter(j => !(
            (
                (((dimension * dimension) - dimension) <= j) // Exclude bottom row of grid
            )
        ))
}

/**
 * Takes the input array and determines the grid size
 * e.g. returns 3 if grid is 3x3 dots
 */
function gridSizeDeterminer(array) {
    return (2 + Math.sqrt((4 + (8 * array.length)))) / 4; 
};

/**
 * Takes a tuple and determines if the line is vertical or horizontal
 */
function vertOrHorizChecker([a, b]) {
    return Math.abs(a - b) === 1 ? "Horizontal" : "Vertical"
};

/**
 * Given a tuple and the grid dimension, determines what the top left values of each of the potential boxes could be for a given line input
 * Determines which sides correspond to each potential box
 * Returns an array. Each element in the array is an object with two properties and corresponding values. These are the
 * box number and the filled in side of that box
 */
function determineContributionToBoxes([a, b], dimension) {
    const contributions = [];
    switch (vertOrHorizChecker([a, b])) {
        case "Vertical":
            if (!Number.isInteger((Math.min(a, b) + 1) / dimension)) {
                contributions.push({
                    box: Math.min(a, b),
                    side: "left"
                })
            }
            if (!Number.isInteger(Math.min(a, b) / dimension)) {
                contributions.push({
                    box: Math.min(Math.min(a, b) - 1),
                    side: "right"
                })
            } 
            break;
        case "Horizontal":
            if (Math.min(a, b) < dimension * (dimension - 1)) {
                contributions.push({
                    box: Math.min(a, b),
                    side: "top"
                })
            }
            if (Math.min(a, b) >= dimension) {
                contributions.push({
                    box: Math.min(a, b) - dimension,
                    side: "bottom"
                })
            }
            break;
    }
    return contributions;
};

/**
 * Given the current state and a box id, returns true if that box has lines on all four sides
 */
function isComplete(box) {
    return box.top && box.left && box.right && box.bottom;
};

/**
 * Given the current state, the game dimension and a tuple line input, updates the state based on the results of that line being played 
 */
function updateState(move, dimension, state) {
    let updatedBoxes = determineContributionToBoxes(move, dimension);
    let changePlayer = true;
 
    for (let i = 0; i < updatedBoxes.length; i++) {
        const boxId = updatedBoxes[i].box;
        const box = state.boxes[boxId];

        box[updatedBoxes[i].side] = true;
        if (isComplete(box)) {
            state.score["Player " + state.playersTurn] ++
            changePlayer = false;
        } 
    }
    if (changePlayer) {
        state.playersTurn = 3 - state.playersTurn;
    }
}

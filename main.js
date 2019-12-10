function dotsAndBoxes(moves){
    const dimension = gridSizeDeterminer(moves);


    const boxIds = getPossibleBoxIdsForDimension(dimension)
    // [0, 1, 3, 4]

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

    }
}
    
function gridSizeDeterminer(array) {
    // Takes the input array and determines the grid size
    // e.g. returns 3 if grid is 3x3 dots
    return (((4+(8*array.length))^0.5)+2)/4 
}

function playerSwitchChecker(tuple) {
    // Checks if we need to switch players
    // If no box is made then it switches; if a box is made it does not switch
    // Returns true or false
    return boxCompletionChecker(tuple) !== true
}

function vertOrHorizChecker([a,b]) {
    // Takes a tuple and determines if the line is vertical or horizontal
    return Math.abs(a-b) === 1 ? "Horizontal" : "Vertical"
}

/**
 * Given a tuple and the grid dimension, determines what the top left values of each of the potential boxes could be
 * Returns an array. Numbers in the array are potential boxes contributed to by that line
 */
function contributesToWhichBoxesDeterminer([a,b], dimension) {
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
}

function whichSidesOfTheBoxDeterminer([a,b], dimension) {
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
}

function isComplete(box) {
    return box.top && box.left && box.right && box.bottom;
}

function updateBoxesInfo() {
    const updatedBoxes = contributesToWhichBoxesDeterminer(tuple, dimension)
    const updatedSides = whichSidesOfTheBoxDeterminer(tuple, dimension)

let i    
    for (i = 0; i < updatedBoxes.length; i++) {
        state.boxes.updatedBoxes(i).updatedSides(i) = true;

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




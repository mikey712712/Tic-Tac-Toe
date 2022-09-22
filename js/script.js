// gameData stores all of the information to render the different game modes of the app. Information
const gameData = {
    "3 x 3": {
        squarePerLine: 3,
        desktopContainerWidth: "50vh",
        desktopContainerHeight: "50vh",
        mobileContainerWidth: "45vh",
        mobileContainerHeight: "45vh",

        winConditions: {
            row1: [1, 2, 3],
            row2: [4, 5, 6],
            row3: [7, 8, 9],
            col1: [1, 4, 7],
            col2: [2, 5, 8],
            col3: [3, 6, 9],
            diag1: [1, 5, 9],
            diag2: [3, 5, 7],
        },
    },

    "4 x 4": {
        squarePerLine: 4,
        desktopContainerWidth: "60vh",
        desktopContainerHeight: "60vh",
        mobileContainerWidth: "45vh",
        mobileContainerHeight: "45vh",

        winConditions: {
            row1: [1, 2, 3, 4],
            row2: [5, 6, 7, 8],
            row3: [9, 10, 11, 12],
            row4: [13, 14, 15, 16],
            col1: [1, 5, 9, 13],
            col2: [2, 6, 10, 14],
            col3: [3, 7, 11, 15],
            col4: [4, 8, 12, 16],
            diag1: [1, 6, 11, 16],
            diag2: [4, 7, 10, 13],
        },
    },

    "5 x 5": {
        squarePerLine: 5,
        desktopContainerWidth: "65vh",
        desktopContainerHeight: "65vh",
        mobileContainerWidth: "45vh",
        mobileContainerHeight: "45vh",

        winConditions: {
            row1: [1, 2, 3, 4, 5],
            row2: [6, 7, 8, 9, 10],
            row3: [11, 12, 13, 14, 15],
            row4: [16, 17, 18, 19, 20],
            row5: [21, 22, 23, 24, 25],
            col1: [1, 6, 11, 16, 21],
            col2: [2, 7, 12, 17, 22],
            col3: [3, 8, 13, 18, 23],
            col4: [4, 9, 14, 19, 24],
            col5: [5, 10, 15, 20, 25],
            diag1: [1, 7, 13, 19, 25],
            diag2: [5, 9, 13, 17, 21],
        },
    },

    "Connect 4": {
        squarePerLine: 5,
        desktopContainerWidth: "65vh",
        desktopContainerHeight: "65vh",
        mobileContainerWidth: "45vh",
        mobileContainerHeight: "45vh",

        winConditions: {
            row1: [1, 2, 3, 4],
            row2: [6, 7, 8, 9],
            row3: [11, 12, 13, 14],
            row4: [16, 17, 18, 19],
            row5: [21, 22, 23, 24],
            row6: [2, 3, 4, 5],
            row7: [7, 8, 9, 10],
            row8: [12, 13, 14, 15],
            row9: [17, 18, 19, 20],
            row10: [22, 23, 24, 25],
            col1: [1, 6, 11, 16],
            col2: [2, 7, 12, 17],
            col3: [3, 8, 13, 18],
            col4: [4, 9, 14, 19],
            col5: [5, 10, 15, 20],
            col6: [6, 11, 16, 21],
            col7: [7, 12, 17, 22],
            col8: [8, 13, 18, 23],
            col9: [9, 14, 19, 24],
            col10: [10, 15, 20, 25],
            diag1: [1, 7, 13, 19],
            diag2: [5, 9, 13, 17],
            diag3: [7, 13, 19, 25],
            diag4: [9, 13, 17, 21],
            diag5: [6, 12, 18, 24],
            diag6: [2, 8, 14, 20],
            diag7: [16, 12, 8, 4],
            diag8: [22, 18, 14, 10],
        },

        insertLines: {
            line1: [1, 6, 11, 16, 21],
            line2: [2, 7, 12, 17, 22],
            line3: [3, 8, 13, 18, 23],
            line4: [4, 9, 14, 19, 24],
            line5: [5, 10, 15, 20, 25],
        },
    },
}

const body = document.querySelector("body")
const header = document.querySelector("header")
const gameContainer = document.querySelector(".game-container")
const outerContainer = document.querySelector(".outer-container")
const gridSizeSelectors = document.querySelectorAll(".grid-size-selector")
const gridSizeDiv = document.querySelector("#grid-size")
const dropDown = document.querySelector("#dropdown-icon")
const plug = document.querySelector("#plug")
const botSwitchDiv = document.querySelector(".bot-option")
const botSwitch = document.querySelector("#bot-mode")
const winTextDiv = document.querySelector(".win-text")
const scoreDiv = document.querySelector(".win-container")
const xScore = document.querySelector("#p1score")
const oScore = document.querySelector("#p2score")
const blockScreenDiv = document.createElement("div")
blockScreenDiv.setAttribute("id", "blocker")

const restartButton = document.createElement("button")
restartButton.type = "button"
restartButton.classList.add("restart")
restartButton.classList.add("win")
restartButton.innerHTML = '<img id="reset" src="./images/reset.png">Restart'

const cross = `<img id="cross" class="shape" src="./images/cross.png">`
const circle = `<img id="circle" class="shape" src="./images/circle.png">`
const crossPreview = `<img src="./images/cross.png" class="preview">`
const circlePreview = `<img src="./images/circle.png" class="preview">`
let crossSlots = []
let circleSlots = []
let botMode = false

let currentGridSize = "3 x 3"
let lineSize = 3
let turn = 0
let crossPoints = 0
let circlePoints = 0

const winAnimation1 = (target) => {
    target.classList.toggle("animation")
}
const winAnimation2 = (target) => {
    target.classList.toggle("animation")
}

const blockScreen = () => {
    console.log("h1")
    body.appendChild(blockScreenDiv)
}

const unBlockScreen = () => {
    const blockerDiv = document.querySelector("#blocker")
    blockerDiv.remove()
}

const winScreen = (winner) => {
    const winnerText = document.createElement("p")
    winnerText.classList.add("win")
    if (winner === "draw") {
        winnerText.textContent = `It's a draw.`
    } else {
        winnerText.textContent = `${winner} wins!`
    }
    xScore.textContent = crossPoints
    oScore.textContent = circlePoints
    winTextDiv.appendChild(winnerText)
    winTextDiv.appendChild(restartButton)
    winTextDiv.style.opacity = 1
}

const botCheckBoard = () => {
    const winConditionsObject = gameData[currentGridSize].winConditions
    let choice = null
    for (let condition in winConditionsObject) {
        const requiredSlots = winConditionsObject[condition].length
        let circleCount = 0
        let crossCount = 0

        for (let slot of winConditionsObject[condition]) {
            if (circleSlots.includes(String(slot))) {
                circleCount++
            } else if (crossSlots.includes(String(slot))) {
                crossCount++
            }
        }
        if (circleCount === requiredSlots - 1 && botMode && turn % 2 !== 0 && turn < lineSize ** 2) {
            for (let slot of winConditionsObject[condition]) {
                const slotContent = document.querySelector(`[data-square-num = "${slot}"]`).innerHTML
                let slotBelowContent = "no"
                if (slot < lineSize ** 2 - lineSize) {
                    slotBelowContent = document.querySelector(`[data-square-num = "${slot + lineSize}"]`).innerHTML
                }
                if (!circleSlots.includes(String(slot)) && (slotContent === "" || slotContent === circlePreview || slotContent === crossPreview)) {
                    if (currentGridSize === "Connect 4" && (slotBelowContent !== "" || slotBelowContent === "no")) {
                        console.log("bot too smart")
                        document.querySelector(`[data-square-num = "${slot}"]`).click()
                        return
                    } else if (currentGridSize !== "Connect 4") {
                        console.log("bot too smart")
                        document.querySelector(`[data-square-num = "${slot}"]`).click()
                        return
                    }
                }
            }
        } else if (crossCount === requiredSlots - 1 && botMode && turn % 2 !== 0 && turn < lineSize ** 2) {
            for (let slot of winConditionsObject[condition]) {
                const slotContent = document.querySelector(`[data-square-num = "${slot}"]`).innerHTML
                let slotBelowContent = "no"
                if (slot < lineSize ** 2 - lineSize) {
                    slotBelowContent = document.querySelector(`[data-square-num = "${slot + lineSize}"]`).innerHTML
                }
                if (!crossSlots.includes(String(slot)) && (slotContent === "" || slotContent === circlePreview || slotContent === crossPreview)) {
                    if (currentGridSize === "Connect 4" && (slotBelowContent !== "" || slotBelowContent === "no")) {
                        choice = document.querySelector(`[data-square-num = "${slot}"]`)
                        console.log("BLOCKED LOL!")
                    } else if (currentGridSize !== "Connect 4") {
                        console.log("BLOCKED LOL!")
                        choice = document.querySelector(`[data-square-num = "${slot}"]`)
                    }
                }
            }
        }
    }
    if (choice !== null) {
        choice.click()
    } else {
        const slots = document.querySelectorAll(".game-slot")
        let availableSlots = []
        for (let slot of slots) {
            if (slot.innerHTML === "") {
                availableSlots.push(slot.dataset.squareNum)
            }
        }
        const botPick = availableSlots[Math.floor(Math.random() * availableSlots.length)]
        const botSlotChoice = document.querySelector(`[data-square-num = "${botPick}"]`)
        botSlotChoice.click()
    }
}

const checkForWin = () => {
    const winConditionsObject = gameData[currentGridSize].winConditions
    for (let condition in winConditionsObject) {
        const requiredSlots = winConditionsObject[condition].length
        let circleCount = 0
        let crossCount = 0

        for (let slot of winConditionsObject[condition]) {
            if (circleSlots.includes(String(slot))) {
                circleCount++
            } else if (crossSlots.includes(String(slot))) {
                crossCount++
            }
        }

        if (crossCount === requiredSlots || circleCount === requiredSlots) {
            for (let i = 1; i <= lineSize ** 2; i++) {
                const currSlot = document.querySelector(`[data-square-num = "${i}"]`)
                currSlot.removeEventListener("click", insertSymbol)
                currSlot.removeEventListener("mouseover", previewSymbol)
                currSlot.removeEventListener("mouseleave", unPreviewSymbol)
                currSlot.removeEventListener("click", insertSymbolConnect4)
                currSlot.removeEventListener("mouseover", previewSymbolC4)
                currSlot.removeEventListener("mouseleave", unPreviewSymbolC4)
            }

            if (crossCount === requiredSlots) {
                crossPoints += 1
                for (let slot of winConditionsObject[condition]) {
                    const currSlot = document.querySelector(`[data-square-num = "${slot}"]`).firstChild
                    setTimeout(() => winAnimation1(currSlot), 400)
                    setTimeout(() => winAnimation2(currSlot), 800)
                }
                setTimeout(() => winScreen("Cross"), 1400)
                return
            } else if (circleCount === requiredSlots) {
                circlePoints += 1
                for (let slot of winConditionsObject[condition]) {
                    const currSlot = document.querySelector(`[data-square-num = "${slot}"]`).firstChild
                    setTimeout(() => winAnimation1(currSlot), 400)
                    setTimeout(() => winAnimation2(currSlot), 800)
                }
                setTimeout(() => winScreen("Circle"), 1400)
                return
            }
        }
    }

    if (turn === lineSize ** 2) {
        winScreen("draw")
        return
    }
}

const insertSymbol = (event) => {
    if (turn % 2 === 0) {
        event.target.innerHTML = cross
        crossSlots.push(event.target.dataset.squareNum)
    } else {
        event.target.innerHTML = circle
        circleSlots.push(event.target.dataset.squareNum)
    }
    event.target.removeEventListener("click", insertSymbol)
    ticTacToeAnimation(event.target)
    turn++
    checkForWin()

    if (turn % 2 !== 0 && turn < lineSize ** 2 && botMode) {
        blockScreen()
        setTimeout(() => botCheckBoard(), 400)
        setTimeout(() => unBlockScreen(), 400)
    }
}

const connect4Animation = (target) => {
    target.firstChild.classList.toggle("connect-4")
    setTimeout(() => {
        target.firstChild.classList.toggle("connect-4")
    }, 50)
}

// // BOT V1 LOGIC (WEAK AF)
// const botChoice = () => {
//     const slots = document.querySelectorAll(".game-slot")
//     let availableSlots = []
//     for (let slot of slots) {
//         if (slot.innerHTML === "") {
//             availableSlots.push(slot.dataset.squareNum)
//         }
//     }
//     const botPick = availableSlots[Math.floor(Math.random() * availableSlots.length)]
//     const botSlotChoice = document.querySelector(`[data-square-num = "${botPick}"]`)
//     botSlotChoice.click()
// }

const ticTacToeAnimation = (target) => {
    target.firstChild.classList.toggle("tic-tac")
    setTimeout(() => {
        target.firstChild.classList.toggle("tic-tac")
    }, 100)
}

const insertSymbolConnect4 = (event) => {
    let currLine = null
    let addShapeSlot = ""
    targetNumId = event.target.dataset.squareNum

    for (let line in gameData[currentGridSize].insertLines) {
        const checkLine = gameData[currentGridSize].insertLines[line]
        if (checkLine.includes(Number(targetNumId))) {
            currLine = checkLine
            break
        }
    }

    const endOfLine = document.querySelector(`[data-square-num = "${currLine[4]}"]`)
    if (endOfLine.innerHTML === "" || endOfLine.innerHTML === circlePreview || endOfLine.innerHTML === crossPreview) {
        addShapeSlot = document.querySelector(`[data-square-num = "${currLine[4]}"]`)
    } else {
        for (let num of currLine) {
            const selectedSlot = document.querySelector(`[data-square-num = "${num}"]`)
            const slotContents = selectedSlot.firstChild
            if (slotContents !== null && slotContents.classList.contains("shape")) {
                addShapeSlot = document.querySelector(`[data-square-num = "${num - 5}"]`)
                break
            }
        }
    }

    if (turn % 2 === 0) {
        addShapeSlot.innerHTML = cross
        crossSlots.push(addShapeSlot.dataset.squareNum)
    } else {
        addShapeSlot.innerHTML = circle
        circleSlots.push(addShapeSlot.dataset.squareNum)
    }

    addShapeSlot.removeEventListener("click", insertSymbolConnect4)
    addShapeSlot.removeEventListener("mouseover", previewSymbolC4)
    addShapeSlot.removeEventListener("mouseleave", unPreviewSymbolC4)
    connect4Animation(addShapeSlot)
    turn++
    checkForWin()

    if (turn % 2 !== 0 && turn < lineSize ** 2 && botMode) {
        blockScreen()
        setTimeout(() => botCheckBoard(), 600)
        setTimeout(() => unBlockScreen(), 600)
    }
}

const previewSymbol = (event) => {
    if (turn % 2 === 0 && event.target.innerHTML === "") {
        event.target.innerHTML = crossPreview
    } else if (event.target.innerHTML === "") {
        event.target.innerHTML = circlePreview
    }
}

const unPreviewSymbol = (event) => {
    if (event.target.innerHTML === crossPreview || event.target.innerHTML === circlePreview) {
        event.target.innerHTML = ""
    }
}

const previewSymbolC4 = (event) => {
    let currLine = null
    let addShapeSlot = ""
    targetNumId = event.target.dataset.squareNum

    for (let line in gameData[currentGridSize].insertLines) {
        const checkLine = gameData[currentGridSize].insertLines[line]
        if (checkLine.includes(Number(targetNumId))) {
            currLine = checkLine
            break
        }
    }

    const endOfLine = document.querySelector(`[data-square-num = "${currLine[4]}"]`)
    if (endOfLine.innerHTML === "" || endOfLine.innerHTML === circlePreview || endOfLine.innerHTML === crossPreview) {
        addShapeSlot = document.querySelector(`[data-square-num = "${currLine[4]}"]`)
    } else {
        for (let num of currLine) {
            const selectedSlot = document.querySelector(`[data-square-num = "${num}"]`)
            if (selectedSlot.innerHTML === cross || selectedSlot.innerHTML === circle) {
                addShapeSlot = document.querySelector(`[data-square-num = "${num - 5}"]`)
                break
            }
        }
    }

    if (turn % 2 === 0 && addShapeSlot.innerHTML === "") {
        addShapeSlot.innerHTML = crossPreview
    } else if (addShapeSlot.innerHTML === "") {
        addShapeSlot.innerHTML = circlePreview
    }
}

const unPreviewSymbolC4 = (event) => {
    let currLine = null
    let addShapeSlot = ""
    targetNumId = event.target.dataset.squareNum

    for (let line in gameData[currentGridSize].insertLines) {
        const checkLine = gameData[currentGridSize].insertLines[line]
        if (checkLine.includes(Number(targetNumId))) {
            currLine = checkLine
            break
        }
    }

    const endOfLine = document.querySelector(`[data-square-num = "${currLine[4]}"]`)
    if (endOfLine.innerHTML === "" || endOfLine.innerHTML === circlePreview || endOfLine.innerHTML === crossPreview) {
        addShapeSlot = document.querySelector(`[data-square-num = "${currLine[4]}"]`)
    } else {
        for (let num of currLine) {
            const selectedSlot = document.querySelector(`[data-square-num = "${num}"]`)
            if (selectedSlot.innerHTML === cross || selectedSlot.innerHTML === circle) {
                addShapeSlot = document.querySelector(`[data-square-num = "${num - 5}"]`)
                break
            }
        }
    }
    if (addShapeSlot.innerHTML === crossPreview || addShapeSlot.innerHTML === circlePreview) {
        addShapeSlot.innerHTML = ""
    }
}

const setLineSize = (value) => {
    currentGridSize = `${value.target.dataset.label}`
    value.stopPropagation()
    if (window.matchMedia("(max-width: 640px)").matches) {
        outerContainer.style.width = gameData[currentGridSize].mobileContainerWidth
        outerContainer.style.height = gameData[currentGridSize].mobileContainerHeight
    } else {
        outerContainer.style.width = gameData[currentGridSize].desktopContainerWidth
        outerContainer.style.height = gameData[currentGridSize].desktopContainerHeight
    }

    lineSize = gameData[`${value.target.dataset.label}`].squarePerLine
    gameContainer
    initBoard()
    whitenSquares()
}

const whitenSquares = () => {
    const slots = document.querySelectorAll(".game-slot")
    for (let slot of slots) {
        slot.style.backgroundColor = "white"
        slot.style.opacity = 0.85
    }
}

const createBoard = () => {
    for (let i = 0; i < lineSize ** 2; i++) {
        const newSquare = document.createElement("div")
        newSquare.classList.add("game-slot")
        newSquare.dataset.squareNum = i + 1
        if (currentGridSize !== "Connect 4") {
            newSquare.addEventListener("mouseover", previewSymbol)
            newSquare.addEventListener("mouseleave", unPreviewSymbol)
            newSquare.addEventListener("click", insertSymbol)
            gameContainer.appendChild(newSquare)
        } else {
            newSquare.addEventListener("mouseover", previewSymbolC4)
            newSquare.addEventListener("mouseleave", unPreviewSymbolC4)
            newSquare.addEventListener("click", insertSymbolConnect4)
            gameContainer.appendChild(newSquare)
        }
    }
}

const initBoard = () => {
    turn = 0
    crossSlots = []
    circleSlots = []
    const slots = document.querySelectorAll(".game-slot")
    const winStuff = document.querySelectorAll(".win")

    for (let stuff of winStuff) {
        stuff.remove()
    }
    for (let slot of slots) {
        slot.remove()
    }

    gameContainer.style.gridTemplateRows = `repeat(${lineSize}, 1fr)`
    gameContainer.style.gridTemplateColumns = `repeat(${lineSize}, 1fr)`
    createBoard()
}

initBoard()
whitenSquares()

for (let selector of gridSizeSelectors) {
    selector.addEventListener("click", setLineSize)
}

for (let selector of gridSizeSelectors) {
    selector.disabled = true
}

const showHead = () => {
    if (header.classList.contains("down")) {
        for (let selector of gridSizeSelectors) {
            selector.disabled = true
        }

        plug.style.transition = "0.5s"
        plug.classList.toggle("down")
        scoreDiv.classList.toggle("down")
        gridSizeDiv.classList.toggle("down")
        botSwitchDiv.classList.toggle("down")
        setTimeout(() => header.classList.toggle("down"), 250)
    } else {
        for (let selector of gridSizeSelectors) {
            selector.disabled = false
        }

        header.classList.toggle("down")
        plug.style.transition = "2s"

        setTimeout(() => {
            botSwitchDiv.classList.toggle("down")
            gridSizeDiv.classList.toggle("down")
            scoreDiv.classList.toggle("down")
            setTimeout(() => plug.classList.toggle("down"), 300)
        }, 250)
    }
}

const restartGame = () => {
    const slots = document.querySelectorAll(".game-slot")
    for (let slot of slots) {
        slot.style.backgroundColor = "black"
        slot.style.opacity = 0
    }
    winTextDiv.style.opacity = 0
    setTimeout(() => initBoard(), 400)
    setTimeout(() => whitenSquares(), 800)
}

const toggleBotMode = () => {
    if (botSwitch.checked) {
        botMode = true
    } else {
        botMode = false
    }
    restartGame()
}

dropDown.addEventListener("click", showHead)
restartButton.addEventListener("click", restartGame)
botSwitch.addEventListener("click", toggleBotMode)

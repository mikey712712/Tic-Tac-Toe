const gameData = {
    '3 x 3': {
        squarePerLine: 3,
        desktopContainerWidth: '50vh',
        desktopContainerHeight: '50vh',
        mobileContainerWidth: '45vh',
        mobileContainerHeight: '45vh',

        winConditions: {
            row1: [1, 2, 3],
            row2: [4, 5, 6],
            row3: [7, 8, 9],
            col1: [1, 4, 7],
            col2: [2, 5, 8],
            col3: [3, 6, 9],
            diag1: [1, 5, 9],
            diag2: [3, 5, 7],
        }
    },

    '4 x 4': {
        squarePerLine: 4,
        desktopContainerWidth: '60vh',
        desktopContainerHeight: '60vh',
        mobileContainerWidth: '45vh',
        mobileContainerHeight: '45vh',

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
        }
    },

    '5 x 5': {
        squarePerLine: 5,
        desktopContainerWidth: '65vh',
        desktopContainerHeight: '65vh',
        mobileContainerWidth: '45vh',
        mobileContainerHeight: '45vh',

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
        }
    }
}

const header = document.querySelector('header')
const gameContainer = document.querySelector('.game-container')
const outerContainer = document.querySelector('.outer-container')
const gridSizeSelectors = document.querySelectorAll('.grid-size-selector')
const gridSizeDiv = document.querySelector('#grid-size')
const dropDown = document.querySelector('#dropdown')
const plug = document.querySelector('#plug')
const winTextDiv = document.querySelector('.win-text')
const scoreDiv = document.querySelector('.win-container')
const xScore = document.querySelector('#p1score')
const oScore = document.querySelector('#p2score')

const restartButton = document.createElement('button')
restartButton.type = 'button'
restartButton.classList.add('restart')
restartButton.classList.add('win')
restartButton.innerHTML = '<img id="reset" src="./images/reset.png">Restart'

const cross = `<img id="cross" src="./images/cross.png">`
const circle = `<img id="circle" src="./images/circle.png">`
const crossPreview = `<img src="./images/cross.png" class="preview">`
const circlePreview = `<img src="./images/circle.png" class="preview">`
let crossSlots = []
let circleSlots = []

let currentGridSize = '3 x 3'
let lineSize = 3
let turn = 0
let crossPoints = 0
let circlePoints = 0

const winAnimation1 = (target) => {
    target.style.width = '100%'
    target.style.height = '100%'
    target.style.filter = 'blur(2px)'
    // target.style.filter = 'opacity(50%)'
}
const winAnimation2 = (target) => {
    target.style.width = '84%'
    target.style.height = '84%'
    target.style.filter = ''
}

const winScreen = (winner) => {
    const winnerText = document.createElement('p')
    winnerText.classList.add('win')
    if (winner === 'draw') {
        winnerText.textContent = `It's a draw.`
    } else {
        winnerText.textContent = `${winner} wins!`
    }
    xScore.textContent = crossPoints
    oScore.textContent = circlePoints
    winTextDiv.appendChild(winnerText)
    winTextDiv.appendChild(restartButton)
    winTextDiv.style.opacity = 1;
}

const checkForWin = () => {
    if (turn === lineSize ** 2) {
        winScreen('draw')
        return
    }
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
                currSlot.removeEventListener('click', insertSymbol)
                currSlot.removeEventListener('mouseover', previewSymbol)
                currSlot.removeEventListener('mouseleave', unPreviewSymbol)
            }
            if (crossCount === requiredSlots) {
                crossPoints += 1
                for (let slot of winConditionsObject[condition]) {
                    const currSlot = document.querySelector(`[data-square-num = "${slot}"]`).firstChild
                    setTimeout(() => winAnimation1(currSlot), 400)
                    setTimeout(() => winAnimation2(currSlot), 800)
                }
                setTimeout(() => winScreen('Cross'), 1400)
            } else if (circleCount === requiredSlots) {
                circlePoints += 1
                for (let slot of winConditionsObject[condition]) {
                    const currSlot = document.querySelector(`[data-square-num = "${slot}"]`).firstChild
                    setTimeout(() => winAnimation1(currSlot), 400)
                    setTimeout(() => winAnimation2(currSlot), 800)
                }
                setTimeout(() => winScreen('Circle'), 1400)
            }
        }
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
    event.target.removeEventListener('click', insertSymbol)
    turn++
    checkForWin()
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
    const slots = document.querySelectorAll('.game-slot')
    for (let slot of slots) {
        slot.style.backgroundColor = 'white'
        slot.style.opacity = 0.85
    }
}

const createBoard = () => {
    for (let i = 0; i < lineSize ** 2; i++) {
        const newSquare = document.createElement('div')
        newSquare.classList.add('game-slot')
        newSquare.dataset.squareNum = i + 1
        newSquare.addEventListener('mouseover', previewSymbol)
        newSquare.addEventListener('mouseleave', unPreviewSymbol)
        newSquare.addEventListener('click', insertSymbol)
        gameContainer.appendChild(newSquare)
    }
}

const initBoard = () => {
    turn = 0
    crossSlots = []
    circleSlots = []
    const slots = document.querySelectorAll('.game-slot')
    const winStuff = document.querySelectorAll('.win')
    
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
    selector.addEventListener('click', setLineSize)
}

for (let selector of gridSizeSelectors) {
    selector.disabled = true
}

const showHead = () => {
    if (header.classList.contains('down')) {
        for (let selector of gridSizeSelectors) {
            selector.disabled = true
        }

        plug.style.transition = '0.5s'
        plug.classList.toggle('down')
        scoreDiv.classList.toggle('down')
        gridSizeDiv.classList.toggle('down')
        setTimeout(() => header.classList.toggle('down'), 250)
    } 
    else {
        for (let selector of gridSizeSelectors) {
            selector.disabled = false
        }

        header.classList.toggle('down')
        plug.style.transition = '2s'

        setTimeout(() => {
            gridSizeDiv.classList.toggle('down')
            scoreDiv.classList.toggle('down')
            setTimeout(() => plug.classList.toggle('down'), 300)
        }, 250)
    }

}

const restartGame = () => {
    const slots = document.querySelectorAll('.game-slot')
    for (let slot of slots) {
        slot.style.backgroundColor = 'black'
        slot.style.opacity = 0
    }
    gameContainer.style.zIndex = 1;
    winTextDiv.style.opacity = 0;
    setTimeout(() => initBoard(), 400)
    setTimeout(() => whitenSquares(), 800)
}

dropDown.addEventListener('click', showHead)
restartButton.addEventListener('click', restartGame)

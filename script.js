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
const cross = `<img src="./images/cross.png">`
const circle = `<img src="./images/circle.png">`
const crossPreview = `<img src="./images/cross.png" class="preview">`
const circlePreview = `<img src="./images/circle.png" class="preview">`
let crossSlots = []
let circleSlots = []
let currentGridSize = '3 x 3'
let lineSize = 3
let turn = 0

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
        if (crossCount === requiredSlots) {
            console.log('Cross wins')
        } else if (circleCount === requiredSlots) {
            console.log('Circle wins')
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
    const slots = document.querySelectorAll('.game-slot')
    for (let slot of slots) {
        slot.remove()
    }
    gameContainer.style.gridTemplateRows = `repeat(${lineSize}, 1fr)`
    gameContainer.style.gridTemplateColumns = `repeat(${lineSize}, 1fr)`
    createBoard()
}

initBoard()

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
        plug.style.transition = '0.7s'
        plug.classList.toggle('down')
        gridSizeDiv.classList.toggle('down')
        setTimeout(() => header.classList.toggle('down'), 250)
    } else {
        for (let selector of gridSizeSelectors) {
            selector.disabled = false
        }
        header.classList.toggle('down')
        plug.style.transition = '2s'
        setTimeout(() => {
            gridSizeDiv.classList.toggle('down')
            setTimeout(() => plug.classList.toggle('down'), 300)
        }, 250)
        
    }
    
}

dropDown.addEventListener('click', showHead)

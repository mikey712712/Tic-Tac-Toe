const gameData = {
    '3 x 3': {
        squarePerLine: 3,
        desktopContainerWidth: '50vh',
        desktopContainerHeight: '50vh',
        mobileContainerWidth: '45vh',
        mobileContainerHeight: '45vh',

        winConditions: {

        }
    },

    '4 x 4': {
        squarePerLine: 4,
        desktopContainerWidth: '60vh',
        desktopContainerHeight: '60vh',
        mobileContainerWidth: '45vh',
        mobileContainerHeight: '45vh',

        winConditions: {

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
let lineSize = 3


const setLineSize = (value) => {
    value.stopPropagation()
    if (window.matchMedia("(max-width: 640px)").matches) {
        outerContainer.style.width = gameData[`${value.target.dataset.label}`].mobileContainerWidth
        outerContainer.style.height = gameData[`${value.target.dataset.label}`].mobileContainerHeight
    } else {
        outerContainer.style.width = gameData[`${value.target.dataset.label}`].desktopContainerWidth
        outerContainer.style.height = gameData[`${value.target.dataset.label}`].desktopContainerHeight
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
        gridSizeDiv.classList.toggle('down')
        setTimeout(() => header.classList.toggle('down'), 250)
    } else {
        for (let selector of gridSizeSelectors) {
            selector.disabled = false
        }
        header.classList.toggle('down')
        setTimeout(() => gridSizeDiv.classList.toggle('down'), 250)
    }
    
}

dropDown.addEventListener('click', showHead)

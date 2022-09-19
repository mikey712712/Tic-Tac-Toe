const gameData = {
    '3 x 3': {
        squarePerLine: 3,
        desktopContainerWidth: '50vh',
        desktopContainerHeight: '50vh',
        mobileContainerWidth: '41vh',
        mobileContainerHeight: '41vh',

        winConditions: {

        }
    },

    '4 x 4': {
        squarePerLine: 4,
        desktopContainerWidth: '60vh',
        desktopContainerHeight: '60vh',
        mobileContainerWidth: '41vh',
        mobileContainerHeight: '41vh',

        winConditions: {

        }
    },

    '5 x 5': {
        squarePerLine: 5,
        desktopContainerWidth: '70vh',
        desktopContainerHeight: '70vh',
        mobileContainerWidth: '41vh',
        mobileContainerHeight: '41vh',

        winConditions: {

        }
    }
}

const gameContainer = document.querySelector('.game-container')
const outerContainer = document.querySelector('.outer-container')
const gridSizeSelectors = document.querySelectorAll('.grid-size-selector')
let isMobileSize = window.matchMedia("(max-width: 640px)")
let lineSize = 3


const setLineSize = (value) => {
    if (window.matchMedia("(max-width: 640px)").matches) {
        outerContainer.style.width = gameData[`${value.target.innerHTML}`].mobileContainerWidth
        outerContainer.style.height = gameData[`${value.target.innerHTML}`].mobileContainerHeight
    } else {
        outerContainer.style.width = gameData[`${value.target.innerHTML}`].desktopContainerWidth
        outerContainer.style.height = gameData[`${value.target.innerHTML}`].desktopContainerHeight
    }

    lineSize = gameData[`${value.target.innerHTML}`].squarePerLine
    gameContainer
    initBoard()
}

const createBoard = () => {
    for (let i = 0; i < Math.pow(lineSize, 2); i++) {
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
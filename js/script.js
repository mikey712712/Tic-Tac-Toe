// gameData stores all of the information to render the different game modes of the app
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

			// ex1: [5, 10, 15],
			// ex2: [2, 7, 12],
			// ex3: [3, 6, 9],
			// ex4: [8, 11, 14],
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

			// ex1: [11, 7, 3],
			// ex2: [16, 12, 8, 4],
			// ex3: [22, 18, 14, 10],
			// ex4: [23, 19, 15],
			// ex5: [11, 17, 23],
			// ex6: [3, 9, 15],
			// ex7: [6, 12, 18, 24],
			// ex8: [2, 8, 14, 20],
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
const boogieButton = document.querySelector("#dance")
const boogieDiv = document.querySelector("#boogie-gif")

const restartButton = document.createElement("button")
restartButton.type = "button"
restartButton.classList.add("restart")
restartButton.classList.add("win")
restartButton.innerHTML = '<img id="reset" src="./images/reset.png">Restart'

const cross = `<img id="cross" class="shape" src="./images/cross.png">`
const circle = `<img id="circle" class="shape" src="./images/circle.png">`
const c4Blue = `<img id="circle" class="shape blueteam" src="./images/circle.png">`
const c4Red = `<img id="circle" class="shape redteam" src="./images/circle.png">`
const c4BluePreview = `<img id="circle" class="preview blueteam" src="./images/circle.png">`
const c4RedPreview = `<img id="circle" class="preview redteam" src="./images/circle.png">`
const crossPreview = `<img src="./images/cross.png" class="preview">`
const circlePreview = `<img src="./images/circle.png" class="preview">`
const boogie = `<img id="kid-dancing" src="./images/boogie.gif">`
let crossSlots = []
let circleSlots = []
let botMode = false
let dancing = false

let currentGridSize = "3 x 3"
let lineSize = 3
let turn = 0
let crossPoints = 0
let circlePoints = 0

const winAnimation1 = (target) => {
	if (currentGridSize !== "Connect 4") {
		target.classList.toggle("animation")
	} else {
		target.classList.toggle("animationC4")
	}
}

const winAnimation2 = (target) => {
	if (currentGridSize !== "Connect 4") {
		target.classList.toggle("animation")
	} else {
		target.classList.toggle("animationC4")
	}
}

const blockScreen = () => {
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

// BOT DECISION MAKING FUNCTION
const botCheckBoard = () => {
	// If the middle tile is empty in a 3x3 or 5x5 tic-tac-toe game, it will always take it on its first turn
	if (
		currentGridSize !== "Connect 4" &&
		currentGridSize !== "4 x 4" &&
		document.querySelector(`[data-square-num = "${(lineSize ** 2 + 1) / 2}"]`).innerHTML === ""
	) {
		document.querySelector(`[data-square-num = "${(lineSize ** 2 + 1) / 2}"]`).click()
		return
	}

	// Otherwise if the player takes the middle tile on turn 1, take the top left corner
	else if (turn === 1 && currentGridSize !== "Connect 4" && document.querySelector(`[data-square-num = "1"]`).innerHTML === "") {
		document.querySelector(`[data-square-num = "1"]`).click()
		return
	}

	// Creating an object of all relevant win conditions for the current game
	const winConditionsObject = gameData[currentGridSize].winConditions
	let choice = null

	// Iterate over each win condition in the object
	for (let condition in winConditionsObject) {
		const requiredSlots = winConditionsObject[condition].length
		let circleCount = 0
		let crossCount = 0

		// Iterate over each value of the current win condition, and count how many of those slots have circles or crosses
		for (let slot of winConditionsObject[condition]) {
			if (circleSlots.includes(String(slot))) {
				circleCount++
			} else if (crossSlots.includes(String(slot))) {
				crossCount++
			}
		}

		// If circle has all but one slot filled for the current win condition and the last needed slot is empty, click that slot and win
		if (circleCount === requiredSlots - 1) {
			for (let slot of winConditionsObject[condition]) {
				// Store the content of the current slot being checked in a constant
				const slotContent = document.querySelector(`[data-square-num = "${slot}"]`).innerHTML

				// slotBelowContent is used for making decisions in the connect 4 game, it has a default value that only gets overridden
				// if there is a slot below
				let slotBelowContent = "no-slot-below"

				// Checking if there is a slot below by seeing if the current slot is above the bottom row
				if (slot < lineSize ** 2 - lineSize) {
					slotBelowContent = document.querySelector(`[data-square-num = "${slot + lineSize}"]`).innerHTML
				}

				// If the circleSlots array which stores circle's taken slots does not contain the current value of the iteration, that
				// is the last value it needs to click
				if (
					!circleSlots.includes(String(slot)) &&
					(slotContent === "" ||
						slotContent === circlePreview ||
						slotContent === crossPreview ||
						slotContent === c4BluePreview ||
						slotContent === c4RedPreview)
				) {
					// Connect 4 needs to slightly alter this logic by checking the slot under the one needed to win the game.
					// If it's empty, the bot can't win so ignore this win condition.
					if (currentGridSize === "Connect 4" && (slotBelowContent !== "" || slotBelowContent === "no-slot-below")) {
						document.querySelector(`[data-square-num = "${slot}"]`).click()
						return
					}

					// If the game isnt connect 4, clicking the last slot needed which is empty will always win the game
					else if (currentGridSize !== "Connect 4") {
						document.querySelector(`[data-square-num = "${slot}"]`).click()
						return
					}
				}
			}
		}

		// If cross has all but one slot filled for the current win condition and the last needed slot is empty, click that slot
		// and block the win. This loop uses pretty much identical logic to the one above, except it stores the value of the slot
		// where it can block until it has iterated over all the win conditions
		// It has to do this in case it can win from a win condition later in the object
		else if (crossCount === requiredSlots - 1) {
			for (let slot of winConditionsObject[condition]) {
				const slotContent = document.querySelector(`[data-square-num = "${slot}"]`).innerHTML
				let slotBelowContent = "no-slot-below"
				if (slot < lineSize ** 2 - lineSize) {
					slotBelowContent = document.querySelector(`[data-square-num = "${slot + lineSize}"]`).innerHTML
				}
				if (
					!crossSlots.includes(String(slot)) &&
					(slotContent === "" ||
						slotContent === circlePreview ||
						slotContent === crossPreview ||
						slotContent === c4BluePreview ||
						slotContent === c4RedPreview)
				) {
					// This line makes sure that the bot isn't trying to block when cross has an empty slot below it's winning slot
					if (currentGridSize === "Connect 4" && (slotBelowContent !== "" || slotBelowContent === "no-slot-below")) {
						// If the slot below isn't empty and cross can win, block that win
						choice = document.querySelector(`[data-square-num = "${slot}"]`)
					}

					// If the slot below is empty and cross needs it filled to win, exclude the line the slot belongs to from the possible random choices
					else if (currentGridSize === "Connect 4") {
						for (let line in gameData[currentGridSize].insertLines)
							if (gameData[currentGridSize].insertLines[line].includes(slot)) {
								for (let number of gameData[currentGridSize].insertLines[line]) {
									console.log(number)
									document.querySelector(`[data-square-num = "${number}"]`).hidden = true
								}
							}
					}
					// Otherwise if the game is Tic-Tac-Toe, it should always block cross' last needed slot (if the bot can't win)
					else if (currentGridSize !== "Connect 4") {
						choice = document.querySelector(`[data-square-num = "${slot}"]`)
					}
				}
			}
		}
	}

	// If there is no way for the bot to win, it will block cross if there is an available block
	if (choice !== null) {
		choice.click()
	}
	// If the player is trying to set up a double corner win, this blocks it
	else if (turn === 3 && currentGridSize !== "Connect 4") {
		document.querySelector(`[data-square-num = "2"]`).click()
	}

	// Otherwise if there is no way to win or to block it will just pick a random slot out of the remaining empty slots,
	// excluding slots that will benefit the player in Connect 4
	else {
		const slots = document.querySelectorAll(".game-slot")
		let availableSlots = []
		for (let slot of slots) {
			if (slot.innerHTML === "" && slot.hidden === false) {
				availableSlots.push(slot.dataset.squareNum)
			} else if (slot.hidden === true) {
				slot.hidden = false
			}
		}

		// If all of the allowed slots are full, pick randomly out of all empty slots
		if (availableSlots.length === 0) {
			for (let slot of slots) {
				if (slot.innerHTML === "") {
					availableSlots.push(slot.dataset.squareNum)
				}
			}
		}
		console.log(availableSlots)

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
				if (currentGridSize !== "Connect 4") {
					setTimeout(() => winScreen("Cross"), 1400)
				} else {
					setTimeout(() => winScreen("Green"), 1400)
				}

				return
			} else if (circleCount === requiredSlots) {
				circlePoints += 1
				for (let slot of winConditionsObject[condition]) {
					const currSlot = document.querySelector(`[data-square-num = "${slot}"]`).firstChild
					setTimeout(() => winAnimation1(currSlot), 400)
					setTimeout(() => winAnimation2(currSlot), 800)
				}
				if (currentGridSize !== "Connect 4") {
					setTimeout(() => winScreen("Circle"), 1400)
				} else {
					setTimeout(() => winScreen("Red"), 1400)
				}
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
	if (endOfLine.innerHTML === "" || endOfLine.innerHTML === c4BluePreview || endOfLine.innerHTML === c4RedPreview) {
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
		addShapeSlot.innerHTML = c4Blue
		crossSlots.push(addShapeSlot.dataset.squareNum)
	} else {
		addShapeSlot.innerHTML = c4Red
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
	if (endOfLine.innerHTML === "" || endOfLine.innerHTML === c4BluePreview || endOfLine.innerHTML === c4RedPreview) {
		addShapeSlot = document.querySelector(`[data-square-num = "${currLine[4]}"]`)
	} else {
		for (let num of currLine) {
			const selectedSlot = document.querySelector(`[data-square-num = "${num}"]`)
			if (selectedSlot.innerHTML === c4Blue || selectedSlot.innerHTML === c4Red) {
				addShapeSlot = document.querySelector(`[data-square-num = "${num - 5}"]`)
				break
			}
		}
	}

	if (turn % 2 === 0 && addShapeSlot.innerHTML === "") {
		addShapeSlot.innerHTML = c4BluePreview
	} else if (addShapeSlot.innerHTML === "") {
		addShapeSlot.innerHTML = c4RedPreview
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
	if (endOfLine.innerHTML === "" || endOfLine.innerHTML === c4BluePreview || endOfLine.innerHTML === c4RedPreview) {
		addShapeSlot = document.querySelector(`[data-square-num = "${currLine[4]}"]`)
	} else {
		for (let num of currLine) {
			const selectedSlot = document.querySelector(`[data-square-num = "${num}"]`)
			if (selectedSlot.innerHTML === c4Blue || selectedSlot.innerHTML === c4Red) {
				addShapeSlot = document.querySelector(`[data-square-num = "${num - 5}"]`)
				break
			}
		}
	}

	if (addShapeSlot.innerHTML === c4BluePreview || addShapeSlot.innerHTML === c4RedPreview) {
		addShapeSlot.innerHTML = ""
	}
}

const setLineSize = (value) => {
	currentGridSize = `${value.target.dataset.label}`
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
		botSwitch.disabled = true
		plug.style.transition = "0.5s"
		plug.classList.toggle("down")
		scoreDiv.classList.toggle("down")
		gridSizeDiv.classList.toggle("down")
		botSwitchDiv.classList.toggle("down")

		setTimeout(() => {
			header.classList.toggle("down")
			botSwitchDiv.style.scale = "0"
		}, 250)
	} else {
		for (let selector of gridSizeSelectors) {
			selector.disabled = false
		}

		header.classList.toggle("down")
		plug.style.transition = "2s"
		botSwitchDiv.style.scale = "100%"

		setTimeout(() => {
			botSwitch.disabled = false
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
		if (slot.firstChild !== null) {
			slot.firstChild.style.filter = "unset"
		}
		slot.style.backgroundColor = "black"
		slot.style.opacity = 0
	}
	winTextDiv.style.opacity = 0
	blockScreen()
	setTimeout(() => initBoard(), 400)
	setTimeout(() => whitenSquares(), 800)
	setTimeout(() => unBlockScreen(), 900)
}

const toggleBotMode = () => {
	if (botSwitch.checked) {
		botMode = true
	} else {
		botMode = false
	}
	restartGame()
}

const dance = () => {
	if (dancing) {
		document.querySelector("#kid-dancing").remove()
		dancing = false
	} else {
		boogieDiv.innerHTML = boogie
		dancing = true
	}
}

dropDown.addEventListener("click", showHead)
restartButton.addEventListener("click", restartGame)
botSwitch.addEventListener("click", toggleBotMode)
boogieButton.addEventListener("click", dance)

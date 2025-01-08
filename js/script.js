
const part1 = document.querySelector('#p1')
const part2 = document.querySelector('#p2')
const btnStart = document.querySelector('#p1 > button')
const btnX = document.querySelector('#x')
const btnO = document.querySelector('#o')
const part3 = document.querySelector('#p3')
const p1Selected = document.querySelector('#p1Selected')
const p2Selected = document.querySelector('#p2Selected')
const box = document.querySelector('#p4')
const squre = document.querySelectorAll('#p4 > div')
const part5 = document.querySelector('#p5')
const part6 = document.querySelector('#p6')

let currentPlayer, firstSelect, secondSelect


btnStart.addEventListener('click', () => {
    part1.style.display = 'none'
    part2.classList.remove('hidden')
})


btnX.addEventListener('click', selectItem)
btnO.addEventListener('click', selectItem)

function selectItem(e) {
    const selected = e.target.innerText
    part2.classList.add('hidden')
    part3.classList.remove('hidden')
    if (selected === 'X') {
        p1Selected.innerText = 'X'
        p2Selected.innerText = 'O'
        firstSelect = 'X'
        secondSelect = 'O'
    } else {
        p1Selected.innerText = 'O'
        p2Selected.innerText = 'X'
        firstSelect = 'O'
        secondSelect = 'X'
    }

    currentPlayer = firstSelect
    setTimeout(() => {
        part3.classList.add('hidden')
        box.classList.remove('hidden')
        part5.classList.remove('hidden')
        part5.classList.remove('bg-gray-400')
        part6.classList.remove('hidden')
    }, 1600)
}


squre.forEach(item => {
    item.dataset.status = 'off'
    item.dataset.value = ''

    item.addEventListener('click', e => {
        let statusSqure = e.target.dataset.status
        if (statusSqure === 'off') {
            e.target.innerText = currentPlayer
            e.target.dataset.value = currentPlayer
            e.target.dataset.status = 'on'

            if (currentPlayer === firstSelect) {
                currentPlayer = secondSelect
                part5.classList.remove('playerStatus')
                part5.classList.add('bg-gray-400')
                part6.classList.add('playerStatus')
                part6.classList.remove('bg-gray-400')
            } else {
                currentPlayer = firstSelect
                part5.classList.add('playerStatus')
                part5.classList.remove('bg-gray-400')
                part6.classList.remove('playerStatus')
                part6.classList.add('bg-gray-400')
            }
            check()
        } else {
            swal('The selected value', 'This square is already selected', 'info')
        }
    })
})

function check() {
    let winner = ''
    let arrayWinner = []

    switch (true) {
        // سطرها
        case (squre[0].dataset.value === squre[1].dataset.value && squre[0].dataset.value === squre[2].dataset.value && squre[0].dataset.value !== ''):
            winner = squre[0].dataset.value
            arrayWinner = [0, 1, 2]
            break
        case (squre[3].dataset.value === squre[4].dataset.value && squre[3].dataset.value === squre[5].dataset.value && squre[3].dataset.value !== ''):
            winner = squre[3].dataset.value
            arrayWinner = [3, 4, 5]
            break
        case (squre[6].dataset.value === squre[7].dataset.value && squre[6].dataset.value === squre[8].dataset.value && squre[6].dataset.value !== ''):
            winner = squre[6].dataset.value
            arrayWinner = [6, 7, 8]
            break

        // ستون‌ها
        case (squre[0].dataset.value === squre[3].dataset.value && squre[0].dataset.value === squre[6].dataset.value && squre[0].dataset.value !== ''):
            winner = squre[0].dataset.value
            arrayWinner = [0, 3, 6]
            break
        case (squre[1].dataset.value === squre[4].dataset.value && squre[1].dataset.value === squre[7].dataset.value && squre[1].dataset.value !== ''):
            winner = squre[1].dataset.value
            arrayWinner = [1, 4, 7]
            break
        case (squre[2].dataset.value === squre[5].dataset.value && squre[2].dataset.value === squre[8].dataset.value && squre[2].dataset.value !== ''):
            winner = squre[2].dataset.value
            arrayWinner = [2, 5, 8]
            break

        // قطرها
        case (squre[0].dataset.value === squre[4].dataset.value && squre[0].dataset.value === squre[8].dataset.value && squre[0].dataset.value !== ''):
            winner = squre[0].dataset.value
            arrayWinner = [0, 4, 8]
            break
        case (squre[2].dataset.value === squre[4].dataset.value && squre[2].dataset.value === squre[6].dataset.value && squre[2].dataset.value !== ''):
            winner = squre[2].dataset.value
            arrayWinner = [2, 4, 6]
            break
    }

    if (winner !== '') {
        box.setAttribute('inert', 'inert')
        arrayWinner.forEach(index => squre[index].style.backgroundColor = 'green')
        setTimeout(() => swal('Winner : ' + winner, '', 'success'), 1000)
        setTimeout(() => location.reload(), 2800)
    } else {
        let counter = 0
        squre.forEach(item => {
            if (item.innerText !== 'X' && item.innerText !== 'O') {
                counter++
            }
        })
        if (counter === 0) {
            box.setAttribute('inert', 'inert')
            swal('Equal...!', 'Both players reached a draw', 'warning')
            setTimeout(() => location.reload(), 2200)
        }
    }
}
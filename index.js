document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    let width = 10;
    let bombsAmount = 20;
    let squares = [];
    let isGameOver = false;

    //create Board
    function createBoard() {
        // shuffled array with bombs postioned randomly
        const bombsArray = Array(bombsAmount).fill('bomb');
        const emptyArray = Array(width * width - bombsAmount).fill('valid');
        const gameArray = emptyArray.concat(bombsArray);
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

        for (var i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.setAttribute('id', i);
            square.classList.add(shuffledArray[i]);
            grid.appendChild(square);
            squares.push(square);
            // square.innerHTML = i;

            //click on any cell
            square.addEventListener('click', function (e) {
                clickEventHandler(square);
            });
        }



        //numbers in valid cells
        for (var i = 0; i < squares.length; i++) {
            let total = 0;
            const isLeftEdge = i % width === 0;
            const isRightEdge = i % width === width - 1;

            if (squares[i].classList.contains('valid')) {

                //bombs in adjacent cells
                //west
                if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++;
                //north-west
                if (i > 9 && !isLeftEdge && squares[i - width - 1].classList.contains('bomb')) total++;
                //north
                if (i > 9 && squares[i - width].classList.contains('bomb')) total++;
                //north-east
                if (i > 9 && !isRightEdge && squares[i - width + 1].classList.contains('bomb')) total++;
                //east
                if (i < 99 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++;
                //south-east
                if (i < 90 && !isRightEdge && squares[i + width + 1].classList.contains('bomb')) total++;
                //south
                if (i < 90 && squares[i + width].classList.contains('bomb')) total++;
                //south-west
                if (i < 90 && !isLeftEdge && squares[i + width - 1].classList.contains('bomb')) total++;

                squares[i].setAttribute('data', total);

            }

            console.log(squares[i]);

        }

    }

    createBoard();

    //action after click on cells
    function clickEventHandler(square) {

        if (isGameOver) return;
        if (square.classList.contains('checked') || square.classList.contains('flag')) return;
        if (square.classList.contains('bomb')) {
            console.log("Game OVer");
            isGameOver = true;
        } 
        
        else {
            let total = square.getAttribute('data');
            if (total != 0) {
                square.classList.add('checked');
                square.innerHTML = total;
                return;
            }
            checkSquare(square);
            square.classList.add('checked');
        }
    }







});
document.addEventListener('DOMContentLoaded',() => {

    //create Board
    function createBoard()
    {
        const grid=document.querySelector('.grid');
        const width=10;
        const squares=[];
        for(var i=0; i<width*width; i++)
        {
            const square=document.createElement('div');
            square.setAttribute('id',i);
            grid.appendChild(square);
            squares.push(square);
        }

    }

    createBoard();


});
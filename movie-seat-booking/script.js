const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.ccupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let titketPrice = +movieSelect.value;

container.addEventListener('click', (e) => {
    if (
        e.target.classList.contains('seat') && 
        !e.target.classList.contains('occupied')) {
        console.log(e.target);
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));


    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * titketPrice;
}

movieSelect.addEventListener('change', e => {
    titketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

// Get data from localStorage and populate ui
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    console.log(selectedSeats);
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, idx) => {
            if (selectedSeats.indexOf(idx) > -1) {
                seat.classList.add('selected');
            }            
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

populateUI();

// Default count and total
updateSelectedCount();
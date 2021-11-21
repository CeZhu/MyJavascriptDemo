const container = document.querySelector(".container");
const select = document.getElementById("movies");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");

populateUI();
updateSelectedSeat();

container.addEventListener("click", (e) => {
  const classList = e.target.classList;
  if (classList.contains("seat") && !classList.contains("occupied")) {
    classList.toggle("selected");
    updateSelectedSeat();
  }
});

select.addEventListener("change", (e) => {
  setMovieData(e.target.selectedIndex, +e.target.value);
  updateSelectedSeat();
});

function updateSelectedSeat() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedIndexs = [...selectedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );
  localStorage.setItem("selectedIndexs", JSON.stringify(selectedIndexs));
  setMovieData(select.selectedIndex, select.value);
  count.innerText = selectedIndexs.length;
  total.innerText = selectedIndexs.length * +select.value;
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMoviedIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function populateUI() {
  const selectedIndexs = JSON.parse(localStorage.getItem("selectedIndexs"));
  if (selectedIndexs !== null && selectedIndexs.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedIndexs.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    select.selectedIndex = selectedMovieIndex;
  }
}

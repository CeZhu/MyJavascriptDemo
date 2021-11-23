const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealEl = document.getElementById("single-meal");

function searchMeal(e) {
  e.preventDefault();
  const keyword = search.value;
  if (keyword.trim()) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${keyword}':</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML += `<p>There are no search results. Try again!<p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
          <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
        `
            )
            .join("");
        }
      });
  } else {
    alert("Please enter a search term");
  }
}

function getRandomMeal() {
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  const url = `https://www.themealdb.com/api/json/v1/1/random.php`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]}-${meal[`strMeasure${i}`]}`
      );
    }
  }

  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src='${meal.strMealThumb}' alt='${meal.strMeal}'>
      <div class='single-meal-info'>
        <p>${meal.strCategory}</p>
        <p>${meal.strArea}</p>
      </div>
      <div class='main'>
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients
            .map(
              (ing) => `
            <li>${ing}</li>
          `
            )
            .join("")}
        </ul>
      </div>
    </div>
  `;
}

function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);
mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });
  if(mealInfo){
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});

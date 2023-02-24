const loadMeals = (searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals.slice(0, 6)))
}

const displayMealDetails = (meals) => {

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    meals.forEach(meal => {
        const divMeals = document.createElement('div');
        divMeals.classList.add('card');
        divMeals.innerHTML = `
        <div class="card w-96 bg-base-100 shadow mx-auto pr-4">
            <figure class="px-10 pt-10">
                <img src="${meal.strMealThumb}" alt="Shoes" class="rounded-xl" />
            </figure>
           <div class="card-body items-center text-center">
              <h2 class="card-title">${meal.strMeal}</h2>
              <p>${meal.strTags ? meal.strTags : "No Menu Tag"}</p>
               <div class="card-actions w-full">
                 <label onclick="displayModal(${meal.idMeal})" for="my-modal-6" class="btn btn-primary w-full">Show Details</label>
               </div>
          </div>
        </div>
        
        `
        cardContainer.appendChild(divMeals);
    })
    showAllDetails(meals);
}

const searchLoadData = () => {
    const searchText = document.getElementById("search-text").value;
    searchText.value = '';
    loadMeals(searchText);

}

const displayModal = (idMeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayModalInfo(data.meals[0]));
}

const displayModalInfo = (meal) => {

    document.getElementById("modal-title").innerText = meal.strMeal;
    document.getElementById("modal-about").innerText = meal.strTags ? meal.strMeal : "Seafood,Spicy,Speciality,Easter";
    const modalImg = document.getElementById("modalBody");
    modalImg.innerHTML = `
      <img src="${meal.strMealThumb}"/>
   `

}

loadMeals('fish');
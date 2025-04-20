// long code



// const searchBtn = document.getElementById("search-btn");
// const searchInput = document.getElementById("search-input");
// const recipeContainer = document.getElementById("recipeContainer");


// // Recipe by name
// searchBtn.addEventListener('click', async () => {
//     const recipeName = searchInput.value.trim();
//     const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`)
//     const data = await response.json();
//     console.log(data);
//     recipeContainer.innerHTML = '';
//     if(data.meals){
//         data.meals.forEach(meal => {
//             // const recipeDiv = document.createElement('div');
//             // recipeDiv.classList.add('recipe');
//             // recipeDiv.innerHTML = `
//             //     <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
//             //     <h2>${meal.strMeal}</h2>
//             //     <p>${meal.strInstructions}</p>
//             // `;
//             // recipeContainer.appendChild(recipeDiv);
//             recipeContainer.innerHTML += `	
//                 <div class="recipe-card">
//                     <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
//                     <h2>${meal.strMeal}</h2>
//                     <p>${meal.strCategory} - ${meal.strArea}</p>
//                     <a href='recipe.html?id=${meal.idMeal}'>View Recipe</a>
//                 </div>
//             `
//         })
//     }else{
//         recipeContainer.innerHTML= '<p>No recipe found</p>'
//     }
// })


// // Recipe by area
// searchBtn.addEventListener('click', async () => {
//     const areaName = searchInput.value.trim();
//     const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`)
//     const data = await response.json();
//     console.log(data);
//     recipeContainer.innerHTML = '';
//     if(data.meals){
//         data.meals.forEach(meal => {
//             // const recipeDiv = document.createElement('div');
//             // recipeDiv.classList.add('recipe');
//             // recipeDiv.innerHTML = `
//             //     <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
//             //     <h2>${meal.strMeal}</h2>
//             //     <p>${meal.strInstructions}</p>
//             // `;
//             // recipeContainer.appendChild(recipeDiv);
//             recipeContainer.innerHTML += `	
//                 <div class="recipe-card">
//                     <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
//                     <h2>${meal.strMeal}</h2>
                    
//                     <a href='recipe.html?id=${meal.idMeal}'>View Recipe</a>
//                 </div>
//             `
//         })
//     }else{
//         recipeContainer.innerHTML= '<p>No recipe found</p>'
//     }
// })



// modified code

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const recipeContainer = document.getElementById("recipeContainer");

// Function to render recipes
function renderRecipes(meals) {
    recipeContainer.innerHTML = '';
    if (meals) {
        meals.forEach(meal => {
            recipeContainer.innerHTML += `
                <div class="recipe-card">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h2>${meal.strMeal}</h2>
                    <p>${meal.strCategory || ''} - ${meal.strArea || ''}</p>
                    <a href='recipe.html?id=${meal.idMeal}'>View Recipe</a>
                </div>
            `;
        });
    } else {
        recipeContainer.innerHTML = '<p>No recipe found</p>';
    }
}

// Event listener for search
searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (!query) {
        recipeContainer.innerHTML = '<p>Please enter a search term</p>';
        return;
    }

    try {
        // Determine search type (by name or area)
        const byNameResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const byNameData = await byNameResponse.json();

        if (byNameData.meals) {
            renderRecipes(byNameData.meals);
        } else {
            const byAreaResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`);
            const byAreaData = await byAreaResponse.json();
            renderRecipes(byAreaData.meals);
        }
    } catch (error) {
        console.error(error);
        recipeContainer.innerHTML = '<p>Error: Unable to fetch recipes. Please try again later.</p>';
    }
});
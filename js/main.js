const params = new URLSearchParams(window.location.search);
const id = params.get('id');
console.log(id);

const recipeDetails = document.getElementById('recipeDetails');

async function fetchRecipeDetails() {
    try {
        if (!id) {
            recipeDetails.innerHTML = `<p>Error: No recipe ID provided in the URL.</p>`;
            return;
        }

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch recipe details: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.meals || data.meals.length === 0) {
            recipeDetails.innerHTML = `<p>Error: Recipe not found.</p>`;
            return;
        }

        const recipe = data.meals[0];
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            if (recipe[`strIngredient${i}`]) {
                ingredients.push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`);
            }
        }

        const youtubeEmbed = recipe.strYoutube && recipe.strYoutube.includes('v=')
            ? `<iframe width="560" height="315" src="https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}" frameborder="0" allowfullscreen></iframe>`
            : '';

        recipeDetails.innerHTML = `
            <h1>${recipe.strMeal}</h1>
            <img src='${recipe.strMealThumb}' alt='${recipe.strMeal}'>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <h2>Instructions</h2>
            <p>${recipe.strInstructions}</p>
            ${youtubeEmbed}
            ${recipe.strSource ? `<p>Source: <a href="${recipe.strSource}" target="_blank">${recipe.strSource}</a></p>` : ''}
        `;
    } catch (error) {
        console.error(error);
        recipeDetails.innerHTML = `<p>Error: Unable to load recipe details. Please try again later.</p>`;
    }
}

fetchRecipeDetails();
const stars = document.querySelectorAll('.star');
const ratingValue = document.getElementById('rating-value');

stars.forEach((star) => {
  star.addEventListener('click', () => {
    const rating = star.getAttribute('data-value');
    const recipeId = star.closest('.recipe-card').getAttribute('data-id'); // Get the recipe ID from the closest card

    // Remove selection from all stars
    stars.forEach(s => s.classList.remove('selected'));
    
    // Add selected class to the clicked star and all previous stars
    for (let i = 0; i < rating; i++) {
      stars[i].classList.add('selected');
    }
    
    // Display the rating value
    ratingValue.textContent = `You rated this recipe: ${rating} stars`;

    // Send this value to your server
    sendRatingToServer(rating, recipeId);
  });
});

function sendRatingToServer(rating, recipeId) {
  console.log(`Sending rating of ${rating} for recipe ${recipeId} to the server...`);

  fetch('/rate-recipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rating: rating, recipeId: recipeId }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// For search button
function searchRecipe() {
  let query = document.getElementById('searchInput').value;
  alert("You searched for: " + query);
  // You can add functionality to handle the search here
}

// Function to fetch recipes from the server
function fetchRecipes() {
  fetch('/recipes')
    .then(response => response.json())
    .then(recipes => {
      displayRecipes(recipes);  // Call the function to display recipes
    })
    .catch(error => {
      console.error('Error fetching recipes:', error);
    });
}

function displayRecipes(recipes) {
  const recipesContainer = document.getElementById('recipes-container'); // Ensure you have this element in your HTML

  // Clear the container before adding new recipes
  recipesContainer.innerHTML = '';

  recipes.forEach(recipe => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card'); // Make sure you have a class for your cards
    recipeCard.setAttribute('data-id', recipe.id); // Store the recipe ID in the card

    // Example of how to format your recipe card
    recipeCard.innerHTML = `
      <h2>${recipe.title}</h2>
      <p>${recipe.description}</p>
      <p>Rating: ${recipe.recipe_rating || 'Not rated yet'}</p>
      <div class="star-rating">
        <span data-value="5" class="star">&#9733;</span>
        <span data-value="4" class="star">&#9733;</span>
        <span data-value="3" class="star">&#9733;</span>
        <span data-value="2" class="star">&#9733;</span>
        <span data-value="1" class="star">&#9733;</span>
      </div>
      <div id="rating-value"></div>
    `;

    recipesContainer.appendChild(recipeCard); // Add the card to the container
  });
}

// Call fetchRecipes when the page loads
window.onload = fetchRecipes;

document.getElementById("addRecipeForm").addEventListener("submit", async (event) => {
    event.preventDefault();  // Prevent the form from reloading the page

    // Collect form data
    const recipeName = document.getElementById("recipeName").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;

    try {
        const response = await fetch('/addRecipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipeName, ingredients, instructions })
        });

        const result = await response.json();
        document.getElementById("message").textContent = result.message;
    } catch (error) {
        document.getElementById("message").textContent = "Error adding recipe.";
    }
});

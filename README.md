# Recipes App Project

## Goals

### Develop a recipe application in mobile format:

#### Login page:

- Inputs for email and password:
  - email is stored in `localStorage`;
- After logging in, redirects to `/meals`

#### Header component:

- Profile button;
- Search bar:
  - 3 options:
    - ingredient;
    - name;
    - first letter (if typing more than 1 character, a warning is displayed);
  - Alert the user if no recipe is found


#### Footer component:

- Buttons to go to `/meals` or `/drinks`

#### Recipes component:

- A menu with filter options:
  - `All` recipes +
  - first five categories returned by the API;

- Shows 12 first recipes returned by the API, respecting the selected filter ( `All` is default ):
  - `/meals` path only renders food recipes;
  - `/drinks` path only renders drink recipes;

- Each recipe card is a link to redirect to its details page

#### RecipeDetails page:

- Display the recipe's
  - image;
  - title;
  - category;
  - alcoholic or not (drinks only);
  - ingredient list with measurement;
  - instructions;
  - youtube's recipe video (food only);
  - recommendation carousel:
    - displays 2 images at a time, 6 total;
    - if it's a food recipe, it will show drinks recommendations, and vice-versa;
  - A button that redirects to a `in-progress` page:
    - if the recipe hasn't been started yet, it reads `Start Recipe`;
    - if the recipe is already in progress, it reads `Continue Recipe`;
  - `Share` button:
    - displays a modal with the message `Link copied!`;
    - copy url to clipboard;
  - `Favorite` button:
    - saves/removes recipe in the `localStorage`

#### RecipeInProgress page:

- Displays the recipe's
  - image;
  - title;
  - category;
  - ingredient list with measurement:
    - checkboxes to mark each item;
    - checked items are saved in `localStorage`;
    - checked items are crossed out;
  - instructions;
  - `Share` button;
  - `Favorite` button;
  - `Finish Recipe` button:
    - only enables when all the ingredients are checked;
    - redirects to `/done-recipes`

#### DoneRecipes page:

- Menu with filters ( `All` is default ):
  - `All`, `Food` and `Drink`;
- Displays a list of cards with each recipe's:
  - image;
  - name;
  - category;
  - nationality (food only);
  - alcoholic or not (drink only);
  - times the recipe was done;
  - date of the last time the recipe was made;
  - tags;
  - `share` button;
- Each card is a link that redirects to the recipe's details page

#### Favorite page:

- Menu with filters ( `All` is default ):
  - `All`, `Food` and `Drink`;
- Displays a list of cards with each recipe's:
  - image;
  - name;
  - category;
  - nationality (food only);
  - alcoholic or not (drink only);
  - `share` button;
  - `unfavorite` button:
    - the recipe disappears from the page;
    - removes recipe from localStorage;
- Each card is a link that redirects to the recipe's details page

#### Profile page:

- Displays user's email;
- `Done Recipes` button
  - redirects to `/done-recipes`;
- `Favorite Recipes` button
  - redirects to `/favorite-recipes`;
- `Logout` button
  - redirects to `/` and clears localStorage

#### Develop tests for at least 90% of total coverage

- With `Jest` and `RTL`
##

#### using APIs:
- The MealDB API - `https://www.themealdb.com/api.php`

- The CocktailDB API - `https://www.thecocktaildb.com/api.php`

[Check it out!](https://biancaoura.github.io/project-frontend-online-store/)

##

> _Figma_ prototype and images provided by Trybe

> Project developed with _React_, _Jest_ and _RTL_

> with Carlos Eduardo da Silva, Everton Pereira, João Antônio Sá and Wayne Nacle

> using _Trello_ as a Kanban tool

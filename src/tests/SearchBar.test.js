import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import drinkCategories from './helpers/drinkCategories';
import mealCategories from './helpers/mealCategories';
import mockMeals from './helpers/mockMeals';
import oneDrink from './helpers/oneDrink';
import oneMeal from './helpers/oneMeal';
import App from '../App';
import drinksSearchedY from '../helpers/mockDrinksY';
import mealsByLetter from '../helpers/mockMealsByLetter';
import drinks from './helpers/mockDrinks';
import renderWithRouter from './helpers/renderwithRouter';
import mealsByIngredient from './helpers/mealsByIngredient';
import drinksByIngredient from './helpers/drinksByIngredient';

const INGREDIENT_DATA_TESTID = 'ingredient-search-radio';
const RECIPE_NAME_DATA_TESTID = 'name-search-radio';
const FIRST_LETTER_DATA_TESTID = 'first-letter-search-radio';
const SEARCH_INPUT_DATA_TESTID = 'search-input';
const SEARCH_BUTTON_DATA_TESTID = 'exec-search-btn';
const SEARCH_ICON_IMAGE = 'search-top-btn';
const CARD_NAME = '0-card-name';

const mockPromise = (type, typeCat, searchInput) => jest.spyOn(global, 'fetch')
  .mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(type),
  })
  .mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(typeCat),
  })
  .mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(searchInput),
  });

describe('Testing SearchBar component', () => {
  beforeEach(() => jest.clearAllMocks());

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('1 - Should render the correct elements', () => {
    renderWithRouter(<App />, '/meals');

    const searchImgButton = screen.getByTestId(SEARCH_ICON_IMAGE);
    userEvent.click(searchImgButton);

    const ingredientRadio = screen.getByTestId(INGREDIENT_DATA_TESTID);
    const recipeNameRadio = screen.getByTestId(RECIPE_NAME_DATA_TESTID);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_DATA_TESTID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_DATA_TESTID);
    const searchButton = screen.getByTestId(SEARCH_BUTTON_DATA_TESTID);

    const elements = [
      ingredientRadio,
      recipeNameRadio,
      firstLetterRadio,
      searchInput,
      searchButton,
    ];

    elements.forEach((el) => expect(el).toBeInTheDocument());
  });

  it('2 - Should filter the correct recipes in /drinks', async () => {
    mockPromise(drinks, drinkCategories, drinksSearchedY);

    renderWithRouter(<App />, '/drinks');

    userEvent.click(screen.getByTestId(SEARCH_ICON_IMAGE));
    userEvent.click(screen.getByTestId(FIRST_LETTER_DATA_TESTID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_DATA_TESTID), 'y');

    expect(await screen.findAllByTestId(/recipe-card/)).toHaveLength(12);

    userEvent.click(screen.getByTestId(SEARCH_BUTTON_DATA_TESTID));

    expect(await screen.findByTestId(CARD_NAME)).toHaveTextContent('Yellow Bird');
  });

  it('3 - Should filter the correct recipes in /meals', async () => {
    mockPromise(mockMeals, mealCategories, mealsByLetter);

    renderWithRouter(<App />, '/meals');

    userEvent.click(screen.getByTestId(SEARCH_ICON_IMAGE));
    userEvent.click(screen.getByTestId(FIRST_LETTER_DATA_TESTID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_DATA_TESTID), 'd');

    expect(await screen.findAllByTestId(/recipe-card/)).toHaveLength(12);

    userEvent.click(screen.getByTestId(SEARCH_BUTTON_DATA_TESTID));

    expect(await screen.findByTestId(CARD_NAME)).toHaveTextContent('Dal fry');
  });
  it('4 - Should display an alert if user inputs more than 1 letter when searching for the first letter in /drinks', () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinkCategories),
      });
    jest.spyOn(window, 'alert').mockImplementation();
    renderWithRouter(<App />, '/drinks');

    userEvent.click(screen.getByTestId(SEARCH_ICON_IMAGE));

    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_DATA_TESTID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_DATA_TESTID);

    userEvent.type(searchInput, 'ya');
    userEvent.click(firstLetterRadio);

    expect(window.alert).toHaveBeenCalled();
  });
  it('5 - Should display an alert if user inputs more than 1 letter when searching for the first letter in /meals', () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockMeals),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealCategories),
      });
    jest.spyOn(window, 'alert').mockImplementation();
    renderWithRouter(<App />, '/meals');

    userEvent.click(screen.getByTestId(SEARCH_ICON_IMAGE));

    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_DATA_TESTID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_DATA_TESTID);

    userEvent.type(searchInput, 'ya');
    userEvent.click(firstLetterRadio);

    expect(window.alert).toHaveBeenCalled();
  });
  it('6 - Should redirect to the correct drink recipe\'s details page', async () => {
    mockPromise(drinks, drinkCategories, oneDrink);

    renderWithRouter(<App />, '/drinks');

    expect(await screen.findByText('GG')).toBeDefined();

    userEvent.click(screen.getByTestId(SEARCH_ICON_IMAGE));

    userEvent.click(screen.getByTestId(RECIPE_NAME_DATA_TESTID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_DATA_TESTID), 'Aquamarine');

    userEvent.click(screen.getByTestId(SEARCH_BUTTON_DATA_TESTID));

    expect(await screen.findByRole('heading', { name: /Aquamarine/i, level: 1 }));
  });
  it('7 - Should redirect to the correct meal recipe\'s details page', async () => {
    mockPromise(mockMeals, mealCategories, oneMeal);

    renderWithRouter(<App />, '/meals');

    expect(await screen.findByText('Corba')).toBeDefined();

    userEvent.click(screen.getByTestId(SEARCH_ICON_IMAGE));
    userEvent.click(screen.getByTestId(RECIPE_NAME_DATA_TESTID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_DATA_TESTID), 'Arrabiata');
    userEvent.click(screen.getByTestId(SEARCH_BUTTON_DATA_TESTID));

    expect(await screen.findByRole('heading', { name: /spicy arrabiata penne/i, level: 1 }));
  });

  it('8 - Should filter by food ingredient name', async () => {
    mockPromise(mockMeals, mealCategories, mealsByIngredient);

    renderWithRouter(<App />, '/meals');

    expect(await screen.findByText('Corba')).toBeDefined();

    userEvent.click(screen.getByTestId(SEARCH_ICON_IMAGE));
    userEvent.click(screen.getByTestId(INGREDIENT_DATA_TESTID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_DATA_TESTID), 'Chicken');
    userEvent.click(screen.getByTestId(SEARCH_BUTTON_DATA_TESTID));

    expect(await screen.findByTestId(CARD_NAME)).toHaveTextContent('Brown Stew Chicken');
  });
  it('9 - Should filter by drink ingredient name', async () => {
    mockPromise(drinks, drinkCategories, drinksByIngredient);

    renderWithRouter(<App />, '/drinks');

    expect(await screen.findByText('GG')).toBeDefined();

    userEvent.click(screen.getByTestId(SEARCH_ICON_IMAGE));
    userEvent.click(screen.getByTestId(INGREDIENT_DATA_TESTID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_DATA_TESTID), 'Light rum');
    userEvent.click(screen.getByTestId(SEARCH_BUTTON_DATA_TESTID));

    expect(await screen.findByTestId(CARD_NAME)).toHaveTextContent('151 Florida Bushwacker');
  });
  it('10 - Should display an alert if no recipe is found', async () => {
    mockPromise(mockMeals, mealCategories, { meals: null });

    jest.spyOn(window, 'alert').mockImplementation();

    renderWithRouter(<App />, '/meals');

    expect(await screen.findByText('Corba')).toBeDefined();

    userEvent.click(screen.getByTestId(SEARCH_ICON_IMAGE));

    userEvent.click(screen.getByTestId(RECIPE_NAME_DATA_TESTID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_DATA_TESTID), 'xablau');

    userEvent.click(screen.getByTestId(SEARCH_BUTTON_DATA_TESTID));

    await waitFor(() => expect(window.alert).toHaveBeenCalled());
  });
});

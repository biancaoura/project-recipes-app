import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import beefMeals from './helpers/beefMeals';
import drinkCategories from './helpers/drinkCategories';
import App from '../App';
import mealCategories from './helpers/mealCategories';
import drinks from './helpers/mockDrinks';
import mockMeals from './helpers/mockMeals';
import ordinaryDrinks from './helpers/ordinaryDrinks';
import renderWithRouter from './helpers/renderwithRouter';

const mockPromise = (type, catList, catRecipes) => {
  jest.spyOn(global, 'fetch');
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(type),
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(catList),
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(catRecipes),
  })
    .mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(type),
    });
};

const CARD_TESTID = '0-card-img';
const BEEF_AND_MUSTARD = 'Beef and Mustard Pie';
const BEEF_CATEGORY_BTN = /beef-category-filter/i;

describe('Test the Recipe component', () => {
  afterEach(() => cleanup());

  it('1 - Should render 12 meals recipe as the page loads', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockMeals),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealCategories),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(beefMeals),
    })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockMeals),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(beefMeals),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockMeals),
      });

    renderWithRouter(<App />, '/meals');

    expect(await screen.findAllByTestId(/recipe-card/)).toHaveLength(12);

    await waitFor(() => userEvent.click(screen.getByTestId(BEEF_CATEGORY_BTN)));

    expect(await screen.findByTestId(CARD_TESTID))
      .toHaveAttribute('alt', BEEF_AND_MUSTARD);

    await waitFor(() => userEvent.click(screen.getByTestId(/all-category-filter/i)));

    expect(await screen.findByTestId(CARD_TESTID))
      .toHaveAttribute('alt', 'Corba');

    await waitFor(() => userEvent.click(screen.getByTestId(BEEF_CATEGORY_BTN)));

    expect(await screen.findByTestId(CARD_TESTID))
      .toHaveAttribute('alt', BEEF_AND_MUSTARD);
  });
  it('2 - Should render 12 drinks as the page loads', async () => {
    mockPromise(drinks, drinkCategories, ordinaryDrinks);

    renderWithRouter(<App />, '/drinks');

    expect(await screen.findAllByTestId(/recipe-card/i)).toHaveLength(12);

    await waitFor(() => userEvent.click(screen.getByRole('button', { name: /Ordinary drink/i })));

    expect(await screen.findByTestId(CARD_TESTID))
      .toHaveAttribute('alt', '3-Mile Long Island Iced Tea');

    await waitFor(() => userEvent.click(screen.getByRole('button', { name: /Ordinary drink/i })));

    expect(await screen.findByTestId(CARD_TESTID))
      .toHaveAttribute('alt', 'GG');
  });
  test('3 - Clicking the "All" button should render the correct recipes in /meals', async () => {
    mockPromise(mockMeals, mealCategories, beefMeals);

    renderWithRouter(<App />, '/meals');

    expect(await screen.findAllByTestId(/recipe-card/)).toHaveLength(12);

    await waitFor(() => userEvent.click(screen.getByTestId(BEEF_CATEGORY_BTN)));

    expect(await screen.findByTestId(CARD_TESTID))
      .toHaveAttribute('alt', BEEF_AND_MUSTARD);

    await waitFor(() => userEvent.click(screen.getByTestId(/all-category-filter/i)));

    expect(await screen.findByTestId(CARD_TESTID))
      .toHaveAttribute('alt', 'Corba');
  });
  it('4 - Clicking the "All" button should render the correct recipes in /drinks', async () => {
    mockPromise(drinks, drinkCategories, ordinaryDrinks);

    renderWithRouter(<App />, '/drinks');

    expect(await screen.findAllByTestId(/recipe-card/)).toHaveLength(12);

    await waitFor(() => userEvent.click(screen.getByTestId(/ordinary drink-category-filter/i)));

    expect(await screen.findByTestId(CARD_TESTID))
      .toHaveAttribute('alt', '3-Mile Long Island Iced Tea');

    await waitFor(() => userEvent.click(screen.getByTestId(/all-category-filter/i)));

    expect(await screen.findByTestId(CARD_TESTID))
      .toHaveAttribute('alt', 'GG');
  });
});

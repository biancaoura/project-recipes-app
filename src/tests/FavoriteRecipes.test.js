import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderwithRouter';

const favoriteRecipesMock = [
  {
    alcoholicOrNot: 'Optional alcohol',
    category: 'Ordinary Drink',
    id: '15997',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    name: 'GG',
    nationality: '',
    type: 'drink',
  },
  {
    alcoholicOrNot: '',
    category: 'Side',
    id: '52977',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    name: 'Corba',
    nationality: 'Turkish',
    type: 'meal',
  },
];

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

const FAVORITE_RECIPES_PATH = '/favorite-recipes';
const FAVORITE_RECIPES = 'favoriteRecipes';

describe('Test the Favorite Recipes page', () => {
  beforeEach(() => {
    localStorage.setItem(FAVORITE_RECIPES, JSON.stringify(favoriteRecipesMock));
    renderWithRouter(<App />, FAVORITE_RECIPES_PATH);
  });

  it('1 - Should render the correct favorited items', async () => {
    expect(await screen.findAllByTestId(/horizontal-name/)).toHaveLength(2);

    userEvent.click(screen.getByTestId('filter-by-meal-btn'));

    expect(await screen.findAllByTestId(/horizontal-name/)).toHaveLength(1);

    userEvent.click(screen.getByTestId('filter-by-all-btn'));

    expect(await screen.findAllByTestId(/horizontal-name/)).toHaveLength(2);

    userEvent.click(screen.getByTestId('filter-by-drink-btn'));

    expect(await screen.findAllByTestId(/horizontal-name/)).toHaveLength(1);
  });

  it('2 - Should unfavorite the selected item', async () => {
    expect(await screen.findAllByTestId(/horizontal-name/)).toHaveLength(2);

    userEvent.click(await screen.findByTestId('0-horizontal-favorite-btn'));

    expect(await screen.findAllByTestId(/horizontal-name/)).toHaveLength(1);

    userEvent.click(await screen.findByTestId('0-horizontal-favorite-btn'));
  });

  it('3 - Should show "Link copied!" after clicking on share button', async () => {
    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');

    jest.spyOn(navigator.clipboard, 'writeText');
    userEvent.click(shareBtn);

    const message = await screen.findAllByText(/link copied!/i);
    const modal = await screen.findAllByTestId(/modal-container/);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(message[0]).toBeInTheDocument();
    expect(modal[0]).toHaveStyle('display: block');

    const closeModalBtn = await screen.findAllByRole('button', { name: '×' });

    userEvent.click(closeModalBtn[0]);

    expect(modal[0]).toHaveStyle('display: none');
  });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderwithRouter';

const mockDoneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

const SPICY_ARRABIATA = 'Spicy Arrabiata';

describe('Test the Done Recipes page', () => {
  beforeEach(async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));

    renderWithRouter(<App />, '/done-recipes');
  });

  it('1 - Should render the correct items when clicking the filter buttons', async () => {
    const firstItem = await screen.findByTestId('0-horizontal-name');

    expect(firstItem).toHaveTextContent(SPICY_ARRABIATA);

    const mealFilterBtn = screen.getByTestId(/filter-by-meal-btn/);
    const drinkFilterBtn = screen.getByTestId(/filter-by-drink-btn/);
    const allFilterBtn = screen.getByTestId(/filter-by-all-btn/);

    userEvent.click(drinkFilterBtn);

    expect(firstItem).toHaveTextContent('Aquamarine');

    userEvent.click(mealFilterBtn);

    expect(firstItem).toHaveTextContent(SPICY_ARRABIATA);

    userEvent.click(allFilterBtn);

    expect(firstItem).toHaveTextContent(SPICY_ARRABIATA);
  });

  it('2 - Should copy the correct link to clipboard when clicking the share button', async () => {
    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');

    window.document.execCommand = jest.fn(() => true);
    userEvent.click(shareBtn);

    const message = await screen.findAllByText(/link copied!/i);
    const modal = await screen.findAllByTestId(/modal-container/);

    expect(message[0]).toBeInTheDocument();
    expect(modal[0]).toHaveStyle('display: block');

    const closeModalBtn = await screen.findAllByRole('button', { name: '×' });

    userEvent.click(closeModalBtn[0]);

    expect(modal[0]).toHaveStyle('display: none');
  });
});

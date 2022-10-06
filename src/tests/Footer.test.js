import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderwithRouter';

describe('Testing footer component', () => {
  let renderHistory;
  beforeEach(() => {
    const { history } = renderWithRouter(<App />, '/profile');
    renderHistory = history;
  });

  it('1 - Should go to "/drinks" when clicking the drink button', () => {
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinkBtn);

    const { location: { pathname } } = renderHistory;
    expect(pathname).toBe('/drinks');
  });

  it('2 - Should go to "/meals" when clicking the meal button', () => {
    const mealBtn = screen.getByTestId('meals-bottom-btn');

    userEvent.click(mealBtn);

    const { location: { pathname } } = renderHistory;
    expect(pathname).toBe('/meals');
  });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderwithRouter';

describe('Testing Header component', () => {
  let renderHistory;
  beforeEach(() => {
    const { history } = renderWithRouter(<App />, '/meals');
    renderHistory = history;
  });

  it('1 - Should redirect to /profile when profile icon is clicked', () => {
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);

    const { location: { pathname } } = renderHistory;
    expect(pathname).toBe('/profile');
  });

  it('2 - Should render the right page titles', () => {
    renderHistory.push('/drinks');
    const drinkLogo = screen.getByAltText(/drinks/i);
    expect(drinkLogo).toBeInTheDocument();

    renderHistory.push('/done-recipes');
    const doneRecipesLogo = screen.getByAltText(/done-recipes/i);
    expect(doneRecipesLogo).toBeInTheDocument();

    renderHistory.push('/favorite-recipes');
    const favoriteRecipesLogo = screen.getByAltText(/favorite-recipes/i);
    expect(favoriteRecipesLogo).toBeInTheDocument();
  });

  it('3 - Should go to /meals when clicking on the logo', () => {
    renderHistory.push('/drinks');

    const logoBtn = screen.getByTestId(/header-button/);

    userEvent.click(logoBtn);

    expect(renderHistory.location.pathname).toBe('/meals');
  });
});

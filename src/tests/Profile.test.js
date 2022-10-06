import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderwithRouter';

describe('Testing Profile page', () => {
  let renderHistory;

  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ email: 'test@test.com' }));
    const { history } = renderWithRouter(<App />, '/profile');
    renderHistory = history;
  });

  it('1 - Should go to /done-recipes when clicking the button', () => {
    const doneRecipesBtn = screen.getByTestId(/profile-done-btn/);

    userEvent.click(doneRecipesBtn);

    const { location: { pathname } } = renderHistory;
    expect(pathname).toBe('/done-recipes');
  });

  it('2 - Should go to /favorite-recipes when clicking the button', () => {
    const favoriteRecipesBtn = screen.getByTestId(/profile-favorite-btn/);

    userEvent.click(favoriteRecipesBtn);

    const { location: { pathname } } = renderHistory;
    expect(pathname).toBe('/favorite-recipes');
  });

  it('3 - Should go to the homepage when logging out', () => {
    const logoutBtn = screen.getByTestId(/profile-logout-btn/);

    userEvent.click(logoutBtn);

    const { location: { pathname } } = renderHistory;
    expect(pathname).toBe('/');
  });
});

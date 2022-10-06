import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderwithRouter';

const EMAIL_TESTID = 'email-input';
const PASSWORD_TESTID = 'password-input';
const LOGIN_BTN = 'login-submit-btn';

describe('Login page test', () => {
  let renderHistory;
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    renderHistory = history;
  });

  it('1 - Should have two inputs and a button', () => {
    expect(screen.getByTestId(EMAIL_TESTID)).toBeDefined();
    expect(screen.getByTestId(PASSWORD_TESTID)).toBeDefined();
    expect(screen.getByTestId(LOGIN_BTN)).toBeDefined();
  });

  it('2 - Button should function properly', () => {
    userEvent.type(screen.getByTestId(EMAIL_TESTID), 'email@email');
    userEvent.type(screen.getByTestId(PASSWORD_TESTID), '1234567');

    expect(screen.getByTestId(LOGIN_BTN)).toBeDisabled();

    userEvent.clear(screen.getByTestId(EMAIL_TESTID));
    userEvent.clear(screen.getByTestId(PASSWORD_TESTID));

    userEvent.type(screen.getByTestId(EMAIL_TESTID), 'email@email.com');
    userEvent.type(screen.getByTestId(PASSWORD_TESTID), '1234567');

    expect(screen.getByTestId(LOGIN_BTN)).toBeEnabled();

    userEvent.click(screen.getByTestId(LOGIN_BTN));

    expect(renderHistory.location.pathname).toBe('/meals');
  });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderwithRouter';
import mockDrinks from './helpers/mockDrinks';
import mockMeals from './helpers/mockMeals';
import App from '../App';

describe('Testing loading message', () => {
  it('1 - Should render loading message in InProgress(meals) component', () => {
    renderWithRouter(<App />, '/meals/53060/in-progress');

    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();
  });

  it('2 - Should render loading message in InProgress(drinks) component', () => {
    renderWithRouter(<App />, '/drinks/13501/in-progress');

    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();
  });
});

describe('Testing MealProgress component', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockMeals),
    }));

    await act(async () => renderWithRouter(<App />, '/meals/52977'));
    localStorage.clear();
  });

  it('1 - Should render a recipe checklist when clicking to start recipe', async () => {
    const startBtn = await screen.findByRole('button', { name: /start recipe/i });
    expect(startBtn).toBeInTheDocument();

    userEvent.click(startBtn);

    expect(startBtn).not.toBeInTheDocument();

    const recipeTitle = await screen.findByRole('heading', { name: /corba/i });
    expect(recipeTitle).toBeInTheDocument();
  });

  it('2 - If the checkbox is checked, it should remain checked after the page is reloaded', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ 52977: ['Lentils - 1 cup ', 'Onion - 1 large'] }));

    const startBtn = await screen.findByRole('button', { name: /start recipe/i });

    userEvent.click(startBtn);

    const recipeTitle = await screen.findByRole('heading', { name: /corba/i });
    expect(recipeTitle).toBeInTheDocument();

    const checkbox = await screen.findAllByRole('checkbox');

    expect(checkbox[0]).toBeChecked();
    expect(checkbox[1]).toBeChecked();
    expect(checkbox[2]).not.toBeChecked();

    delete window.location;
    window.location = { reload: jest.fn() };

    window.location.reload();

    expect(checkbox[0]).toBeChecked();
    expect(checkbox[1]).toBeChecked();
    expect(checkbox[2]).not.toBeChecked();

    userEvent.click(checkbox[2]);

    expect(checkbox[2]).toBeChecked();

    window.location.reload();

    userEvent.click(checkbox[0]);

    window.location.reload();

    expect(checkbox[0]).not.toBeChecked();
  });
});

describe('Testing DrinkProgress component', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockDrinks),
    }));

    await act(async () => renderWithRouter(<App />, '/drinks/15997'));
    localStorage.clear();
  });

  it('1 - Should render a recipe checklist when clicking to start recipe', async () => {
    const startBtn = await screen.findByRole('button', { name: /start recipe/i });
    expect(startBtn).toBeInTheDocument();

    userEvent.click(startBtn);

    expect(startBtn).not.toBeInTheDocument();

    const recipeTitle = await screen.findByRole('heading', { name: /gg/i });
    expect(recipeTitle).toBeInTheDocument();
  });

  it('2 - If the checkbox is checked, it should remain checked after the page is reloaded', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ 15997: ['Galliano - 2 1/2 shots ', 'Ginger ale'] }));

    const startBtn = await screen.findByRole('button', { name: /start recipe/i });

    userEvent.click(startBtn);

    const recipeTitle = await screen.findByRole('heading', { name: /gg/i });
    expect(recipeTitle).toBeInTheDocument();

    const checkbox = await screen.findAllByRole('checkbox');

    expect(checkbox[0]).toBeChecked();
    expect(checkbox[1]).toBeChecked();
    expect(checkbox[2]).not.toBeChecked();

    delete window.location;
    window.location = { reload: jest.fn() };

    window.location.reload();

    expect(checkbox[0]).toBeChecked();
    expect(checkbox[1]).toBeChecked();
    expect(checkbox[2]).not.toBeChecked();

    userEvent.click(checkbox[2]);

    expect(checkbox[2]).toBeChecked();

    window.location.reload();

    checkbox.forEach((el) => expect(el).toBeChecked());

    userEvent.click(checkbox[0]);

    window.location.reload();

    expect(checkbox[0]).not.toBeChecked();
  });
});

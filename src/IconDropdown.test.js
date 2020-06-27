import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IconDropdown from './IconDropdown';

const getValue = () =>
  screen.getByRole('combobox').querySelector(':not(.item) > .text').textContent;

describe('IconDropdown', () => {
  it('renders a combobox', () => {
    render(<IconDropdown />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('shows the menu when the user clicks the trigger', () => {
    render(<IconDropdown />);
    expect(screen.getByRole('combobox')).not.toHaveClass('visible');
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('combobox')).toHaveClass('visible');
  });

  it('renders a list of options', () => {
    render(<IconDropdown />);
    expect(screen.getAllByRole('option')).toHaveLength(1250);
  });

  it('renders an icon for each option', () => {
    render(<IconDropdown />);
    screen.getAllByRole('option').forEach((option) => {
      expect(option.querySelector('.icon')).toBeInTheDocument();
    });
  });

  it('renders a matching label for each option', () => {
    render(<IconDropdown />);
    screen.getAllByRole('option').forEach((option) => {
      const label = option.querySelector('span.text').textContent;
      expect(option.querySelector(`.icon`)).toHaveClass(label);
    });
  });

  it('renders the icons in alphabetical order', () => {
    render(<IconDropdown />);
    const options = screen.getAllByRole('option');
    const labels = options.map((o) => o.querySelector('span.text').textContent);
    expect(labels).toBeSorted();
  });

  it('allows the user to select an icon', () => {
    render(<IconDropdown />);
    fireEvent.click(screen.getByText('coffee'));
    expect(getValue()).toBe('coffee');
  });

  it('renders the initial value if provided', () => {
    render(<IconDropdown value='code' />);
    expect(getValue()).toBe('code');
  });

  it('calls the callback function when the user selects an icon', () => {
    const mockCallback = jest.fn();
    render(<IconDropdown onChange={mockCallback} />);
    fireEvent.click(screen.getByText('user'));
    expect(mockCallback).toBeCalledWith('user');
  });
});

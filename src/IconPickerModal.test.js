import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IconPickerModal from './IconPickerModal';

const getIcons = () => [
  ...document.querySelector('.modal > .content').querySelectorAll('i.icon')
];

const scrollDown = () => {
  const scrollContainer = document
    .querySelector('.modal')
    .querySelector('.infinite-scroll-component');
  fireEvent.scroll(scrollContainer, { y: 200 });
};

describe('IconPickerModal', () => {
  it('renders a button trigger with placeholder text', () => {
    render(<IconPickerModal />);
    expect(screen.getByRole('button')).toHaveTextContent('Select Icon');
  });

  it('renders a button trigger with the icon value if provided', () => {
    render(<IconPickerModal value='coffee' />);
    const triggerIcon = screen.getByRole('button').querySelector('i.icon');
    expect(triggerIcon).toHaveClass('coffee');
  });

  it('does not show the modal on render', () => {
    render(<IconPickerModal />);
    expect(document.querySelector('.modal')).toBe(null);
  });

  it('shows a modal when the user clicks the trigger', () => {
    render(<IconPickerModal />);
    fireEvent.click(screen.getByRole('button'));
    expect(document.querySelector('.modal.visible')).toBeInTheDocument();
  });

  it('renders some icons', () => {
    // Just make sure it renders a bunch of icons. Don't worry about the exact number.
    render(<IconPickerModal />);
    fireEvent.click(screen.getByRole('button'));
    expect(getIcons().length).toBeGreaterThan(10);
  });

  it('limits the number of visible icons', () => {
    render(<IconPickerModal />);
    fireEvent.click(screen.getByRole('button'));
    expect(getIcons().length).toBeLessThan(100);
  });

  it('renders more icons when the user scrolls down', () => {
    render(<IconPickerModal />);
    fireEvent.click(screen.getByRole('button'));
    const originalIconCount = getIcons().length;

    scrollDown();
    expect(getIcons().length).toBeGreaterThan(originalIconCount);
  });

  it('filters the icons when the user types a search query', async () => {
    render(<IconPickerModal />);
    fireEvent.click(screen.getByRole('button'));
    await userEvent.type(screen.getByPlaceholderText('Search...'), 'user');
    getIcons().forEach((icon) => expect(icon.className).toContain('user'));
  });

  it('unfilters the icons when the user clears the search query', async () => {
    render(<IconPickerModal />);
    fireEvent.click(screen.getByRole('button'));
    const originalIconCount = getIcons().length;

    await userEvent.type(screen.getByPlaceholderText('Search...'), 'user');
    expect(getIcons().length).toBeLessThan(originalIconCount);

    await userEvent.clear(screen.getByPlaceholderText('Search...'));
    expect(getIcons()).toHaveLength(originalIconCount);
  });

  it('resets the visible icon count when the user clears the search query', async () => {
    render(<IconPickerModal />);
    fireEvent.click(screen.getByRole('button'));
    const originalIconCount = getIcons().length;

    scrollDown();
    expect(getIcons().length).toBeGreaterThan(originalIconCount);

    await userEvent.type(screen.getByPlaceholderText('Search...'), 'user');
    expect(getIcons().length).toBeLessThan(originalIconCount);

    await userEvent.clear(screen.getByPlaceholderText('Search...'));
    expect(getIcons()).toHaveLength(originalIconCount);
  });

  it('limits the number of visible icons when broad filtering is applied', async () => {
    render(<IconPickerModal />);
    fireEvent.click(screen.getByRole('button'));
    const originalIconCount = getIcons().length;

    await userEvent.type(screen.getByPlaceholderText('Search...'), 'a');
    expect(getIcons()).toHaveLength(originalIconCount);
  });

  it('renders the icons in alphabetical order', () => {
    render(<IconPickerModal />);
    fireEvent.click(screen.getByRole('button'));
    const options = getIcons().map((i) => i.className.replace(' icon', ''));
    expect(options).toBeSorted();
  });

  it('calls the callback function when the user selects an icon', () => {
    const mockCallback = jest.fn();
    render(<IconPickerModal onChange={mockCallback} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(getIcons().find((i) => i.classList.contains('add')));
    expect(mockCallback).toBeCalledWith('add');
  });

  it('closes the modal when the user selects an icon', () => {
    render(<IconPickerModal />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(getIcons().find((i) => i.classList.contains('add')));
    expect(document.querySelector('.modal')).toBe(null);
  });
});

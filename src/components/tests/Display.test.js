import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');

const testShow = {
    name: "Stranger Things",
    summary: "A love letter to the '80s classics that captivated a generation, Stranger Things is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl.",
    seasons: [
        {
            id: 0,
            name:"Season 1",
            episodes:[]
        },
        {
            id: 1,
            name:"Season 2",
            episodes:[]
        },
        {
            id: 2,
            name:"Season 3",
            episodes:[]
        },
        {
            id: 3,
            name:"Season 4",
            episodes:[]
        },
        {
            id: 4,
            name:"Season 5",
            episodes:[]
        },
    ]
};

test('renders without errors with no props', async () => {
    render(<Display />);
 });

test('renders Show component when the button is clicked ', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);

    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    const show = await screen.findByTestId('show-container');
    expect(show).toBeInTheDocument();
 });

test('renders show season options matching your data when the button is clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);
    
    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId('season-option');
        expect(seasonOptions).toHaveLength(5);
    })
 });

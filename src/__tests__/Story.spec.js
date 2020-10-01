import React from 'react';
import { act } from 'react-dom/test-utils';
import { Story } from '../components/Story';
import { singularStory } from '../fixtures';
import { getStory } from '../services/hnApi';
import { render, cleanup, waitForElement } from '@testing-library/react';

beforeEach(() => {
  cleanup;
  jest.resetAllMocks();
});

jest.mock('../services/hnApi', () => ({
  getStory: jest.fn(),
}));

test('renders story component', async () => {
  getStory.mockImplementation(() => Promise.resolve(singularStory));

  await act(async () => {
    const { getByText, queryByTestId } = render(<Story storyId='1' />);
    await waitForElement(() => [
      queryByTestId('story'),
      expect(getByText('Tarnished: Google Responds')).toBeTruthy(),
      expect(queryByTestId('story-by').textContent).toEqual('By:Karl Hadwen'),
    ]);
  });
});

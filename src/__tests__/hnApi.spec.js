import { cleanup } from '@testing-library/react';
import { singularStory, emptySingularStory, storyIds } from '../fixtures';
import {
  getStory,
  getStoryIds,
  storyUrl,
  newStoriesUrl,
} from '../services/hnApi';
import axios from 'axios';

jest.mock('axios');

describe('HackNews Api', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getStory functionality', () => {
    it('requests and gets a story from the HackerNews Api', async () => {
      axios.get.mockImplementation(() =>
        Promise.resolve({ data: singularStory })
      );

      const entity = await getStory(1);
      console.log(entity);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${storyUrl + 1}.json`);
      expect(entity).toEqual(singularStory);
    });

    it('does not retrieve a story from the Api, but handles gracefully', async () => {
      axios.get.mockImplementation(() =>
        Promise.resolve({ data: emptySingularStory })
      );

      const entity = await getStory(1);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${storyUrl + 1}.json`);
      expect(entity).toEqual(emptySingularStory);
    });
  });

  describe('getStoryIds functionality', () => {
    it('requests and gets story ids from the HackerNews Api', async () => {
      axios.get.mockImplementation(() => Promise.resolve({ data: storyIds }));

      const entity = await getStoryIds();
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(newStoriesUrl);
      expect(entity).toEqual(storyIds);
    });
  });
});

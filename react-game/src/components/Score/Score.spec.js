import React from 'react';
import Score from "../Score/Score";
import {act, cleanup, render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {fetchLeaders} from "../../api/leaderBoardApi";

jest.mock('../../api/leaderBoardApi');
afterEach(cleanup);

describe('Score', () => {
  describe('when loading', () => {
    fetchLeaders.mockReturnValue(new Promise(() => {}));
    const component = <Score/>;
    const rendered = render(component, {wrapper: MemoryRouter});

    it('has a loading indicator', () => {
      expect(rendered.baseElement).toHaveTextContent("Loading...");
    });
  })

  describe('when loading failed', () => {
    it('has a generic error message and not the original', async () => {
      const promise = Promise.reject("MOCK!");
      fetchLeaders.mockReturnValue(promise);
      const rendered = render(<Score/>, {wrapper: MemoryRouter});
      await act(() => promise.catch(() => "ok"));

      expect(rendered.baseElement).toHaveTextContent("An error has occurred");
      expect(rendered.baseElement).not.toHaveTextContent("MOCK");
    });
  });

  describe('when data is loaded', () => {
    it("matches snapshot", async () => {
      const testData = [
        {username: 'Test User 2', difficulty: 'middle', timer: 50},
        {username: 'Test User 1', difficulty: 'junior', timer: 40}];
      const promise = Promise.resolve(testData);
      fetchLeaders.mockReturnValue(promise);
      const rendered = render(<Score/>, {wrapper: MemoryRouter});
      await act(() => promise);

      expect(rendered).toMatchSnapshot();
    });
  })
})
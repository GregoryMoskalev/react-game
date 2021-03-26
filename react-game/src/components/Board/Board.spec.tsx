import React from 'react';
import { act, fireEvent, render, RenderResult } from '@testing-library/react';
import ConnectedBoard, { Board } from './Board';
import createStore from '../../store/store'
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { GameField } from "../../commons/gameLogic";
import { Store } from "redux";

const renderWithStore = (Component: any): [RenderResult, Store] => {
  const store = createStore(false);
  const rendered = render(<StaticRouter>
    <Provider store={store}>
      <Component/>
    </Provider>
  </StaticRouter>);
  return [rendered, store];
}

describe('Board component', () => {
  const field: GameField = {
    columns: 4,
    rows: 5,
    flags: ['0x0', '2x3'],
    opened: ['1x1', '4x2', '3x2'],
    bugs: ['2x2', '2x3', '3x3', '4x3'],
  };
  const component = <Board field={field}/>;

  it('renders successfully', () => {
    const rendered = render(component, {wrapper: StaticRouter});
    expect(rendered).toMatchSnapshot();
  });
});

describe('Board connected to store', () => {
  it('renders successfully', () => {
    const [rendered] = renderWithStore(ConnectedBoard);
    expect(rendered).toMatchSnapshot();
  });

  it('BANGS when bug gets opened', () => {
    const [rendered, store] = renderWithStore(ConnectedBoard);

    act(() => {
      store.dispatch({type: 'NEW_GAME', payload: {difficulty: 'junior', seed: 1}}); // could use but need to mock Math.random()
      const cell1x3 = rendered.container.querySelectorAll('.Board-row')[1].querySelectorAll('.Cell')[3];
      fireEvent.click(cell1x3);  // known to be a bug with seed=1
    });

    expect(rendered.container.querySelector('.NewGame')).toHaveTextContent('💀');
  });
});
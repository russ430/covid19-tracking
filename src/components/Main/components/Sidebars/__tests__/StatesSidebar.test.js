import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { StatesSidebar } from '../StatesSidebar';

afterEach(cleanup);

describe('<StatesSidebar />', () => {
  it('given null meta and isFetching is false renders null', () => {
    const mockGetMeta = jest.fn();
    const { getByTestId } = render(
      <StatesSidebar
        error={null}
        getMeta={mockGetMeta}
        meta={null}
        isFetching={false}
      />,
    );
    expect(getByTestId('sidebar-container')).toBeEmpty();
  });

  it('given 3 states renders 3 children correctly', () => {
    const mockGetMeta = jest.fn();
    const meta = {
      al: { name: 'Alabama' },
      ma: { name: 'Massachusetts' },
      wy: { name: 'Wyoming' },
    };
    const { getByText } = render(
      <StatesSidebar
        error={null}
        getMeta={mockGetMeta}
        meta={meta}
        isFetching={false}
      />,
    );
    expect(getByText('Alabama')).toBeInTheDocument();
    expect(getByText('Massachusetts')).toBeInTheDocument();
    expect(getByText('Wyoming')).toBeInTheDocument();
  });

  it('given 1 state it renders correctly and fires redux prop function on click', () => {
    const mockGetMeta = jest.fn();
    const meta = {
      ma: { name: 'Massachusetts' },
    };
    const mockSetSelected = jest.fn();
    const { getByText } = render(
      <StatesSidebar
        error={null}
        getMeta={mockGetMeta}
        meta={meta}
        isFetching={false}
        setSelected={mockSetSelected}
      />,
    );
    expect(getByText('Massachusetts')).toBeInTheDocument();
    userEvent.click(getByText('Massachusetts'));
    expect(mockSetSelected).toHaveBeenCalledWith('ma');
  });
});

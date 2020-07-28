import React from 'react';
import { render } from '@testing-library/react';

import { DataTable } from '../DataTable';

describe('DataTable component', () => {
  it('given null data and no error renders null', () => {
    const mockGetDatafn = jest.fn();
    const { getByTestId } = render(
      <DataTable data={null} error={null} getCurrentData={mockGetDatafn} />,
    );
    expect(getByTestId('container')).toBeEmpty();
  });
});

import React from 'react';
import { render } from '@testing-library/react';

import { NumericalData } from '../NumericalData';

describe('NumericalData component', () => {
  it('given null data renders "-" in place of numbers', () => {
    const { getByTestId } = render(<NumericalData data={null} />);
    expect(getByTestId('cases')).toHaveTextContent('-');
    expect(getByTestId('deaths')).toHaveTextContent('-');
  });

  it('given data renders the correct numbers', () => {
    const data = [{ totalCases: 1, deaths: 1 }];
    const { getByTestId } = render(<NumericalData data={data} />);
    expect(getByTestId('cases')).toHaveTextContent('1');
    expect(getByTestId('deaths')).toHaveTextContent('1');
  });
});

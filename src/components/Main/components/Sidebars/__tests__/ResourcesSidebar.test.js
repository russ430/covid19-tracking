import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { ResourcesSidebar } from '../ResourcesSidebar';

afterEach(cleanup);

describe('<ResourcesSidebar />', () => {
  it('given null resources and isFetching is false renders null', () => {
    const mockGetResources = jest.fn();
    const { getByTestId } = render(
      <ResourcesSidebar
        error={null}
        getResources={mockGetResources}
        resources={null}
        isFetching={false}
      />,
    );
    expect(getByTestId('sidebar-container')).toBeEmpty();
  });

  it('given 1 resource and isFetching is false renders 1 resource', () => {
    const mockGetResources = jest.fn();
    const resources = [
      {
        title: 'Title',
        content: 'Content',
        isoDate: `${new Date('2020-01-01').toISOString()}`,
      },
    ];
    const { getByText } = render(
      <ResourcesSidebar
        error={null}
        getResources={mockGetResources}
        resources={resources}
        isFetching={false}
      />,
    );
    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('Content')).toBeInTheDocument();
  });
});

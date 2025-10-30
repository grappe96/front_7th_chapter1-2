import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import App from '../App.tsx';

describe('Recurring - Repeat Type Selection (integration)', () => {
  it('토글을 켜면 반복 유형 드롭다운이 나타난다', async () => {
    render(React.createElement(App));

    const toggle = await screen.findByLabelText('반복 일정');
    fireEvent.click(toggle);

    expect(await screen.findByText('반복 유형')).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import App from '../../App.tsx';

describe('Recurring - Repeat Type Selection (UI)', () => {
  it('반복 일정 토글을 켜면 반복 유형 선택 드롭다운과 옵션이 나타난다', async () => {
    render(React.createElement(App));

    const repeatToggle = await screen.findByLabelText('반복 일정');
    expect(repeatToggle).toBeInTheDocument();

    fireEvent.click(repeatToggle);

    const typeLabel = await screen.findByText('반복 유형');
    expect(typeLabel).toBeInTheDocument();

    const daily = await screen.findByText('매일');
    const weekly = await screen.findByText('매주');
    const monthly = await screen.findByText('매월');
    const yearly = await screen.findByText('매년');

    expect(daily).toBeInTheDocument();
    expect(weekly).toBeInTheDocument();
    expect(monthly).toBeInTheDocument();
    expect(yearly).toBeInTheDocument();
  });
});

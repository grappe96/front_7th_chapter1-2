import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import App from '../../src/App.tsx';

describe('Recurring - Repeat Type Selection (UI)', () => {
  test('반복 일정 토글을 켜면 반복 유형 선택 드롭다운과 옵션이 나타난다', async () => {
    render(<App />);

    // 반복 일정 토글 존재
    const repeatToggle = await screen.findByLabelText('반복 일정');
    expect(repeatToggle).toBeInTheDocument();

    // 토글 켬
    fireEvent.click(repeatToggle);

    // 반복 유형 선택 드롭다운 및 옵션 검증 (매일/매주/매월/매년)
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

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import App from '../App.tsx';

describe('Recurring - Repeat Type Selection (integration)', () => {
  it('토글을 켜면 반복 유형 드롭다운이 나타난다', async () => {
    render(React.createElement(App));

    const toggle = await screen.findByLabelText('반복 일정');
    fireEvent.click(toggle);

    // MUI Select는 버튼 역할로 렌더링되며, aria-labelledby를 통해 라벨 이름을 가진다
    const selectButton = await screen.findByRole('button', { name: '반복 유형' });
    expect(selectButton).toBeInTheDocument();
  });
});

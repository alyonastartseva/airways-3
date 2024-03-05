import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import { userApi } from '@/services/user/user.service';

import SignUpPage from './SignUp.page';

describe('SignUpPage', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should submit the form successfully', async () => {
    const postUserMock = vi.fn();
    userApi.postUser = postUserMock;

    const emailInput = screen.getByLabelText('Email');
    const securityQuestionSelect = screen.getByTestId('securityQuestion');
    const answerQuestionInput = screen.getByLabelText(
      'Ответ на секретный вопрос'
    );
    const passwordInput = screen.getByLabelText('Пароль');
    const repeatPasswordInput = screen.getByLabelText('Повторить пароль');
    const checkboxInput = screen.getByLabelText(
      'Я прочитал(-а) условия пользовательского соглашения и согласен(-на) с ними'
    );
    const submitButton = screen.getByRole('button', {
      name: 'Зарегистрироваться',
    });

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(securityQuestionSelect, {
      target: { value: 'Как звали Вашего первого питомца?' },
    });
    fireEvent.change(answerQuestionInput, { target: { value: 'Пушистик' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(checkboxInput);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(postUserMock).toHaveBeenCalledTimes(1);
      expect(postUserMock).toHaveBeenCalledWith({
        email: 'test@test.com',
        securityQuestion: 'Как звали Вашего первого питомца?',
        answerQuestion: 'Пушистик',
        password: 'password123',
        repeatPassword: 'password123',
        checkbox: true,
      });
    });
  });
});

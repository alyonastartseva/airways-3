import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import { userApi } from '@services/user/user.service';

import { SignUp } from './index';

vi.mock('@services/user.service');

describe('SignUp', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should render the registration form', () => {
    expect(screen.getByText('Регистрация')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Секретный вопрос')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Ответ на секретный вопрос')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    expect(screen.getByLabelText('Повторить пароль')).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        'Я прочитал(-а) условия пользовательского соглашения и согласен(-на) с ними'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Зарегистрироваться' })
    ).toBeInTheDocument();
  });

  it('should show error messages for invalid input', async () => {
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Пароль');
    const repeatPasswordInput = screen.getByLabelText('Повторить пароль');
    const submitButton = screen.getByRole('button', {
      name: 'Зарегистрироваться',
    });

    userEvent.type(emailInput, 'invalid-email');
    userEvent.click(passwordInput);
    userEvent.click(repeatPasswordInput);
    userEvent.click(submitButton);

    await waitFor(() => {
      screen.debug();
      expect(screen.getByText(/Формат email неверен/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Введите ответ на секретный вопрос/i)
      ).toBeInTheDocument();
      expect(screen.getAllByText(/Введите пароль/i)).toHaveLength(2);
      expect(
        screen.getByText(/Примите условия пользовательского соглашения/i)
      ).toBeInTheDocument();
    });
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

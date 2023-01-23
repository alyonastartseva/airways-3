import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, vi } from 'vitest';

import { RegisterForm } from './index';

afterEach(cleanup);

describe('RegisterForm', () => {
  it('valid data can be loaded and can be sended', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    const { container } = render(<RegisterForm onSubmit={mockSubmit} />);
    const spyAnchorTag = vi.spyOn(user, 'click');

    const testPersonData = {
      firstName: 'testName',
      lastName: 'testLastName',
      password: '@1testPassword',
      repeatPassword: '@1testPassword',
      yearOfBirth: '2001',
      monthOfBirth: '2',
      dayOfBirth: '3',
      telNumber: '11111111',
      telCode: '+93',
    };

    const promises = [];
    for (const [key, value] of Object.entries(testPersonData)) {
      const field = container.querySelector(`[name="${key}"]`);
      switch (field?.tagName) {
        case 'INPUT':
          promises.push(user.type(field, value));
          break;
        case 'SELECT':
          promises.push(
            waitFor(() => expect(field.childElementCount > 1).toBe(true), {
              timeout: 10000,
            }),
            user.selectOptions(field, value)
          );
          break;
        default:
          break;
      }
    }
    await Promise.all(promises);
    const submitButton = container.querySelector('[type="submit"]');
    const form = container.querySelector('form');
    submitButton && user.click(submitButton);
    form && fireEvent.submit(form);

    expect(form).toHaveFormValues(testPersonData);
    expect(spyAnchorTag).toHaveBeenCalled();
  });
});

import { describe, vi } from 'vitest';
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import ModalDestinations from './ModalDestinations';

vi.mock('react-query', () => {
  const testData = [
    {
      airportCode: 'VVO',
      airPortName: 'Кневичи',
      countryName: 'Россия',
      timezone: 'GMT +10',
    },
  ];
  return {
    useMutation: vi.fn().mockReturnValue({ data: testData, isSuccess: true }),
    useQueryClient: vi.fn().mockReturnValue({}),
  };
});

describe('ModalDestinations test', () => {
  it('ModalDestinations button render', () => {
    const name = 'test';
    render(<ModalDestinations name={name} />);
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it('ModalDestinations modal open and close', async () => {
    const name = 'test';
    render(<ModalDestinations name={name} />);
    fireEvent.click(screen.getByText(name));
    expect(screen.queryAllByRole('textbox')).toHaveLength(5);
    expect(screen.getByText('Сохранить')).toBeInTheDocument();
    expect(screen.queryAllByRole('button')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    await waitForElementToBeRemoved(screen.queryByText('Сохранить'));
    expect(screen.queryByText('Сохранить')).not.toBeInTheDocument();
  });

  it('ModalDestinations alert appears when submit with empty form', async () => {
    const name = 'test';
    render(<ModalDestinations name={name} />);
    fireEvent.click(screen.getByText(name));

    fireEvent.submit(screen.getByText('Сохранить'));
    expect(await screen.findAllByRole('alert')).toHaveLength(5);
  });

  describe('ModalDestinations country validation', () => {
    it('ModalDestinations country minLength alert', async () => {
      const name = 'test';
      render(<ModalDestinations name={name} />);
      fireEvent.click(screen.getByText(name));

      fireEvent.input(screen.getByRole('textbox', { name: 'Страна' }), {
        target: {
          value: 't',
        },
      });
      fireEvent.submit(screen.getByText('Сохранить'));

      expect(await screen.findByText('Минимум 3 символа')).toBeInTheDocument();
    });

    it('ModalDestinations country maxLength alert', async () => {
      const name = 'test';
      render(<ModalDestinations name={name} />);
      fireEvent.click(screen.getByText(name));

      fireEvent.input(screen.getByRole('textbox', { name: 'Страна' }), {
        target: {
          value:
            'tlaskdhfgk;dfjhg;ksdfjhg;ksfghj;aghj;akghjakjsghskjdhgksjdghksjdg',
        },
      });
      fireEvent.submit(screen.getByText('Сохранить'));

      expect(
        await screen.findByText('Максимум 58 символов')
      ).toBeInTheDocument();
    });
  });

  describe('ModalDestinations city validation', () => {
    it('ModalDestinations city maxLength alert', async () => {
      const name = 'test';
      render(<ModalDestinations name={name} />);
      fireEvent.click(screen.getByText(name));

      fireEvent.input(screen.getByRole('textbox', { name: 'Город' }), {
        target: {
          value:
            'tlaskdhfgk;dfjhg;ksdfjhg;ksfghj;aghj;akghjakjsghskjdhgksjdghksjdg',
        },
      });
      fireEvent.submit(screen.getByText('Сохранить'));

      expect(await screen.findByText('Максимум 21 символ')).toBeInTheDocument();
    });
  });

  describe('ModalDestinations airportCode validation', () => {
    it('ModalDestinations airportCode minLength alert', async () => {
      const name = 'test';
      render(<ModalDestinations name={name} />);
      fireEvent.click(screen.getByText(name));

      fireEvent.input(screen.getByRole('textbox', { name: 'Код аэропорта' }), {
        target: {
          value: 't',
        },
      });
      fireEvent.submit(screen.getByText('Сохранить'));

      expect(
        await screen.findByText('Код аэропорта должен состоять из 3 символов')
      ).toBeInTheDocument();
    });

    it('ModalDestinations country maxLength alert', async () => {
      const name = 'test';
      render(<ModalDestinations name={name} />);
      fireEvent.click(screen.getByText(name));

      fireEvent.input(screen.getByRole('textbox', { name: 'Код аэропорта' }), {
        target: {
          value:
            'tlaskdhfgk;dfjhg;ksdfjhg;ksfghj;aghj;akghjakjsghskjdhgksjdghksjdg',
        },
      });
      fireEvent.submit(screen.getByText('Сохранить'));

      expect(
        await screen.findByText('Код аэропорта должен состоять из 3 символов')
      ).toBeInTheDocument();
    });
  });
});

// надо замокать createDestination и протестить исчезновение модалки

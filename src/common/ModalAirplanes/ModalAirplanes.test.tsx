import { describe, vi } from 'vitest';
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import ModalAirplanes from './ModalAirplanes';

vi.mock('react-query', () => {
  const testData = [
    {
      model: 'testName',
      aircraftNumber: 1234,
      modelYear: 2001,
      flightRange: 1000,
    },
  ];
  return {
    useMutation: vi.fn().mockReturnValue({ data: testData, isSuccess: true }),
    useQueryClient: vi.fn().mockReturnValue({}),
  };
});

describe('ModalAirplanes test', () => {
  it('ModalAirplanes button render', () => {
    const name = 'test';
    render(<ModalAirplanes name={name} />);
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it('ModalAirplanes modal open and close', async () => {
    const name = 'test';
    render(<ModalAirplanes name={name} />);
    fireEvent.click(screen.getByText(name));
    expect(screen.queryAllByRole('textbox')).toHaveLength(1);
    expect(screen.queryAllByRole('spinbutton')).toHaveLength(3);
    expect(screen.getByText('Сохранить')).toBeInTheDocument();
    expect(screen.queryAllByRole('button')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    await waitForElementToBeRemoved(screen.queryByText('Сохранить'));
    expect(screen.queryByText('Сохранить')).not.toBeInTheDocument();
  });

  it('ModalAirplanes alert appears when submit with empty form', async () => {
    const name = 'test';
    render(<ModalAirplanes name={name} />);
    fireEvent.click(screen.getByText(name));

    fireEvent.submit(screen.getByText('Сохранить'));
    expect(await screen.findAllByRole('alert')).toHaveLength(4);
  });

  describe('ModalAirplanes model validation', () => {
    it('ModalAirplanes model minLength alert', async () => {
      const name = 'test';
      render(<ModalAirplanes name={name} />);
      fireEvent.click(screen.getByText(name));

      fireEvent.input(screen.getByRole('textbox', { name: 'Модель' }), {
        target: {
          value: 't',
        },
      });
      fireEvent.submit(screen.getByText('Сохранить'));

      expect(
        await screen.findByText('В названии минимум 4 символа')
      ).toBeInTheDocument();
    });

    it('ModalAirplanes model maxLength alert', async () => {
      const name = 'test';
      render(<ModalAirplanes name={name} />);
      fireEvent.click(screen.getByText(name));

      fireEvent.input(screen.getByRole('textbox', { name: 'Модель' }), {
        target: {
          value:
            'tlaskdhfgk;dfjhg;ksdfjhg;ksfghj;aghj;akghjakjsghskjdhgksjdghksjdg',
        },
      });
      fireEvent.submit(screen.getByText('Сохранить'));

      expect(
        await screen.findByText('Максимальное количество 15 символов')
      ).toBeInTheDocument();
    });
  });

  describe('ModalAirplanes aircraftNumber validation', () => {
    it('ModalAirplanes aircraftNumber minLength alert', async () => {
      const name = 'test';
      render(<ModalAirplanes name={name} />);
      fireEvent.click(screen.getByText(name));

      fireEvent.input(
        screen.getByRole('spinbutton', { name: 'Номер самолёта' }),
        {
          target: {
            value: '1',
          },
        }
      );
      fireEvent.submit(screen.getByText('Сохранить'));

      expect(await screen.findByText('Минимум 4 символа')).toBeInTheDocument();
    });

    it('ModalAirplanes aircraftNumber maxLength alert', async () => {
      const name = 'test';
      render(<ModalAirplanes name={name} />);
      fireEvent.click(screen.getByText(name));

      fireEvent.input(
        screen.getByRole('spinbutton', { name: 'Номер самолёта' }),
        {
          target: {
            value: '1111111111111111111111111111111111111111111111111111111',
          },
        }
      );
      fireEvent.submit(screen.getByText('Сохранить'));

      expect(
        await screen.findByText('Максимум 30 символов')
      ).toBeInTheDocument();
    });
  });

  describe('ModalAirplanes modelYear validation', () => {
    it('ModalAirplanes modelYear minLength alert', async () => {
      const name = 'test';
      render(<ModalAirplanes name={name} />);
      fireEvent.click(screen.getByText(name));

      fireEvent.input(screen.getByRole('spinbutton', { name: 'Год выпуска' }), {
        target: {
          value: '1910',
        },
      });
      fireEvent.submit(screen.getByText('Сохранить'));

      expect(
        await screen.findByText('Дата должна быть выше или равна 1920 году')
      ).toBeInTheDocument();
    });

    it('ModalAirplanes modelYear maxLength alert', async () => {
      const name = 'test';
      render(<ModalAirplanes name={name} />);
      fireEvent.click(screen.getByText(name));

      fireEvent.input(screen.getByRole('spinbutton', { name: 'Год выпуска' }), {
        target: {
          value: '2030',
        },
      });
      fireEvent.submit(screen.getByText('Сохранить'));

      expect(
        await screen.findByText(
          `Год выпуска не может быть новее ${new Date().getFullYear()} года`
        )
      ).toBeInTheDocument();
    });
  });

  describe('ModalAirplanes flightRange validation', () => {
    it('ModalAirplanes flightRange minLength alert', async () => {
      const name = 'test';
      render(<ModalAirplanes name={name} />);
      fireEvent.click(screen.getByText(name));

      fireEvent.input(
        screen.getByRole('spinbutton', { name: 'Дальность полёта (км)' }),
        {
          target: {
            value: '-10',
          },
        }
      );
      fireEvent.submit(screen.getByText('Сохранить'));

      expect(
        await screen.findByText('Длина полета не может быть отрицательной')
      ).toBeInTheDocument();
    });

    it('ModalAirplanes flightRange maxLength alert', async () => {
      const name = 'test';
      render(<ModalAirplanes name={name} />);
      fireEvent.click(screen.getByText(name));

      fireEvent.input(
        screen.getByRole('spinbutton', { name: 'Дальность полёта (км)' }),
        {
          target: {
            value: '500000',
          },
        }
      );
      fireEvent.submit(screen.getByText('Сохранить'));

      expect(
        await screen.findByText('Ваше значение выше рекорда 41 467км')
      ).toBeInTheDocument();
    });
  });
});

// надо замокать createDestination и протестить исчезновение модалки

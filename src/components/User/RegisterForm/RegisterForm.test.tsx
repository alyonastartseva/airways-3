import '@testing-library/jest-dom';
import { waitFor, renderHook, render, screen } from '@testing-library/react';
import { describe, expect, vi, test } from 'vitest';
import { QueryClientProvider, QueryClient } from 'react-query';
import { FC, PropsWithChildren } from 'react';

import {useCountryQuery} from '@/hooks';
import { ICountry } from '@/interfaces/country.interfaces';

import RegisterForm from './RegisterForm';

export type TGetRenderElementsByAttrName = (
  container: HTMLElement,
  attrName: string
) => IRenderElements;

export interface IRenderElements {
  [key: string]: number;
}

export type TSelectOrInput = HTMLInputElement | HTMLSelectElement;

const testData: ICountry[] = [
  {
    name: 'Afghanistan',
    topLevelDomain: ['.af'],
    alpha2Code: 'AF',
    alpha3Code: 'AFG',
    callingCodes: ['93'],
    capital: 'Kabul',
    altSpellings: ['AF', 'Afġānistān'],
    subregion: 'Southern Asia',
    region: 'Asia',
    population: 40218234,
    latlng: [33.0, 65.0],
    demonym: 'Afghan',
    area: 652230.0,
    timezones: ['UTC+04:30'],
    borders: ['IRN', 'PAK', 'TKM', 'UZB', 'TJK', 'CHN'],
    nativeName: 'افغانستان',
    numericCode: '004',
    currencies: [{ code: 'AFN', name: 'Afghan afghani', symbol: '؋' }],
    languages: [
      {
        iso639_1: 'ps',
        iso639_2: 'pus',
        name: 'Pashto',
        nativeName: 'پښتو',
      },
      {
        iso639_1: 'uz',
        iso639_2: 'uzb',
        name: 'Uzbek',
        nativeName: 'Oʻzbek',
      },
      {
        iso639_1: 'tk',
        iso639_2: 'tuk',
        name: 'Turkmen',
        nativeName: 'Türkmen',
      },
    ],
    translations: {
      br: 'Afghanistan',
      pt: 'Afeganistão',
      nl: 'Afghanistan',
      hr: 'Afganistan',
      fa: 'افغانستان',
      de: 'Afghanistan',
      es: 'Afganistán',
      fr: 'Afghanistan',
      ja: 'アフガニスタン',
      it: 'Afghanistan',
      hu: 'Afganisztán',
    },
    gini: 33.2,
    flag: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg',
    regionalBlocs: [
      {
        acronym: 'SAARC',
        name: 'South Asian Association for Regional Cooperation',
        otherAcronyms: ['EAEU'],
        otherNames: [
          'Comunidad del Caribe',
          'Communauté Caribéenne',
          'Caribische Gemeenschap',
        ],
      },
    ],
    cioc: 'AFG',
  },
];

// search function for elements and their number ("input" or "select")
const getRenderElementsByAttrName: TGetRenderElementsByAttrName = (
  container,
  attrName
) => {
  const renderElements: IRenderElements = {};

  container.querySelectorAll(attrName).forEach((renderElement) => {
    const elementName = (renderElement as TSelectOrInput).name;
    let newCount = 1;

    if (Object.prototype.hasOwnProperty.call(renderElements, elementName)) {
      newCount = renderElements[elementName] + 1;
    }

    renderElements[elementName] = newCount;
  });

  return renderElements;
};

const mockSubmit = vi.fn();

describe('testing react-query should work correct', () => {
  test('test work "useCountryQuery"', async () => {
    const queryClient = new QueryClient();
    const wrapper: FC<PropsWithChildren> = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useCountryQuery(), { wrapper });
    await waitFor(
      () => {
        expect(result.current.isSuccess).toBe(true);
      },
      {
        timeout: 10000,
      }
    );
  });

  test('Flights render spinner', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ isLoading: true });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<RegisterForm onSubmit={mockSubmit} />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getAllByText('Loading...')).toHaveLength(2);
  });

  test('Flights render alert', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({});
    data.useMutation = vi.fn().mockReturnValue({});

    render(<RegisterForm onSubmit={mockSubmit} />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});

describe('testing renders', async () => {
  test('test render "RegisterForm" component', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ data: testData });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<RegisterForm onSubmit={mockSubmit} />);
    expect(data.useQuery).toBeCalledTimes(1);
    const registerFormComponent = screen.getByTestId('register-form');
    expect(registerFormComponent).toBeInTheDocument();
  });

  test('test render "inputs"', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ data: testData });
    data.useMutation = vi.fn().mockReturnValue({});

    const { container } = render(<RegisterForm onSubmit={mockSubmit} />);
    expect(data.useQuery).toBeCalledTimes(1);

    const renderInputElements = getRenderElementsByAttrName(container, 'input');

    const correctRenderInputElements = {
      firstName: 1,
      lastName: 1,
      email: 1,
      telNumber: 1,
      password: 1,
      repeatPassword: 1,
      answer: 1,
    };

    expect(renderInputElements).toEqual(correctRenderInputElements);
  });

  test('test render "selects"', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ data: testData });
    data.useMutation = vi.fn().mockReturnValue({});

    const { container } = render(<RegisterForm onSubmit={mockSubmit} />);
    expect(data.useQuery).toBeCalledTimes(1);

    const renderSelectElements = getRenderElementsByAttrName(
      container,
      'select'
    );

    const correctRenderSelectElements = {
      dayOfBirth: 1,
      monthOfBirth: 1,
      yearOfBirth: 1,
      country: 1,
      telCode: 1,
      question: 1,
    };

    expect(renderSelectElements).toEqual(correctRenderSelectElements);
  });

  test('test render "agree"', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ data: testData });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<RegisterForm onSubmit={mockSubmit} />);
    expect(data.useQuery).toBeCalledTimes(1);

    const registerAgree = screen.getByTestId('register-agree');
    expect(registerAgree).toBeInTheDocument();

    const registerAgreeLink = screen.getByTestId('register-agree-link');
    expect(registerAgreeLink).toBeInTheDocument();
    expect(registerAgreeLink).toHaveAttribute('href', '/terms-and-conditions');
  });

  test('test render "submit btn"', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ data: testData });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<RegisterForm onSubmit={mockSubmit} />);
    expect(data.useQuery).toBeCalledTimes(1);
    const registerSubmitBtn = screen.getByTestId('register-submit-btn');
    expect(registerSubmitBtn).toBeInTheDocument();
  });
});

afterAll(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

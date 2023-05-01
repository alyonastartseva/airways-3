import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { expect, describe, afterEach, vi } from 'vitest';

import { ICountry } from '@/interfaces/country.interfaces';

import Register from './Register';

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

describe('testing renders', () => {
  test('render Register component', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ data: testData });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Register />);
    const registerComponent = screen.getByTestId('register-component');
    expect(registerComponent).toBeInTheDocument();
  });

  test('render header', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ data: testData });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Register />);
    const registerHeader = screen.getByTestId('register-header');
    expect(registerHeader).toBeInTheDocument();
  });

  test('render form', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ data: testData });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Register />);
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });

  test('render description', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ data: testData });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Register />);
    const registerDescription = screen.getByTestId('register-description');
    expect(registerDescription).toBeInTheDocument();
  });
});

describe('testing links', () => {
  test('Link "Membership Guide" rendered to the page and link path is correct', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ data: testData });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Register />);
    const membershipGuideLink = screen.getByTestId('membership-guide-link');
    expect(membershipGuideLink).toBeInTheDocument();
    expect(membershipGuideLink).toHaveAttribute('href', '/membership-guide');
  });
});

afterEach(cleanup);

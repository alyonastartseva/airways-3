import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { IFooterProps } from './Footer';

import { Footer } from './index';

describe('Footer test', () => {
  test('App name rendered to the page', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('UX AIR APP')).toBeInTheDocument();
  });

  test('Link "About us" rendered to the page and link path is correct', () => {
    render(<Footer />);
    const aboutUsLink = screen.getByText('About us');
    expect(aboutUsLink).toBeInTheDocument();
    expect(aboutUsLink).toHaveAttribute('href', '/about-us');
  });

  test('Link "Terms and Conditions" rendered to the page and link path is correct', () => {
    render(<Footer />);
    const termsLink = screen.getByText('Terms and Conditions');
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute('href', '/terms-and-conditions');
  });

  test('Link "Contact Us" rendered to the page and link path is correct', () => {
    render(<Footer />);
    const contactUsLink = screen.getByText('Contact Us');
    expect(contactUsLink).toBeInTheDocument();
    expect(contactUsLink).toHaveAttribute('href', '/contact-us');
  });

  test('Link "Contact Us" rendered to the page and link path is correct', () => {
    render(<Footer />);
    const contactUsLink = screen.getByText('Contact Us');
    expect(contactUsLink).toBeInTheDocument();
    expect(contactUsLink).toHaveAttribute('href', '/contact-us');
  });

  test('Link "App Store" rendered to the page and link path is correct', () => {
    render(<Footer />);
    const appStoreLink = screen.getByTestId('app-store-link');
    expect(appStoreLink).toBeInTheDocument();
    expect(appStoreLink).toHaveAttribute('href', 'https://www.apple.com/');
  });

  test('Link "App Store" rendered to the page and link path is correct', () => {
    render(<Footer />);
    const playStoreLink = screen.getByTestId('play-store-link');
    expect(playStoreLink).toBeInTheDocument();
    expect(playStoreLink).toHaveAttribute('href', 'https://play.google.com/');
  });

  test('Full don`t rendered to the page without departure props', () => {
    render(<Footer />);
    expect(
      screen.queryByRole('heading', { name: 'Departure' })
    ).not.toBeInTheDocument();
  });

  test('Full component rendered to the page when departure props is provided', () => {
    const departureProps = {
      from: 'VKO',
      to: 'VGO',
      time: '15:30',
      date: '2023-05-15',
      type: 'type',
      code: 'code',
      passenger: 1,
      price: 10,
    };
    const returnProps = {
      from: 'VKO',
      to: 'VGO',
      time: '15:30',
      date: '2023-05-15',
      type: 'type',
      code: 'code',
      passenger: 1,
      price: 10,
    };
    const props: IFooterProps = {
      departure: departureProps,
      return: returnProps,
    };
    render(<Footer {...props} />);
    expect(
      screen.getByRole('heading', { name: 'Departure' })
    ).toBeInTheDocument();
  });
});

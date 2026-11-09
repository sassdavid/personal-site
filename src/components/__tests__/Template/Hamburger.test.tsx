import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import routes from '@/data/routes';
import { THEME_CHOICE_ATTRIBUTE } from '@/lib/theme';
import { smartQuotes } from '@/lib/typography';
import Hamburger from '../../Template/Hamburger';

/**
 * jsdom evaluates media queries against a fixed 1024px viewport, where the
 * desktop hide in navigation.css would hide the button whatever the gate did.
 * The gate matters where the button shows, so the stylesheet is read as a
 * phone sees it: the phone-only queries always match and the desktop ones
 * never do.
 */
function asPhone(css: string): string {
  return css
    .replaceAll('(max-width: 735px)', '(min-width: 0px)')
    .replaceAll('(min-width: 736px)', '(max-width: 0px)');
}

describe('Hamburger', () => {
  const styles: HTMLStyleElement[] = [];

  // Cleanup outside the test body, so one failed assertion cannot leave the
  // attribute or the stylesheets behind for the tests after it.
  afterEach(() => {
    document.documentElement.removeAttribute(THEME_CHOICE_ATTRIBUTE);
    for (const style of styles.splice(0)) style.remove();
  });

  // The gate in navigation.css has to beat header.css's `display: flex` whichever
  // `@import` comes first.
  it.each([
    ['header.css', 'navigation.css'],
    ['navigation.css', 'header.css'],
  ])(
    'stays hidden until the bootstrap proves scripts ran (%s, then %s)',
    (...files) => {
      for (const file of files) {
        const style = document.createElement('style');
        style.textContent = asPhone(
          readFileSync(join(process.cwd(), 'app/styles/layout', file), 'utf8'),
        );
        document.head.append(style);
        styles.push(style);
      }

      render(<Hamburger />);
      const button = document.querySelector('.hamburger-button') as Element;
      const display = () => window.getComputedStyle(button).display;

      expect(display()).toBe('none');

      document.documentElement.setAttribute(THEME_CHOICE_ATTRIBUTE, 'system');
      expect(display()).toBe('flex');
    },
  );

  it('opens and closes the menu it controls, and says which it will do', () => {
    render(<Hamburger />);

    const button = screen.getByRole('button', {
      name: 'Open navigation menu',
    });
    const menu = document.getElementById(
      button.getAttribute('aria-controls') ?? '',
    );
    expect(menu).toHaveAttribute('inert');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-label', 'Close navigation menu');
    expect(menu).not.toHaveAttribute('inert');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-label', 'Open navigation menu');
  });

  // The only nav a phone gets, so every promoted route has to be in it and no
  // demoted one. The count stops a demotion passing unmentioned.
  it('lists every primary route and closes when one is followed', () => {
    render(<Hamburger />);
    const button = screen.getByRole('button', {
      name: 'Open navigation menu',
    });
    fireEvent.click(button);

    const primary = routes.filter((route) => route.primary !== false);
    expect(screen.getAllByRole('link')).toHaveLength(primary.length);
    for (const route of primary) {
      expect(
        screen.getByRole('link', { name: smartQuotes(route.label) }),
      ).toBeVisible();
    }

    fireEvent.click(
      screen.getByRole('link', { name: smartQuotes(primary[0].label) }),
    );
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});

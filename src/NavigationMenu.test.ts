import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { getElementBySelector, getElementsBySelectorAll } from './utils';
import { NavigationMenu } from './NavigationMenu';

describe('NavigationMenu', () => {
  let navigationMenu: NavigationMenu;

  beforeEach(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const mockElement = document.createElement('div');
    mockElement.innerHTML = `
      <div class="overlay hasFade"></div>
      <nav class="nav">
        <div data-hamburgermenubutton="">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
      <div class="menu hasFade">
      </div>
    `;

    body.appendChild(mockElement);
    navigationMenu = new NavigationMenu(mockElement);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    navigationMenu.destroy();
  });

  it('should initialize NavigationMenu-class correctly', () => {
    const hamburgerMenuButton = getElementBySelector<HTMLElement>(
      '[data-hamburgermenubutton]'
    );

    expect(hamburgerMenuButton.getAttribute('role')).toBe('button');
    expect(hamburgerMenuButton.getAttribute('tabindex')).toBe('0');
  });

  describe('mouse events', () => {
    it('should add fadeIn class to fadeInElements', async () => {
      const { navigationMenuContainer } = navigationMenu;
      const hamburgerMenuButton = getElementBySelector<HTMLElement>(
        '[data-hamburgermenubutton]'
      );
      const fadeElements = getElementsBySelectorAll<HTMLElement>('.hasFade');

      expect(navigationMenuContainer.classList.contains('openMenu')).toBe(
        false
      );
      for (const element of fadeElements) {
        expect(element.classList.contains('fadeIn')).toBe(false);
        expect(element.classList.contains('fadeIn')).toBe(false);
      }
      await hamburgerMenuButton.click();

      expect(navigationMenuContainer.classList.contains('openMenu')).toBe(true);
      for (const element of fadeElements) {
        expect(element.classList.contains('fadeIn')).toBe(true);
        expect(element.classList.contains('fadeOut')).toBe(false);
      }
      await hamburgerMenuButton.click();

      expect(navigationMenuContainer.classList.contains('openMenu')).toBe(
        false
      );
      for (const element of fadeElements) {
        expect(element.classList.contains('fadeIn')).toBe(false);
        expect(element.classList.contains('fadeOut')).toBe(true);
      }
    });
  });

  describe('keyboard events', () => {
    it('should open menu by pressing Enter & close by pressing Escape', async () => {
      const { navigationMenuContainer } = navigationMenu;
      const hamburgerMenuButton = getElementBySelector<HTMLElement>(
        '[data-hamburgermenubutton]'
      );

      expect(navigationMenuContainer.classList.contains('openMenu')).toBe(
        false
      );
      await hamburgerMenuButton.focus();
      await hamburgerMenuButton.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' })
      );

      expect(navigationMenuContainer.classList.contains('openMenu')).toBe(true);

      await hamburgerMenuButton.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape' })
      );

      expect(navigationMenuContainer.classList.contains('openMenu')).toBe(
        false
      );
    });
  });

  it('should remove event listeners, when destroy method is called', async () => {
    const { navigationMenuContainer } = navigationMenu;
    const hamburgerMenuButton = getElementBySelector<HTMLElement>(
      '[data-hamburgermenubutton]'
    );

    expect(navigationMenuContainer.classList.contains('openMenu')).toBe(false);
    navigationMenu.destroy();

    await hamburgerMenuButton.click();

    expect(navigationMenuContainer.classList.contains('openMenu')).toBe(false);
  });
});

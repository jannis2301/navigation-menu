import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { getElementBySelector } from './utils';
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
    expect(hamburgerMenuButton.classList.contains('openMenu')).toBe(true);
  });
});

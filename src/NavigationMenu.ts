import { getElementBySelector, getElementsBySelectorAll } from './utils';

export class NavigationMenu {
  private el: HTMLElement;
  private hamburgerMenuButton: HTMLElement;
  private fadeElements: NodeListOf<HTMLElement>;

  constructor(el: HTMLElement) {
    this.el = el;
    this.hamburgerMenuButton = getElementBySelector<HTMLElement>(
      '[data-hamburgermenubutton]',
      this.el
    );
    this.fadeElements = getElementsBySelectorAll<HTMLElement>(
      '.hasFade',
      this.el
    );
    this.closeMenuOnClickOutside = this.closeMenuOnClickOutside.bind(this);
    this.toggleHamburgerMenu = this.toggleHamburgerMenu.bind(this);

    this.init();
  }

  get navigationMenuContainer(): HTMLElement {
    return this.el;
  }

  private addAttributesToMenuButton() {
    this.hamburgerMenuButton.setAttribute('role', 'button');
    this.hamburgerMenuButton.setAttribute('tabindex', '0');
  }

  private toggleMenu(isOpen: boolean): void {
    this.el.classList.toggle('openMenu', !isOpen);

    for (const element of this.fadeElements) {
      element.classList.toggle('fadeIn', !isOpen);
      element.classList.toggle('fadeOut', isOpen);
    }
  }

  private toggleHamburgerMenu(event: MouseEvent | KeyboardEvent): void {
    const isEnterKey = (event as KeyboardEvent).key === 'Enter';

    if (event.type === 'click' || isEnterKey) {
      const isOpen = this.el.classList.contains('openMenu') ?? false;
      this.toggleMenu(isOpen);
    }
  }

  private closeMenu(): void {
    this.el.classList.remove('openMenu');

    for (const element of this.fadeElements) {
      element.classList.remove('fadeIn');
      element.classList.add('fadeOut');
    }
  }

  private closeMenuOnClickOutside(event: MouseEvent | KeyboardEvent): void {
    const isEscapeKey = (event as KeyboardEvent).key === 'Escape';

    if (isEscapeKey) {
      this.closeMenu();
    }
  }

  private addEventListeners(): void {
    this.hamburgerMenuButton.addEventListener(
      'click',
      this.toggleHamburgerMenu
    );
    this.hamburgerMenuButton.addEventListener(
      'keydown',
      this.toggleHamburgerMenu
    );
    this.hamburgerMenuButton.addEventListener(
      'keydown',
      this.closeMenuOnClickOutside
    );
  }

  private removeEventListeners(): void {
    this.hamburgerMenuButton.removeEventListener(
      'click',
      this.toggleHamburgerMenu
    );
    this.hamburgerMenuButton.removeEventListener(
      'keydown',
      this.toggleHamburgerMenu
    );
    this.hamburgerMenuButton.removeEventListener(
      'keydown',
      this.closeMenuOnClickOutside
    );
  }

  private init(): void {
    this.addAttributesToMenuButton();
    this.addEventListeners();
  }

  public destroy(): void {
    this.removeEventListeners();
  }
}

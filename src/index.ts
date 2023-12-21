import { NavigationMenu } from './NavigationMenu';
import { getElementBySelector } from './utils';

const navigationMenuContainer = getElementBySelector<HTMLElement>(
  '[data-navigationmenu]'
);

document.addEventListener('DOMContentLoaded', () => {
  new NavigationMenu(navigationMenuContainer);
});

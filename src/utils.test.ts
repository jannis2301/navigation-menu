import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import {
  throwSelectorError,
  getElementBySelector,
  getElementsBySelectorAll,
} from './utils';

describe('utils', () => {
  beforeEach(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const mockElement = document.createElement('div');
    mockElement.classList.add('mockElement');
    mockElement.innerHTML = `
      <div class="element"></div>
      <div class="listElement"></div>
      <div class="listElement"></div>
    `;

    body.appendChild(mockElement);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('throwSelectorError', () => {
    it('should display an error, when a selector is passed', () => {
      const selector = '.noExistingSelector';
      expect(() => throwSelectorError(selector)).toThrow(
        `Element with selector: ${selector} not found`
      );
    });
  });

  describe('getElementBySelector', () => {
    it('should get an element when the right selector is placed', () => {
      const mockElement = getElementBySelector('.mockElement');
      const newElement = getElementBySelector<HTMLElement>(
        '.element',
        mockElement
      );

      expect(newElement).toBeDefined();
      expect(newElement).toBeInstanceOf(Element);
    });
  });

  describe('getElementsBySelectorAll', () => {
    it('should get the list of elements when the right selector is placed', () => {
      const selector = '.listElement';
      const mockElement = getElementBySelector('.mockElement');
      const newElement = getElementsBySelectorAll<HTMLElement>(
        selector,
        mockElement
      );

      expect(newElement).toBeDefined();
      for (const element of newElement) {
        expect(element).toBeInstanceOf(Element);
      }
    });
  });
});

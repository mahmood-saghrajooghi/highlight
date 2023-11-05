export function getQuery(element) {
  if(!element) return null;
  if (element.id) return `#${escapeCSSString(element.id)}`;
  if (element.localName === 'html') return 'html';

  const parent = element.parentNode;

  const parentSelector = getQuery(parent);
  // The element is a text node
  if (!element.localName) {
      // Find the index of the text node:
      const index = Array.prototype.indexOf.call(parent.childNodes, element);
      return `${parentSelector}>textNode:nth-of-type(${index})`;
  } else {
      const index = Array.from(parent.childNodes).filter((child) => child.localName === element.localName).indexOf(element) + 1;
      return `${parentSelector}>${element.localName}:nth-of-type(${index})`;
  }
}

// Colons and spaces are accepted in IDs in HTML but not in CSS syntax
// Similar (but much more simplified) to the CSS.escape() working draft
function escapeCSSString(cssString) {
  return cssString.replace(/(:)/ug, "\\$1");
}

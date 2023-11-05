import { loadAll as loadAllFromStorage } from './storage';

export async function loadAllHighlights() {
  async function loadAllHighlightsOnPage() {
      return await loadAllFromStorage(window.location.hostname + window.location.pathname, window.location.pathname);
  }

  if (document.readyState === 'loading') {
      document.removeEventListener('DOMContentLoaded', loadAllHighlightsOnPage); // Prevent duplicates
      document.addEventListener('DOMContentLoaded', loadAllHighlightsOnPage);
  } else {
      // Run immediately if the page is already loaded
      return await loadAllHighlightsOnPage();
  }
}

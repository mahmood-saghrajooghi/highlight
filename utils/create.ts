import { v4 } from "uuid"
import { getQuery } from '~utils/get-query'
import { highlight } from './highlight'
import { store } from './storage'


export async function createHighlight(
  bg = "yellow",
  color = "black",
  selection = window.getSelection(),
) {
  const selectionString = selection.toString()
  if (!selectionString) return

  const top =
    ((selection.getRangeAt(0).getBoundingClientRect().top + window.scrollY) /
      document.documentElement.scrollHeight) *
    window.innerHeight

  let container = selection.getRangeAt(0).commonAncestorContainer

  while (!container.innerHTML) {
    container = container.parentNode
  }

  const highlightIndex = await store(selection, container, location.hostname + location.pathname, location.href, bg, color, top);

  highlight(selectionString, container, selection, bg, color, highlightIndex)

  return {
    string: selection.toString(),
    container: getQuery(container),
    anchorNode: getQuery(selection.anchorNode),
    anchorNodeParent: getQuery(selection.anchorNode.parentNode),
    anchorOffset: selection.anchorOffset,
    focusNode: getQuery(selection.focusNode),
    focusOffset: selection.focusOffset,
    uuid: v4(),
    createdAt: Date.now(),
    top,
    bg,
    color
  }
}

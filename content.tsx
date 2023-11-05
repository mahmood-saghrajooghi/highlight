import styleText from "data-text:./styles/global.css"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

import Plus from "~components/icons/plus"
import { createHighlight } from "~utils/create"
import { getQuery } from "~utils/get-query"
import { loadAllHighlights } from "~utils/load-all"
import { createStore } from "~utils/store"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}

type Store = {
  highlights:  Awaited<ReturnType<typeof createHighlight>>[]
}

const useStore = createStore<Store>({
  highlights: []
})

function IndexPopup() {
  const [buttonOpen, setButtonOpen] = useState(false)
  // const state = useStore()

  const [highlights, setHighlights] = useState<Store["highlights"]>([])

  function updateBoundingRect() {
    const selection = window.getSelection()

    if (selection.type == "Range") {
      setButtonOpen(true)
    } else {
      setButtonOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mouseup", updateBoundingRect)
    loadAllHighlights().then((res) => {
      setHighlights(res)
    })
    // chrome.storage.local.set({ highlights: {} })
  }, [])

  console.log(highlights)

  return (
    <div className="wrapper">
      <AnimatePresence>
        {buttonOpen && (
          <motion.button
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              closed: { opacity: 0, transform: "translateY(-50%) scale(0.9)" },
              open: { opacity: 1, transform: "translateY(-50%) scale(1)" }
            }}
            transition={{ duration: 0.2 }}
            style={{
              top:
                ((window.getSelection()?.getRangeAt(0).getBoundingClientRect()
                  .top +
                  window.scrollY) /
                  document.documentElement.scrollHeight) *
                  window.innerHeight +
                "px"
            }}
            className="button"
            onMouseDown={async (e) => {
              setButtonOpen(false)

              const highlightData = await createHighlight(
                "var(--indigo)",
                "white",
                window.getSelection()
              )

              console.log(highlights)

              setHighlights((curr) => [...curr, highlightData])
            }}>
            <Plus width="16" />
          </motion.button>
        )}
        {highlights.map(({ uuid, top, bg, ...rest }) => {
          return (
            <motion.button
              key={uuid}
              initial="closed"
              animate="open"
              exit="closed"
              whileHover={{
                width: 40,
                height: 15,
                transition: { delay: 0, duration: 0.2 }
              }}
              variants={{
                closed: { opacity: 0 },
                open: { opacity: 1 }
              }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="highlight-trigger"
              style={{
                top: top + "px",
                background: bg
              }}
              onClick={() => {
                document.querySelector(rest.anchorNodeParent).scrollIntoView({ behavior: "smooth" })
              }}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default IndexPopup

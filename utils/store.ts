import { useEffect, useMemo, useRef, useState } from "react"

export function createStore<T extends Record<string | symbol, any>>(
  initial: T = {} as T
) {
  const state = initial
  const listeners = new Set()

  function subscribe(listener) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }

  function setState(key, value) {
    if (!Object.is(state[key], value)) {
      (state as any)[key] = value
      listeners.forEach((listener: Function) => listener(state, key))
    }
  }

  return function useStore() {
    const rerender = useState<object>()[1]
    const tracked = useRef({})
    const stateRef = useRef<T>(state)

    const proxy = useMemo(() => {
      stateRef.current = state
      return new Proxy<T>(
        {} as T,
        {
          get(_, property) {
            tracked.current[property] = true
            return stateRef.current[property]
          },
          set(_, property, value) {
            setState(property, value)
            return true
          }
        }
      )
    }, [])

    useEffect(() => {
      const unsub = subscribe((_, key) => {
        if (tracked.current[key]) {
          rerender({})
        }
      })

      return unsub
    }, [])

    return proxy
  }
}

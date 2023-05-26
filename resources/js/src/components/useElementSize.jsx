import { useRef, useLayoutEffect, useState, RefObject, useMemo } from "react";

// This is a whole lot of hullabaloo to ensure there is only
// ever 1 ResizeObserver created, but that may be a huge waste
// of time for all I know. Not sure which is more performant
// a ResizeObserver for each element, or a hulaballo like this
const subscribe = Object.assign(
  (el, resizeCallback) => {
    subscribe.callbacks.set(el, resizeCallback);
    if (!subscribe.observerSingleton) {
      subscribe.observerSingleton = new ResizeObserver((entries) => {
        const callbacksEntries = [...subscribe.callbacks];
        callbacksEntries.forEach(([el, cb]) =>
          cb(entries.filter(({ target }) => target === el))
        );
      });
    }
    subscribe.observerSingleton.observe(el);
    return () => {
      subscribe.observerSingleton?.unobserve(el);
      subscribe.callbacks.delete(el);
    };
  },
  {
    callbacks: new Map(),
    observerSingleton: undefined
  }
);

export const useElementSize = (ref) => {
  const elRef = useRef(null);
  const [{ height, width }, setSize] = useState(() => ({
    width: undefined, // so they can set default values
    height: undefined // in the consuming component
  }));

  useLayoutEffect(() => {
    const element = elRef.current || ref?.current;
    if (element) {
      const unsub = subscribe(element, (entries) => {
        entries.forEach(({ contentRect }) => {
          setSize({ height: contentRect.height, width: contentRect.width });
        });
      });
      return () => unsub();
    }
  }, [ref]);

  return useMemo(() => ({ height, width, ref: elRef }), [height, width]);
};

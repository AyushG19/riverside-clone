export function debounce<T extends any[]>(
  func: (...args: T) => void,
  duration: number=300,
) {
  let timer: ReturnType<typeof setTimeout>;
  return function debouncedFn(...args: T) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      //@ts-ignore
      func.apply(this, args);
    }, duration);
  };
}

export const WAIT_TIME = 250;

export function debounce(fn, time) {
  let timeoutId;

  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  function wrapper(...args) {
    cancel();
    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn(...args);
    }, time);
  }

  wrapper.cancel = cancel;

  return wrapper;
}

export function debounceCallback(event, time) {
  const debounced = debounce(event, time);

  return event => {
    event.persist();
    return debounced(event);
  };
}

export default debounce;

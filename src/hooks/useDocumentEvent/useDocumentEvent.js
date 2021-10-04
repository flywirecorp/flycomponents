import { useEffect } from 'react';

function useDocumentEvent(event, callback) {
  useEffect(() => {
    document.addEventListener(event, callback);
    return () => document.removeEventListener(event, callback);
  }, [event, callback]);
}

export default useDocumentEvent;

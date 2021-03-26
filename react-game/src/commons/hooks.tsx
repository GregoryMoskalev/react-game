import { useEffect, useState } from "react";

export function usePromiseFn<T>(promiseFn: () => Promise<T>, deps?: any[]): [T | null, boolean, any] {
  const [result, setResult] = useState<T | null>(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const promise = promiseFn();
    setLoading(true);
    promise.then(
      res => {
        setLoading(false);
        setError(null);
        setResult(res);
      },
      err => {
        setLoading(false)
        setError(err);
      }
    )
  }, deps || []);

  return [result, loading, error];
}

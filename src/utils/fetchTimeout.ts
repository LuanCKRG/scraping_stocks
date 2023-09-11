async function fetchWithTimeout<T = any>(
  url: string,
  options?: RequestInit & { timeout: number }
): Promise<Response & { data: T }> {
  const { timeout = 8000 } = options || {};

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(url, {
    ...options,
    signal: controller.signal,
    
    headers: {
      'Content-Type': 'application/json'
    },
    
  });
  clearTimeout(id);

  return { ...response, data: await response.json() };
}

export default fetchWithTimeout;

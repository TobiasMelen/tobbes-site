const ensureHttpSuccess = (res: Response) => {
  if (!res.ok) {
    throw new Error(
      `Http failure ${res.status} ${res.statusText} calling ${res.url}`
    );
  }
  return res;
};
export const callVercelApi = (
  path: string,
  options?: Omit<RequestInit, "headers"> & {
    //The fetch api is a flexible mess
    headers: Record<string, string>;
  }
) =>
  fetch(`https://api.vercel.com/${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
      ...options?.headers,
    },
  })
    .then(ensureHttpSuccess)
    .then((res) => res.json());

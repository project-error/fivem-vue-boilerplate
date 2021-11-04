import { isEnvBrowser } from '@/utils/misc'

type OptsWithMockData<T> = Partial<RequestInit & { mockResp: T }>;

/**
 * Simple wrapper around fetch API tailored for CEF/NUI use.
 * @param eventName - The endpoint eventname to target
 * @param data - Data you wish to send in the NUI Callback
 * @param opts - Request init opts to pass to fetch API
 * @return returnData - A promise for the data sent back by the NuiCallbacks CB argument
 */
export async function fetchNui<T = any>(
  eventName: string,
  data: unknown = {},
  opts?: OptsWithMockData<T>
): Promise<T> {
  // Should probably dynamically assign GET/POST method depending on passed data
  const options = {
    ...opts,
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };

  // If we are in browser and mockResp option is defined, we can
  // bail out of having to make failing HTTP reqs, speeding up data dispatching.
  if (isEnvBrowser() && opts?.mockResp) return opts.mockResp;

  const resourceName = (window as any).GetParentResourceName();

  const resp = await fetch(`https://${resourceName}/${eventName}`, options);

  return await resp.json();
}

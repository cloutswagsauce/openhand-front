
interface Props {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedAdapter - Return the data wrapped in an adapter
 * @returns - The data from the Strapi API
 */
export async function fetchStrapi({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: Props) {
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(`${import.meta.env.STRAPI_URL || 'http://localhost:1337'}/api/${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  const res = await fetch(url.toString());
  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data;
}

export function getStrapiURL(path = '') {
  return `${import.meta.env.STRAPI_URL || 'http://localhost:1337'}${path}`;
}

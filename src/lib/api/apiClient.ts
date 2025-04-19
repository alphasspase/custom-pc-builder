const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_1;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiClientOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>;
  bodyData?: unknown; // renamed from bodyData for consistency

  // Next.js specific caching options
  cache?: RequestCache;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

function buildQueryString(params: ApiClientOptions['params']): string {
  if (!params) return '';

  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  return query.toString();
}

async function handleResponse<T>(response: Response): Promise<T> {
  console.log('response.ok', response.ok);
  if (!response.ok) {
    try {
    } catch (error) {
      throw new Error('Failed to parse error response', error);
    }
  }

  return await response.json();
}

async function apiRequest<T>(
  endpoint: string,
  method: HttpMethod,
  options: ApiClientOptions = {},
): Promise<T> {
  const { params, bodyData, cache, next, headers, ...rest } = options;
  debugger;
  const queryString = buildQueryString(params);
  const url = `${API_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

  const headersData: HeadersInit = {
    'Content-Type': 'application/json',
    // ...(authToken && { Authorization: `Bearer ${authToken}` }),
    ...headers,
  };

  const config: RequestInit = {
    method,
    headers: headersData,
    ...(bodyData && method !== 'GET' ? { body: JSON.stringify(bodyData) } : {}),
    ...(cache && { cache }),
    ...(next && { next }), // Pass Next.js specific options
    ...rest,
  };

  try {
    console.log('url', url);
    console.log('config', config);
    const response = await fetch(url, config);

    return await handleResponse<T>(response);
  } catch (error) {
    console.log(error);
    throw error; // Ensure the function always throws or returns
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: Omit<ApiClientOptions, 'data'>) =>
    apiRequest<T>(endpoint, 'GET', options),
  post: <T>(endpoint: string, data: unknown, options?: ApiClientOptions) =>
    apiRequest<T>(endpoint, 'POST', { ...options, bodyData: data }),
  put: <T>(endpoint: string, data: unknown, options?: ApiClientOptions) =>
    apiRequest<T>(endpoint, 'PUT', { ...options, bodyData: data }),
  patch: <T>(endpoint: string, data: unknown, options?: ApiClientOptions) =>
    apiRequest<T>(endpoint, 'PATCH', { ...options, bodyData: data }),
  delete: <T>(endpoint: string, options?: ApiClientOptions) =>
    apiRequest<T>(endpoint, 'DELETE', options),
};

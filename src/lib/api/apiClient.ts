const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiClientOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>;
  bodyData?: unknown;
  cache?: RequestCache;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

function buildQueryString(
  params?: Record<string, string | number | boolean | undefined | null>,
): string {
  if (!params) return '';
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value != null) {
      query.append(key, String(value));
    }
  });

  return query.toString();
}

async function apiRequest<T>(
  endpoint: string,
  method: HttpMethod,
  options: ApiClientOptions = {},
): Promise<T> {
  const { params, bodyData, cache, next, headers, ...rest } = options;

  const queryString = buildQueryString(params);
  const url = `${API_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

  const headersData: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  };

  const config: RequestInit = {
    method,
    headers: headersData,
    ...(bodyData && method !== 'GET' ? { body: JSON.stringify(bodyData) } : {}),
    ...(cache && { cache }),
    ...(method === 'GET' && !cache && { cache: 'force-cache' }),
    ...(next && { next }),
    ...rest,
  };

  try {
    const response = await fetch(url, config);
    const res = await response.json();

    return await res;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: Omit<ApiClientOptions, 'bodyData'>) =>
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

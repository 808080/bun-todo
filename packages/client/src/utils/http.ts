export enum HTTPmethods {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
  PUT = 'PUT'
};

export type ResponseMessage<T = any> =
  | {
    success: true;
    data: T;
    cookies?: string;
  }
  | {
    success: false;
    error: string;
  };

const BaseURL = 'http://localhost:3001';

const http = async <R, T = unknown>(method: HTTPmethods, url: string, body?: T, headers?: Record<string, string | undefined>): Promise<ResponseMessage<R>> => {
  const controller = new AbortController();
  const id = setTimeout(controller.abort, 5000);

  const response = await fetch(`${BaseURL}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    signal: controller.signal,
    credentials: 'same-origin',
    body: body ? JSON.stringify(body) : null
  }).catch((err) => {
    console.log(err);
  });
  clearTimeout(id);
  if (!response) return { success: false, error: 'Server error' };
  const result = await response.json();
  const cookies = response.headers.get('set-cookie')
  if (cookies) result.cookies = cookies;
  return result;
};

export default http;
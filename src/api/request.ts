/* eslint-disable @typescript-eslint/no-explicit-any */

import { addQuery, changeParam } from './api.helper';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const getUrl = (url: string, query?: Record<string, any>, param?: Record<string, any>): string => {
  const baseUrl = process.env.NODE_ENV === 'development' ? '' : `http://${window.location.hostname}:4000`;
  const realUrl = baseUrl + changeParam(addQuery(url, query), param);
  return realUrl;
};

async function request<T>({
  method,
  url,
  body,
  query,
  param,
  headerOption,
}: {
  method: Method;
  url: string;
  body?: any;
  query?: Record<string, any>;
  param?: Record<string, any>;
  headerOption: Record<string, any>;
}): Promise<T | void> {
  try {
    const realUrl = getUrl(url, query, param);
    const option: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headerOption,
      },
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
    };
    const res = await fetch(realUrl, option);
    const data = await res.json();
    if (res.status >= 400) throw data;
    return data;
  } catch (error) {
    const err = error as any;
    if (err?.response && err?.response?.status < 500) {
      throw err;
    } else {
      alert('서버 에러');
    }
  }
}

export default request;

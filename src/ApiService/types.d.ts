import { paths } from '../schemas.ts';

export interface RequestOptions {
  body?: unknown;
  params?: unknown;
  headers?: Record<string, string>;
}

export interface RequestObject {
  method: string; //'GET' | 'POST' | 'PUT' | 'DELETE';
  path: keyof paths;
  options?: RequestOptions;
}

export interface RequestResult<T> {
  data?: T;
  error?: Error | string;
  response?: Response;
}

export type ApiResponse<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = paths[Path][Method];

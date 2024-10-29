import { components, paths } from './schemas.ts';

export type DataModel<T> = components['schemas'][T &
  keyof components['schemas']];

export type PathModel<T, U> = paths[T & keyof paths][U &
  keyof paths[T & keyof paths]];
export type BodyModel<T, U> = paths[T & keyof paths][U &
  keyof paths[T & keyof paths]];

// Generic utility type to extract a specific parameter type from an endpoint
export type ParametersOfType<
  Path extends keyof paths,
  Method extends keyof paths[Path],
  ParamType extends 'path' | 'query', // Constrain ParamType to keys of parameters
> = paths[Path][Method] extends { parameters: { [K in ParamType]?: infer P } }
  ? P
  : never;

// Define specific types using the utility type
export type PathParameters<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = ParametersOfType<Path, Method, 'path'>;

export type QueryParameters<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = ParametersOfType<Path, Method, 'query'>;

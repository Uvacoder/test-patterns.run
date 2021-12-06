declare module "*.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare const __DEV__: boolean;
declare const __PROD__: boolean;

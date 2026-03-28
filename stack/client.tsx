import { StackClientApp } from "@stackframe/stack";

export const stackClientApp = new StackClientApp({
  tokenStore: "nextjs-cookie",
  // Manually provide the keys since your .env is not loading
  projectId: "cf98a029-758d-4ee4-8622-78e57ff04e4d", 
  publishableClientKey: "pck_wj13hcqkccxyjy3dz9rz1z81msatdvb41x2x70vry058g",
  
  
});
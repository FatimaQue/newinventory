import { StackServerApp } from '@stackframe/stack';

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  // We explicitly pull from process.env to ensure Turbopack maps them
  projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID || "cf98a029-758d-4ee4-8622-78e57ff04e4d",
  publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY || "pck_wj13hcqkccxyjy3dz9rz1z81msatdvb41x2x70vry058g",
  secretServerKey: process.env.STACK_SECRET_SERVER_KEY || "ssk_kxfmpf8ty7fvtnwe7g6xprms448ga7fkb14r9g4r7sc78",
});
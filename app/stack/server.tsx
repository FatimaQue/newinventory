import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  // By using these keys here, we override the internal env check
  projectId: "cf98a029-758d-4ee4-8622-78e57ff04e4d",
  publishableClientKey: "pck_wj13hcqkccxyjy3dz9rz1z81msatdvb41x2x70vry058g",
  secretServerKey: "ssk_kxfmpf8ty7fvtnwe7g6xprms448ga7fkb14r9g4r7sc78",
});
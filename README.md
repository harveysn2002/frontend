# VORLAY Frontend

Next.js RTL storefront for `vorlay.shop`.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

If build fails on Windows with `.next/trace` locked, stop any running `next dev` terminals for this app and retry.

## Product Images

Current product images are served in local development through `app/api/product-image/route.ts`
from the Cursor-provided image assets. If those local asset paths are unavailable in production,
the route falls back to branded placeholders.

For production, place final images in:

```text
frontend/public/images/products/
```

Then update image paths in `frontend/config/products.ts` from `/api/product-image?...`
to `/images/products/<file-name>.webp`.

## Env

Copy `.env.example` to `.env.local`.

Only `NEXT_PUBLIC_*` values belong here. CAPI tokens must stay in the backend.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

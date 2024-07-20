<!-- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). -->

# Getting Started

First things first (for devs), you need to install manually install the required packages after cloning the repository:

```bash
git clone https://github.com/MemoirApplication/Memoir-App.git --depth 1
cd Memoir-App && git pull
npm install
```

Make a ```.env.local``` file and then update the api keys for Clerk.

## To run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## To run the development electron

```bash
npm run electron-dev 
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, Electron.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Quick Start | Electron.js](https://www.electronjs.org/docs/latest/tutorial/quick-start)
<!-- You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome! -->
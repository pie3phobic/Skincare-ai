import Head from "next/head";
import { Inter } from "@next/font/google";
import Dashboard from "@/components/Dashboard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Skincare Advisor</title>
        <meta name="description" content="AI Job Description Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gradient-to-r from-slate-200 via-neutral-100 to-orange-300 min-h-screen ">
        <div className="flex flex-col items-center justify-center px-4 py-2">
          <h1 className="text-4xl md:text-6xl font-bold">Skincare Advisor</h1>
          <p className="mt-3 text-2xl">
            Get your
            <span className="text-2xl font-bold text-pink-500"> perfect </span>
            skincare routine
          </p>
        </div>
        <Dashboard />
      </main>
    </>
  );
}

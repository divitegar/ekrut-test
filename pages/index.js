import Head from "next/head";
import Form from "./components/Form";

export default function Home() {
  return (
    <div>
      <Head>
        <title>ekrut test</title>
        <meta name="description" content="demo test ekrut" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-[#004376] min-h-screen">
        <Form />
      </main>
    </div>
  );
}

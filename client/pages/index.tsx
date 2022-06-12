import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Bench from "../components/bench/Bench";
import Footer from "../modules/footer/Footer";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Parkerad</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Intro />
      <Benches />

      <Footer />
    </div>
  );
};

const Intro = () => {
  return (
    <section id="intro" className={styles.intro}>
      <div className={styles.title}>
        <h1>Parkerad</h1>
        <h2>A very catchy slogan about benches</h2>
      </div>

      <Link href="/#benches">
        <Image
          src="/icons/arrow-down.png"
          width={64}
          height={64}
          alt="down arrow"
          layout="fixed"
          className={styles.downArrow}
        />
      </Link>
    </section>
  );
};

const Benches = () => {
  return (
    <section id="benches" className={styles.benches}>
      <h1>Bänkar</h1>
      <div>some feature here</div>
      <div className={styles.benchList}>
        <Bench />
        <Bench />
        <Bench />
        <Bench />
        <Bench />
        <Bench />
        <Bench />
        <Bench />
      </div>
    </section>
  );
};

export default Home;

import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Locations from "modules/locations/Locations";
import Footer from "modules/footer/Footer";
import styles from "styles/Home.module.css";
import prisma from "lib/prisma";
import type { Prisma } from "@prisma/client";
import type { LocationReview } from "types/LocationReview";

const Home: NextPage = ({ locations }: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Parkerad</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section id="intro" className={styles.intro}>
        <div className={styles.title}>
          <h1>Parkerad</h1>
          <h2>A very catchy slogan about benches</h2>
        </div>

        <Link href="/#locations">
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

      <section id="locations" className={styles.locations}>
        <h1>Bänkar</h1>
        <div className={styles.locationList}>
          <Locations locations={locations as LocationReview[]} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const createSampleData = async () => {
    let location1: Prisma.LocationCreateInput = {
      locationName: "Trippeln",
      description: "Tre bänkar vid västra Lappkärret",
      coordinates: {
        coordinates: [59.3689071, 18.0672525],
      },
      image: "locations/IMG_20220619_221117.jpg",
      reviews: {
        create: [
          {
            rating: 5,
            comment: "Very nice",
            user: {
              create: {
                username: "Snöderlund",
                email: "sno@derlund.com",
                role: "ADMIN",
              },
            },
          },
          {
            rating: 2,
            user: {
              create: {
                username: "Degen",
                email: "adam@degen.nu",
              },
            },
          },
          {
            rating: 3,
            comment: "No comment",
            user: {
              connectOrCreate: {
                where: {
                  username: "Snöderlund",
                },
                create: {
                  username: "Snöderlund",
                  email: "sno@derlund.se",
                },
              },
            },
          },
        ],
      },
    };

    let location2: Prisma.LocationCreateInput = {
      locationName: "Somewhere",
      coordinates: {
        coordinates: [0, 0],
      },
      reviews: {
        create: [
          {
            rating: 4,
            user: {
              connectOrCreate: {
                where: {
                  username: "Degen",
                },
                create: {
                  username: "Degen",
                  email: "degarn@bagis.ba",
                },
              },
            },
          },
          {
            rating: 1,
            user: {
              connectOrCreate: {
                where: {
                  username: "Vispen",
                },
                create: {
                  username: "Vispen",
                  email: "stor@vispen.se",
                },
              },
            },
          },
        ],
      },
    };

    let location3: Prisma.LocationCreateInput = {
      locationName: "Fippelistan",
      coordinates: {
        coordinates: [42, 69],
      },
    };

    let location4: Prisma.LocationCreateInput = {
      locationName: "Barrösund",
      coordinates: {
        coordinates: [59.926174, 23.86255],
      },
      reviews: {
        create: [
          {
            rating: 5,
            comment: "10/10",
            user: {
              create: {
                username: "Snöderlund",
                email: "sno@derlund.com",
                role: "ADMIN",
              },
            },
          },
        ],
      },
    };

    await prisma.location.create({
      data: location1,
    });

    await prisma.location.create({
      data: location2,
    });

    await prisma.location.create({
      data: location3,
    });

    await prisma.location.create({
      data: location4,
    });
  };

  // await createSampleData();

  const locations = await prisma.location.findMany({
    take: 10,
    include: {
      reviews: {
        include: {
          user: true,
        },
      },
    },
  });

  locations.map((location) => {
    location.image =
      location.image == null
        ? (location.image = "/images/bench.jpg")
        : (location.image = `${process.env.IMG_SRC}/${location.image}`);
  });

  return {
    props: { locations: JSON.parse(JSON.stringify(locations)) },
  };
};

export default Home;

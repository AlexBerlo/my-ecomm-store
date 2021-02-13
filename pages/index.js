import Head from "next/head";
import styles from "../styles/Home.module.css";
import products from "../products.json";
import {initiateCheckout} from "../lib/payments.js";
export default function Home() {
  console.log(
    "NEXT_PUBLIC_STRIPE_API_KEY",
    process.env.NEXT_PUBLIC_STRIPE_API_KEY
  );
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to My Store !</h1>

        <p className={styles.description}>The best store evah!</p>

        <ul className={styles.grid}>
          {products.map((product) => {
            const {id, title, description, image, price} = product;
            return (
              <li className={styles.card} key={id}>
                <a href="#">
                  <img src={image} alt={title} />
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <p>${price}</p>
                </a>
                <p>
                  <button
                    className={styles.button}
                    onClick={() => {
                      initiateCheckout({
                        lineItems: [
                          {
                            price: id,
                            quantity: 1,
                          },
                        ],
                      });
                    }}
                  >
                    Buy now
                  </button>
                </p>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

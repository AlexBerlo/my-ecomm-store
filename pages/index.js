import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import products from "../products.json";
import {FaShoppingCart} from "react-icons/fa";
import {useCart} from "../hooks/use-cart";

export default function Home() {
  console.log(
    "NEXT_PUBLIC_STRIPE_API_KEY",
    process.env.NEXT_PUBLIC_STRIPE_API_KEY
  );

  const {subTotal, totalItems, addToCart, checkout} = useCart();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to My Store !</h1>

        <p className={styles.description}>The best store evah!</p>

        <p className={styles.cartDetails}>
          <strong>Items: {totalItems}</strong>
          <br />
          <strong>Total Cost: {subTotal}$</strong>
          <br />
          <button
            className={`${styles.button} ${styles.cartButton}`}
            onClick={checkout}
          >
            <FaShoppingCart />
            Checkout
          </button>
        </p>

        <ul className={styles.grid}>
          {products.map((product) => {
            const {id, title, description, image, price} = product;
            return (
              <li className={styles.card} key={id}>
                <Link href={`products/${id}`}>
                  <a>
                    <img src={image} alt={title} />
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <p></p>
                  </a>
                </Link>
                <p>
                  <button
                    className={styles.button}
                    onClick={() => {
                      addToCart({id});
                    }}
                  >
                    Add to cart
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

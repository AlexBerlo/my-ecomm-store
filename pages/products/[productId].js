import Head from "next/head";
import styles from "../../styles/Product.module.css";

import {useCart} from "../../hooks/use-cart.js";

import products from "../../products.json";

export const Product = ({product}) => {
  console.log(product);
  const {id, title, description, image, price} = product;
  const {addToCart} = useCart();

  return (
    <div className={styles.container}>
      <Head>
        <title>{title} - Space Jelly</title>
        <link rel="icon" href="/favicon.icon" />
      </Head>

      <main className={styles.main}>
        <div className={styles.productImage}>
          <img src={image} alt={title} />

          <div>
            <h1>{title}</h1>
          </div>

          <p className={styles.description}>{description}</p>

          <p className={styles.description}>${price.toFixed(2)}</p>

          <p>
            <button className={styles.button} onClick={() => addToCart({id})}>
              Buy
            </button>
          </p>
        </div>
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
};

export const getStaticProps = async ({params}) => {
  const product = products.find(({id}) => id === params.productId);
  return {
    props: {
      product: product,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = products.map((product) => {
    return {
      params: {
        productId: product.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default Product;

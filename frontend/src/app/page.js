import Head from 'next/head';
import Image from 'next/legacy/image';
import styles from '@/styles/page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Community Gardens</title>
        <meta name="description" content="Manage your community gardens effectively" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Image
          src="/garden.jpg"
          alt="Community Gardens"
          layout="fill"
          objectFit="cover"
          className={styles.headerImage}
        />
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>COMMUNITY GARDENS</h1>
          <a href="/gardens" className={styles.headerButton}>SEE GARDENS</a>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.infoSection}>
          <h2>What are community gardens?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lobortis tortor eu lorem dapibus mattis. 
            Mauris vel aliquam lorem. Vestibulum vehicula facilisis felis, vel varius eros posuere et. Suspendisse volutpat nisl 
            nec dictum congue. Maecenas risus massa, consequat et fermentum eget, finibus a ante. Phasellus in rhoncus urna. 
            Duis id tellus vel orci mollis convallis. Aliquam a nisi quam. Morbi eu nibh ipsum. Donec luctus ipsum a lorem auctor 
            rhoncus. Vestibulum a malesuada nulla, et laoreet arcu. Aenean arcu ex, posuere vel iaculis vitae, varius quis est.
          </p>
          <p>
            Nullam elementum lectus id ultricies placerat. Vestibulum et ornare ante, id pharetra justo. Duis ornare erat a malesuada 
            vulputate. Pellentesque sollicitudin sodales nulla, a volutpat neque bibendum at. Donec at risus blandit, sagittis mauris 
            et, venenatis tellus. Mauris at suscipit lacus. Etiam eleifend est ligula. Suspendisse imperdiet luctus elit, id faucibus 
            lectus faucibus eu. Aliquam semper condimentum egestas.
          </p>
        </section>
      </main>
    </div>
  );
}

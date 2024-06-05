import styles from '@/styles/catalog/index.module.css'

export const metadata = {
  title: 'BOOKS4KIDS | Catalog',
}

export default function CatalogRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <section className={styles.catalog}>
        <div className='container'>{children}</div>
      </section>
    </main>
  )
}

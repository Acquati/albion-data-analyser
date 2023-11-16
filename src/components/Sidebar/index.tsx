import Link from 'next/link'
import styles from './styles.module.css'

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <Link href="#">Link 1</Link>
      <Link href="#">Link 1</Link>
      <Link href="#">Link 1</Link>
    </div>
  )
}

export default Sidebar

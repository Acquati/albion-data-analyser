import styles from './styles.module.css'

interface ButtonProps {
  children: string
  onClick: () => Promise<void>
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className={styles.buttonGreen} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button

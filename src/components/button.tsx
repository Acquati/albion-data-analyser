interface ButtonProps {
  children: string
  onClick: () => any
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      type="button"
      className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button

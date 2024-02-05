type ButtonType = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonType> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#E02926] rounded-[100px] text-white font-normal hover:bg-red-400 transition-all ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

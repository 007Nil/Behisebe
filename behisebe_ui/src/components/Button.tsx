export type ButtonProps = {
  // onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  // disabled?: boolean;
  style: React.CSSProperties;
  className: string
};

export const Button = ({ children, className, style }: ButtonProps) => {
  return (
    <button
      type='button'
      style={style}
      className={`${className} hover:drop-shadow-xl`}>
      {children}
    </button>
  )
}

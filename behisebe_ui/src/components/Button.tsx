export type ButtonProps = {
    // onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
    // disabled?: boolean;
    // style: React.CSSProperties;
    // className: string
};

export const Button = ({children}: ButtonProps) => {
    return (
        <button className='bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 
        duration-500'>
          {children}
        </button>
      )
}

import { useState } from "react";
import { BsCreditCard, BsArrowRightCircle } from 'react-icons/bs'
import { BiTransferAlt } from 'react-icons/bi'
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { GiExpense, GiSettingsKnobs } from 'react-icons/gi'

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const iconSize: number = 22
  const Menus = [
    { title: "Dashboard", icons: <MdOutlineDashboardCustomize size={iconSize} /> },
    { title: "Credit", icons: <BsCreditCard size={iconSize} />, gap: true },
    { title: "Expense ", icons: <GiExpense size={iconSize} /> },
    { title: "Self Transfer", icons: <BiTransferAlt size={iconSize} /> },
    // { title: "Analytics", icons: "Chart" },
    // { title: "Files ", icons: "Folder", gap: true },
    { title: "Setting", icons: <GiSettingsKnobs size={iconSize} />, gap: true },
  ];
  return (
    <>
      
        <div
          className={` ${open ? "w-60" : "w-20 "
            } h-screen p-5  pt-8 relative duration-300`}
        >
          <div
            className={`absolute cursor-pointer ${open && "-right-3"} top-9 w-7
                   ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}>
            <BsArrowRightCircle size={18} />
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer text-blue-400 text-sm items-center gap-x-4 hover:text-blue-800
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                  } `}
              >
                <div>{Menu.icons}</div>
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* <div >
          <h1 className="text-2xl font-semibold ">Home Page</h1>
        </div> */}
      {/* </div> */}
    </>
  )
}

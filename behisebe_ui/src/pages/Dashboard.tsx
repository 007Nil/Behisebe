import React, { useState } from "react";
import { MdPlaylistAdd } from 'react-icons/md'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { Card, PositiveAndNegativeBarChart, PieChart } from "../components"
import Datepicker from "react-tailwindcss-datepicker";

export const Dashboard = () => {
  const [value, setValue] = useState({
    // startDate: new Date(),
    // endDate: new Date().setMonth(11)
  });

  const handleValueChange = (newValue: React.SetStateAction<{ startDate: Date; endDate: number; }>) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <>
      <div className="mx-auto">
        <div className="flex h-screen">

          <div className="flex-grow pl-4 bg-gray-100">
            <div className="m-2 pt-4 pb-3">
              <h1 className="font-bold">Statistics</h1>
            </div>

            <div className="bg-white rounded-2xl m-2">
              <div>
                <Datepicker value={value} onChange={handleValueChange} />
              </div>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <div className="grid grid-cols-2 gap-2 divide-x">
                <div className="col-span-1">
                  <PositiveAndNegativeBarChart />
                </div>
                <div className="col-span-1">
                  <PieChart />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 pt-8 pb-8">
              <div className="">
                <h1 className="font-bold">Transactions</h1>
                <div className="">
                  Transcations List
                </div>
              </div>


              <div className="t-8 pb-8">
                <h1 className="font-bold">Transfer</h1>
                <div className="w-32 bg-white">
                  dsd
                </div>
              </div>
            </div>
          </div>

          <div className="flex-none pl-4 bg-gray-200">
            <div className="flex flex-row m-2 pt-4 pb-3">
              <div className="grow">
                <h1 className="font-bold">My Funds</h1>
              </div>

              <div className="text-blue-400 cursor-pointer">
                <MdPlaylistAdd size={24} />
              </div>
            </div>

            <div className="items-start m-2 text-right">
              <h2 className="font-semibold">1/1</h2>
            </div>
            {/* Card Div  */}
            <div className="flex m-2 pt-5">
              <div className="flex items-center text-blue-400 cursor-pointer">
                <BsFillArrowLeftCircleFill size={24} />
              </div>
              <div className="flex p-3">
                <Card />
              </div>
              <div className="flex items-center text-blue-400 cursor-pointer">
                <BsFillArrowRightCircleFill size={24} />
              </div>
            </div>
            <div>
              sdsd
            </div>
          </div>


        </div>
      </div>

    </>
  )
}

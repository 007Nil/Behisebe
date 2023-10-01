import React, { useState } from "react";
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
      <div className="bg-gray-200 h-full w-full">
        <div className="mx-auto p-7">
          <div className="flex">

            <div className="flex-grow ">
              <div className="m-2 pt-4">
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



            </div>

            <div className="flex-none pl-4">
              <div className="flex flex-row">
                <div className="grow">
                  My Funds
                </div>

                <div className="">
                  add funds
                </div>
              </div>

              <div className="p-3">
                <Card />
              </div>

            </div>

          </div>

        </div>
      </div>

    </>
  )
}

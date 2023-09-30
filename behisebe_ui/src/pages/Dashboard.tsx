import { Card, PositiveAndNegativeBarChart, PieChart } from "../components"

export const Dashboard = () => {
  return (
    <>
      <div className="mx-auto">
        <div className="flex">

          <div className="flex-grow">
            <div>
              Statistics
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="">
                <PositiveAndNegativeBarChart />
              </div>
              <div className="">
                <PieChart />
              </div>
            </div>


          </div>

          <div className="flex-none">
            <div className="flex flex-row">
              <div className="grow">
                My Funds
              </div>

              <div className="">
                add funds
              </div>
            </div>

            <div>
              <Card />
            </div>

          </div>

        </div>

      </div>
    </>
  )
}

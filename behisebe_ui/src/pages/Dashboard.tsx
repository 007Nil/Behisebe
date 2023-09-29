import { Card } from "../components"

export const Dashboard = () => {
  return (
    <>
      <div className="mx-auto">
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          <div className="lg:col-span-2 sm:col-span-1">
            1
          </div>

          <div className="container">
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

          <div className="sm:col-span-3">
            2asdasdadada
          </div>
          <div>
            3
          </div>

          <div>
            5
          </div>

        </div>

      </div>
    </>
  )
}

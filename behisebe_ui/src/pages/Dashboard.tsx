import { Card } from "../components"

export const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <div className="grid grid-cols-2">
            <div className="col-span-2">
            </div>
            <div className="col-span-1">
              Part 2
            </div>
            <div className="col-span-1">
              part 3
            </div>
          </div>
        </div>
        <div className="">

        <Card/>

        </div>
      </div>
    </>
  )
}

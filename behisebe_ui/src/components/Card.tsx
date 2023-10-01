export const Card = () => {
    return (
        <>
            <div className="relative w-30  lg:w-96 md:w-50 h-60 rounded-2xl font-mono text-white overflow-hidden cursor-pointer transition-all duration-500">


                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center gap-6 p-6 bg-gradient-to-tr from-gray-900 to-gray-700 transition-all duration-100 delay-200 z-20" style={{ transform: "rotateY(0deg)" }}>

                    <div className="flex justify-between items-center">
                        <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png" alt='Smart card' className="w-12" />

                        <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png" alt="Visa image" className="w-12" />
                    </div>


                    <div className="">
                        <label className="hidden">Card Number</label>
                        <input type="text" id="" value="**** **** **** ****"
                            className="outline-none w-full bg-transparent text-center text-2xl" />
                    </div>

                    <div className="w-full flex flex-row justify-between">

                        <div className="w-full flex flex-col">
                            <label>Card holder</label>
                            <input type="text" id="" value="Daniel Castillo Guindos"
                                className="outline-none bg-transparent" />
                        </div>

                        <div className="w-1/4 flex flex-col">
                            <label>Expires</label>
                            <input type="text" id="" value="12/34" className="outline-none bg-transparent" />
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

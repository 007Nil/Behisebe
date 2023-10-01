// import { useState } from 'react'
// import { Button } from './Button';
import { MdNotificationsNone } from 'react-icons/md'
import IMAGE from '../data/images'
import { Button } from './index'

export const Navbar = () => {
    // let Links =[
    //     {name:'HOME',link:'/'},
    //     {name:'SERVICE',link:'/'},
    //     {name:'ABOUT',link:'/'},
    //     {name:'BLOG'S',link:'/'},
    //     {name:'CONTACT',link:'/'},
    //   ];
    //   let [open,setOpen]=useState(false);
    const notification_list: number = 2

    return (
        <>
            <div>
                <div className='pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0'></div>
                <div className='bg-white'>
                    <div className='flex-col flex'>
                        <div className='w-full border-b-2 border-gray-200'>
                            <div className='bg-white h-16 justify-between items-center mx-auto px-4 flex'>
                                <div>
                                    {/* <img src='https://res.cloudinary.com/speedwares/image/upload/v1659284687/windframe-logo-main_daes7r.png'
                                        className='block btn- h-8 w-auto' alt='' /> */}
                                    <h1 className='text-xl font-bold'>Behisebe</h1>
                                </div>
                                {/* For the search bar */}
                                <div className='lg:block mr-auto ml-40 hidden relative max-w-xs'>
                                    <p className='pl-3 items-center flex absolute inset-y-0 left-0 pointer-events-none'>
                                        <span className='justify-center items-center flex'>
                                            <span className='justify-center items-center flex'>
                                                <span className='items-center justify-center flex'>
                                                    <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor'
                                                        stroke-width='2'><path stroke-linecap='round' stroke-linejoin='round' d='M21 21l-6-6m2-5a7 7 0
                      11-14 0 7 7 0 0114 0z'/></svg>
                                                </span>
                                            </span>
                                        </span>
                                    </p>
                                    <input placeholder='Type to search' type='search' className='border border-gray-300 focus:ring-indigo-600
              focus:border-indigo-600 sm:text-sm w-full rounded-lg pt-2 pb-2 pl-10 px-3 py-2'/>
                                </div>


                                <div className='md:space-x-6 justify-end items-center ml-auto flex space-x-3'>
                                    <div className='relative'>
                                        <p className='pt-1 pr-1 pb-1 pl-1 bg-white text-gray-700 rounded-full transition-all duration-200
                hover:text-gray-900 focus:outline-none hover:bg-gray-100'>
                                            <span className='justify-center items-center flex'>
                                                <span className='justify-center items-center flex'>
                                                    <span className='items-center justify-center flex'>
                                                        <Button style={{ color: 'black' }} className='rounded-3xl' ><MdNotificationsNone size={28} /></Button>
                                                    </span>
                                                </span>
                                            </span>
                                        </p>
                                        <p className='px-1.5 py-0.5 font-semibold text-xs items-center bg-blue-400 text-white rounded-full inline-flex
                absolute -top-px -right-1'>{notification_list}</p>
                                    </div>
                                    <div className='justify-center items-center flex relative'>
                                        <img src={IMAGE.image1}
                                            className='object-cover h-9 w-9 rounded-full bg-gray-300' alt='' />
                                    </div>
                                    <div className='justify-center items-center flex relative'>
                                        <Button
                                            style={{ color: 'white' }}
                                            className='bg-blue-400 text-14 rounded-3xl p-2'>
                                            Money Transfer
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

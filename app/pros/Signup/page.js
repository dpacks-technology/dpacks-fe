
import React from 'react'
import Image from 'next/image'
import InputField from '@/app/components/PersonlizedContent/SIgnUp/EmailInput'

function Signup() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className=' bg-secondaryLight dark:bg-secondaryDark shadow-xl h-[30rem] w-[30rem] rounded-3xl'>

        <h1 className='text-4xl m-5 text-center font-bold text-primaryLight dark:text-primaryDark'>Sign Up</h1>
        <form className='flex flex-col items-center'>
          <InputField type={"text"} label={"Name"} placeHolder={"Enter Your Name"} />
          <InputField type={"email"} label={"Email"} placeHolder={"Enter your Email"} />
          <InputField type={"password"} label={"Password"} placeHolder={"Enter your Passowrd"} />
          <InputField type={"password"} label={"Re-Password"} placeHolder={"Re-Enter your Passowrd"} />
            <input type='checkbox' className='m-2' />
            <p>I accept the <span className='text-primaryLight dark:text-primaryDark'>Privacy Policy</span></p>
          </div>
          <button className='bg-primaryLight dark:bg-primaryDark text-secondaryLight dark:text-secondaryDark rounded-full w-1/2 m-5 p-2'>Sign Up</button>


        </form>
      </div>
    </div>
  )
}

export default Signup
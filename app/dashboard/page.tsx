import { Button, Card } from "flowbite-react";
export default function Dashbord() {
  return (
    <>
      <div className="flex justify-center  p-10 items-center gap-5">
        <h1 className="text-5xl">welcome back</h1>
        <div className="w-[100px] h-[100px] bg-[#D9D9D9] rounded-full">
          {/* <img src="" alt="" />    user img*/}
        </div>
        <h2 className="text-4xl">username</h2> {/** username*/}
      </div>
      <div className="flex justify-center items-center gap-7 p-5">
        <Button className="bg-white text-black hover:bg-blue-200  shadow-[0_0_20px_0_rgba(33,150,243,0.7)] rounded-none ">
          All tesks
        </Button>
        <Button className="bg-white text-black hover:bg-green-200  shadow-[0_0_20px_0_rgba(0,255,136,0.7)] rounded-none ">
          completed
        </Button>
        <Button className="bg-white text-black hover:bg-yellow-200  shadow-[0_0_20px_0_rgba(255,235,59,0.7)] rounded-none">
          in progress
        </Button>
      </div>
      <div className="flex justify-center items-center gap-7 p-10">
        <Card className="max-w-[300px]  shadow-[0_0_20px_0_rgba(0,255,136,0.7)]">
          <h1>Send your work on Telegram and let the head know</h1>
          <div className="flex items-center gap-5">
            <button className="rounded-full bg-[#D9D9D9] w-[50px] h-[50px]"></button>
            <p>Today 10:00</p>
          </div>
          <div className="flex justify-end">
            <Button className="bg-green-300 hover:bg-green-400 text-green-800 w-[100px] text-nowrap  ">
              completed
            </Button>
          </div>
        </Card>
        <Card className="max-w-[300px]  shadow-[0_0_20px_0_rgba(255,235,59,0.7)]">
          <h1>Complete the rest code lines and Make it a git</h1>
          <div className="flex items-center gap-5">
            <button className="rounded-full bg-[#D9D9D9] w-[50px] h-[50px]"></button>
            <p>yesterday 11:00</p>
          </div>
          <div className="flex justify-end">
            <Button className="bg-yellow-300 hover:bg-yellow-400 text-yellow-800 w-[100px] text-nowrap ">
              in progress
            </Button>
          </div>
        </Card>
        <Card className="max-w-[300px]  shadow-[0_0_20px_0_rgba(33,150,243,0.7)]">
          <h1>Prepare UI / UX Designs and send them to the frontend Team</h1>
          <div className="flex items-center gap-5">
            <button className="rounded-full bg-[#D9D9D9] w-[50px] h-[50px]"></button>
            <p>Today 9:00</p>
          </div>
          <div className="flex justify-end">
            <Button className="bg-blue-300 hover:bg-blue-400 text-blue-800 w-[100px] text-nowrap ">
              Not Completed
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}

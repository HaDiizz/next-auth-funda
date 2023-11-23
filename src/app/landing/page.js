"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Planet from "../../../public/Planet";
import Model from "../../../public/Scene";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { PencilRuler, Users2, SearchCheck, Code2 } from "lucide-react";
import Link from 'next/link'

const LandingPage = () => {
  return (
    <div className="bg-[#06090F] w-full min-h-screen overflow-hidden bg-cover">
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black md:bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] md:from-gray-700 md:via-gray-900 md:to-black w-full h-screen relative overflow-hidden">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <motion.div
          className="md:absolute md:right-[-27rem] md:top-0"
          animate={{
            rotate: [180, 180, 0, 0, 0],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
          }}
        >
          <Canvas>
            <ambientLight intensity={-0.6} />
            <directionalLight
              castShadow
              position={[5, 5, 5]}
              intensity={0.5}
              shadowMapSize={1024}
            />
            <OrbitControls
              autoRotate={true}
              minDistance={2.5}
              maxDistance={3}
            />
            <Suspense fallback={null}>
              {/* <Planet /> */}
              <Model />
            </Suspense>
            <Environment preset="sunset" />
          </Canvas>
        </motion.div>
        <div className="absolute top-[26%] md:absolute md:left-[5rem] md:top-[16rem] text-white">
          <motion.div
            className="text-center md:text-left"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                scale: 0.8,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.4,
                },
              },
            }}
          >
            <h1 id="title" className="text-red-500 font-bold">
              Share your thoughts
            </h1>
            <h1 className="text-fuchsia-500 font-bold">
              <Typewriter
                options={{
                  strings: [
                    "Spark change",
                    "Make a difference",
                    "Inspire the world",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
          </motion.div>
          <motion.div
            className="max-w-[750px] ml-5 pt-[3rem]"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                scale: 0.8,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.8,
                },
              },
            }}
          >
            <p className="tracking-wider font-semibold">
              Unleash your creativity and expertise by crafting a captivating
              tapestry of content that weaves together information,
              entertainment, and inspiration. Let your words paint vivid
              pictures, your ideas spark curiosity, and your passion ignite the
              imaginations of your readers.
            </p>
          </motion.div>
        </div>
      </div>
      <div className="pt-[10rem] pb-[10rem]">
        <div className="text-center font-bold text-white pb-[4rem]">
          <h1>Features</h1>
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-5">
          <Card className="p-7 hover:bg-indigo-500 hover:text-white delay-75 cursor-pointer">
            <CardHeader className="justify-center">
              <PencilRuler className="w-10 h-10" />
            </CardHeader>
            <CardBody>
              <p>
                Create immersive stories with a distraction-free writing
                interface.
              </p>
            </CardBody>
          </Card>
          <Card className="p-7 hover:bg-indigo-500 hover:text-white delay-75 cursor-pointer">
            <CardHeader className="justify-center">
              <Code2 className="w-10 h-10" />
            </CardHeader>
            <CardBody>
              <p>
                Friendly coding content refers to blog posts, tutorials, and
                other resources.
              </p>
            </CardBody>
          </Card>
          <Card className="p-7 hover:bg-indigo-500 hover:text-white delay-75 cursor-pointer">
            <CardHeader className="justify-center">
              <Users2 className="w-10 h-10" />
            </CardHeader>
            <CardBody>
              <p>Collaborate with other writers and share your work.</p>
            </CardBody>
          </Card>
          <Card className="p-7 hover:bg-indigo-500 hover:text-white delay-75 cursor-pointer">
            <CardHeader className="justify-center">
              <SearchCheck className="w-10 h-10" />
            </CardHeader>
            <CardBody>
              <p>
                Implement user-friendly search functionality to help readers
                easily find the content they're looking for.
              </p>
            </CardBody>
          </Card>
        </div>
        <div className="text-center font-bold text-white pb-[4rem] text-[15rem] pt-[10rem] flex flex-col gap-2 justify-center w-full  items-center gap-y-10">
          <div className="flex md:inline-flex flex-col md:flex-row items-center">
            <h1>Make Your Ideas Come to Life</h1>
            <svg
              aria-hidden="true"
              fill="none"
              focusable="false"
              height="50"
              role="presentation"
              viewBox="0 0 24 24"
              width="50"
              class="text-pink-500 animate-heartbeat animate-bounce"
            >
              <path
                d="M16.44 3.10156C14.63 3.10156 13.01 3.98156 12 5.33156C10.99 3.98156 9.37 3.10156 7.56 3.10156C4.49 3.10156 2 5.60156 2 8.69156C2 9.88156 2.19 10.9816 2.52 12.0016C4.1 17.0016 8.97 19.9916 11.38 20.8116C11.72 20.9316 12.28 20.9316 12.62 20.8116C15.03 19.9916 19.9 17.0016 21.48 12.0016C21.81 10.9816 22 9.88156 22 8.69156C22 5.60156 19.51 3.10156 16.44 3.10156Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Let's get started
            </span>
          </button>
        </div>
      </div>
      <footer class="container mx-auto max-w-7xl pb-12 px-12">
        <div class="flex flex-col justify-center items-center gap-1">
          <p class="text-sm text-default-400">© 2023 NextUI Inc.</p>
          <Link
            class="relative tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-80 active:opacity-disabled transition-opacity flex justify-end items-center gap-2 text-foreground"
            tabindex="0"
            role="link"
            href="https://www.vercel.com?utm_source=nextui&amp;utm_marketing=oss"
            rel="noopener noreferrer"
            target="_blank"
          >
            <p class="font-normal text-white">Deployed on</p>
            <svg
              fill="none"
              height="18"
              viewBox="0 0 4438 1000"
              xmlns="http://www.w3.org/2000/svg"
              class="text-white"
            >
              <path
                d="M2223.75 250C2051.25 250 1926.87 362.5 1926.87 531.25C1926.87 700 2066.72 812.5 2239.38 812.5C2343.59 812.5 2435.47 771.25 2492.34 701.719L2372.81 632.656C2341.25 667.188 2293.28 687.344 2239.38 687.344C2164.53 687.344 2100.94 648.281 2077.34 585.781H2515.16C2518.59 568.281 2520.63 550.156 2520.63 531.094C2520.63 362.5 2396.41 250 2223.75 250ZM2076.09 476.562C2095.62 414.219 2149.06 375 2223.75 375C2298.59 375 2352.03 414.219 2371.41 476.562H2076.09ZM2040.78 78.125L1607.81 828.125L1174.69 78.125H1337.03L1607.66 546.875L1878.28 78.125H2040.78ZM577.344 0L1154.69 1000H0L577.344 0ZM3148.75 531.25C3148.75 625 3210 687.5 3305 687.5C3369.38 687.5 3417.66 658.281 3442.5 610.625L3562.5 679.844C3512.81 762.656 3419.69 812.5 3305 812.5C3132.34 812.5 3008.13 700 3008.13 531.25C3008.13 362.5 3132.5 250 3305 250C3419.69 250 3512.66 299.844 3562.5 382.656L3442.5 451.875C3417.66 404.219 3369.38 375 3305 375C3210.16 375 3148.75 437.5 3148.75 531.25ZM4437.5 78.125V796.875H4296.88V78.125H4437.5ZM3906.25 250C3733.75 250 3609.38 362.5 3609.38 531.25C3609.38 700 3749.38 812.5 3921.88 812.5C4026.09 812.5 4117.97 771.25 4174.84 701.719L4055.31 632.656C4023.75 667.188 3975.78 687.344 3921.88 687.344C3847.03 687.344 3783.44 648.281 3759.84 585.781H4197.66C4201.09 568.281 4203.12 550.156 4203.12 531.094C4203.12 362.5 4078.91 250 3906.25 250ZM3758.59 476.562C3778.13 414.219 3831.41 375 3906.25 375C3981.09 375 4034.53 414.219 4053.91 476.562H3758.59ZM2961.25 265.625V417.031C2945.63 412.5 2929.06 409.375 2911.25 409.375C2820.47 409.375 2755 471.875 2755 565.625V796.875H2614.38V265.625H2755V409.375C2755 330 2847.34 265.625 2961.25 265.625Z"
                fill="currentColor"
              ></path>
            </svg>
          </Link>
        </div>
      </footer>
      {/* <footer class="">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div class="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                class="h-8"
                alt="Flowbite Logo"
              />
              <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">
                Flowbite
              </span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" class="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://flowbite.com/" class="hover:underline">
              Flowbite™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer> */}
    </div>
  );
};

export default LandingPage;

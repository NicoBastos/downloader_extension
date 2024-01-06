import "./style.css"
import "react-tabs/style/react-tabs.css"

import React from "react"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"

import Manualform from "~components/Manualform"

import Instaform from "./components/Instaform"

const Popup = () => {
  return (
    <div className="flex flex-col items-center justify-start min-w-[250px] bg-light text-dark p-4">
      <h1 className="text-xl font-bold dark:text-white mb-1">
        BiteSight Tools
      </h1>{" "}
      <Tabs className="flex flex-col w-full mt-2">
        {" "}
        <TabList className="flex flex-row mb-8">
          {" "}
          <Tab
            selectedClassName="tab-selected hover:bg-blue-500"
            className="flex justify-center items-center min-w-0 px-4 py-1 border border-gray-300 hover:bg-gray-100 focus:outline-none focus:border-blue-300 cursor-pointer text-black transition duration-100 ease-in-out">
            Instagram
          </Tab>
          <Tab
            selectedClassName="tab-selected hover:bg-blue-500"
            className="flex justify-center items-center min-w-0 px-4 py-1 border border-gray-300 hover:bg-gray-100 focus:outline-none focus:border-blue-300 cursor-pointer text-black transition duration-100 ease-in-out">
            Manual
          </Tab>
          <Tab
            selectedClassName="tab-selected hover:bg-blue-500"
            className="flex justify-center items-center min-w-0 px-4 py-1 border border-gray-300 hover:bg-gray-100 focus:outline-none focus:border-blue-300 cursor-pointer text-black transition duration-100 ease-in-out">
            gMaps
          </Tab>
          <Tab
            selectedClassName="tab-selected hover:bg-blue-500"
            className="flex justify-center items-center min-w-0 px-4 py-1 border border-gray-300 hover:bg-gray-100 focus:outline-none focus:border-blue-300 cursor-pointer text-black transition duration-100 ease-in-out">
            Log
          </Tab>
        </TabList>
        <TabPanel className="w-full">
          <Instaform />
        </TabPanel>
        <TabPanel className="w-full">
          <Manualform />
        </TabPanel>
        <TabPanel className="w-full">
          <h2>Google maps content</h2>
        </TabPanel>
        <TabPanel className="w-full">
          <h2>Logs</h2>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default Popup

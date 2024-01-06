import React, { useEffect, useState } from "react"
import { ReactSVG } from "react-svg"

import DynamicSelect from "./DynamicSelect"

const Instaform = () => {
  const [restaurantOptions, setRestaurantOptions] = useState([])
  const [dishName, setDishName] = useState("")
  const [restaurantName, setRestaurantName] = useState("")
  const [apiResponse, setApiResponse] = useState("")
  // const [isAddingNewRestaurant, setIsAddingNewRestaurant] = useState(true)

  useEffect(() => {
    // Fetch restaurant options from the API
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:8000/getAllRestaurants")
        const data = await response.json()
        console.log("data: ", data)
        setRestaurantOptions(data) // Assuming the API returns an array of options
      } catch (error) {
        console.error("Failed to fetch restaurant options:", error)
      }
    }
    fetchRestaurants()
  }, [])

  const downloadVideo = async () => {
    let postUrl = null
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      if (tabs[0] && tabs[0].url) {
        let postUrl = tabs[0].url

        postVideoData(postUrl)
      } else {
        console.error("No active tab found.")
      }
    })

    if (postUrl === null || dishName === "" || restaurantName === "") {
      setApiResponse("Please provide file, restaurant name and dish name.")
      setTimeout(() => {
        setApiResponse("")
      }, 5000)
      return
    }
  }
  const postVideoData = async (postUrl) => {
    const requestBody = {
      post_url: postUrl,
      dish_name: dishName,
      restaurant_name: restaurantName
    }

    try {
      const response = await fetch(
        "http://localhost:8000/InstaAddVideoAsset/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestBody)
        }
      )
      const data = await response.json()
      // Handle the response data
      setApiResponse(data.detail)

      setTimeout(() => {
        setApiResponse("")
      }, 5000)
      if (response.ok) {
        console.log("Video doswnload initiated:", data)
      } else {
        // Handle HTTP errors
        console.error("HTTP Error:", response.status)
      }
    } catch (error) {
      console.error("Request failed:", error)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <form>
        {restaurantOptions.length > 0 ? (
          <DynamicSelect
            restaurantConcepts={restaurantOptions}
            setSelectedRestaurant={setRestaurantName}
          />
        ) : (
          <>Loading...</>
        )}
        <input
          type="text"
          className="border rounded p-2 my-2"
          placeholder="Dish Name"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
        />

        <button
          type="button"
          className="myButton text-white font-bold py-2 px-4 rounded shadow-md"
          onClick={downloadVideo}>
          Download video
        </button>
        {apiResponse != "" ? <p>{apiResponse}</p> : <></>}
      </form>
    </div>
  )
}

export default Instaform

import React, { useEffect, useState } from "react"
import { ReactSVG } from "react-svg"

import DynamicSelect from "./DynamicSelect"

const Instaform = () => {
  const [restaurantOptions, setRestaurantOptions] = useState([])
  const [dishName, setDishName] = useState("")
  const [restaurantName, setRestaurantName] = useState("")
  const [isAddingNewRestaurant, setIsAddingNewRestaurant] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState(null) // State for the selected video
  const [apiResponse, setApiResponse] = useState("")
  const [assetMD, setAssetMD] = useState("")

  useEffect(() => {
    // Fetch restaurant options from the API
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:8000/getAllRestaurants")
        const data = await response.json()
        setRestaurantOptions(data) // Assuming the API returns an array of options
      } catch (error) {
        console.error("Failed to fetch restaurant options:", error)
      }
    }
    fetchRestaurants()
  }, [])

  const handleNewRestaurantClick = async () => {}
  const handleVideoChange = (event) => {
    setSelectedVideo(event.target.files[0])
  }
  const postFormData = async () => {
    // Ensure that a video file is selected
    if (!selectedVideo) {
      console.error("No video file selected.")
      return
    }

    const formData = new FormData()
    formData.append("file", selectedVideo)
    formData.append("dish_name", dishName)
    formData.append("restaurant_name", restaurantName)
    formData.append("source", assetMD)

    try {
      console.log("here: ", formData.get("dish_name"))
      const response = await fetch(
        "http://127.0.0.1:8000/ManualAddVideoAsset/",
        {
          method: "POST",
          body: formData
        }
      )

      if (response.ok) {
        const data = await response.json()
        // Handle the response data
        console.log("Video upload successful:", data)
        setApiResponse(data.detail)

        setTimeout(() => {
          setApiResponse("")
        }, 5000)
      } else {
        // Handle HTTP errors
        console.error("Failed to upload video:", response.status)
      }
    } catch (error) {
      console.error("Error during fetch:", error)
    }
  }

  // This function can be called, for example, on a button click to submit the form data.
  const handleSubmit = async () => {
    // Logic for adding a new restaurant
    if (selectedVideo === null || dishName === "" || restaurantName === "") {
      setApiResponse("Please provide file, restaurant name and dish name.")
      setTimeout(() => {
        setApiResponse("")
      }, 5000)
      return
    }
    setIsAddingNewRestaurant(false)
    await postFormData()
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <form>
        <input
          type="file"
          accept="video/*"
          id="videoInput"
          className="hidden"
          onChange={handleVideoChange}
        />

        <label
          htmlFor="videoInput"
          className="cursor-pointer inline-block rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 my-2">
          Choose File
        </label>

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
        <input
          type="text"
          className="border rounded p-2 my-2"
          placeholder="Video Source"
          value={assetMD}
          onChange={(e) => setAssetMD(e.target.value)}
        />
        <button
          type="button"
          className="myButton text-white font-bold py-2 px-4 rounded shadow-md"
          onClick={handleSubmit}>
          Download video
        </button>
        {apiResponse != "" ? <p>{apiResponse}</p> : <></>}
      </form>
    </div>
  )
}

export default Instaform

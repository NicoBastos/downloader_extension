import React, { useEffect, useRef, useState } from "react"

const DynamicSelect = ({ restaurantConcepts, setSelectedRestaurant }) => {
  const [options, setOptions] = useState(restaurantConcepts)
  const [selectedOption, setSelectedOption] = useState("")
  const [newOption, setNewOption] = useState("")
  const [showOptions, setShowOptions] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setSelectedRestaurant(selectedOption)
  }, [selectedOption])

  const handleInputChange = (e) => {
    setNewOption(e.target.value)
  }

  const addOption = () => {
    if (
      newOption &&
      !options.find((option) => option.concept_name === newOption)
    ) {
      const newOptionObject = {
        value: `option${options.length + 1}`,
        concept_name: newOption
      }
      setOptions([...options, newOptionObject])
      setSelectedOption(newOptionObject.concept_name)
      setNewOption("")
      setShowOptions(false)
    }
  }

  const handleOptionSelect = (option) => {
    console.log("OPTIONS: ", restaurantConcepts)
    setSelectedOption(option.concept_name)
    setShowOptions(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addOption()
    }
  }

  // Calculate the dynamic height of the dropdown
  const optionHeight = 40 // Height per option in pixels
  const calculatedHeight = Math.min(
    options.length * optionHeight + optionHeight,
    128
  ) // 128px is the height of h-32

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div
        className="cursor-pointer rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        onClick={() => setShowOptions(!showOptions)}>
        {selectedOption || "Select Restaurant"}
      </div>

      {showOptions && (
        <ul
          className="absolute mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          style={{ height: `${calculatedHeight}px`, overflowY: "auto" }}>
          {options.map((option, index) => (
            <li
              key={index}
              className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleOptionSelect(option)}>
              {option.concept_name}
            </li>
          ))}
          <li className="border-t border-gray-100">
            <input
              type="text"
              placeholder="Add new option..."
              value={newOption}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2 text-sm text-gray-700 placeholder-gray-400 bg-white border-none focus:ring-0"
            />
          </li>
        </ul>
      )}
    </div>
  )
}

export default DynamicSelect

import { useCallback, useState } from "react"

const STORAGE_KEY = "medicard_location"
const PROMPTED_KEY = "medicard_location_prompted"

export function getStoredLocation() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function hasBeenPrompted() {
  return localStorage.getItem(PROMPTED_KEY) === "1"
}

function markPrompted() {
  localStorage.setItem(PROMPTED_KEY, "1")
}

export function useGeolocation() {
  const [location, setLocation] = useState(() => getStoredLocation())
  const [showPopup, setShowPopup] = useState(
    () => !getStoredLocation() && !hasBeenPrompted() && !!navigator.geolocation
  )

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      markPrompted()
      setShowPopup(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loc))
        setLocation(loc)
        markPrompted()
        setShowPopup(false)
      },
      () => {
        markPrompted()
        setShowPopup(false)
      }
    )
  }, [])

  const skipLocation = useCallback(() => {
    setShowPopup(false)
  }, [])

  return { location, showPopup, requestLocation, skipLocation }
}

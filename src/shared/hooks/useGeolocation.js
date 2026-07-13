import { useEffect } from "react"

const STORAGE_KEY = "medicard_location"

export function getStoredLocation() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function useGeolocation() {
  useEffect(() => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loc))
      },
      (err) => console.warn("Geolocation error:", err.code, err.message)
    )
  }, [])
}

import { useEffect } from "react"
import { X, CheckCircle, AlertCircle } from "lucide-react"

const Toast = ({ message, type = "success", onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!duration) return
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className="fixed right-4 top-4 z-50 animate-slide-in">
      <div
        className={`flex items-center gap-3 rounded-xl border px-5 py-4 shadow-lg backdrop-blur-sm ${
          type === "success"
            ? "border-green-200 bg-green-50 text-green-800"
            : "border-red-200 bg-red-50 text-red-800"
        }`}
      >
        {type === "success" ? (
          <CheckCircle size={20} className="shrink-0 text-green-600" />
        ) : (
          <AlertCircle size={20} className="shrink-0 text-red-600" />
        )}
        <p className="text-sm font-medium">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 rounded-lg p-1 opacity-60 hover:opacity-100"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

export default Toast

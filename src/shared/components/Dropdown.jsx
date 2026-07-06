import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

const Dropdown = ({ label, options = [], value, onChange, name, placeholder = "Select an option" }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const selected = options.find((opt) => opt.value === value)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (opt) => {
    onChange({ target: { name, value: opt.value } })
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-gray-900">{label}</label>}

      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-12 w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none focus:border-blue-500"
        >
          <span className={selected ? "text-gray-900" : "text-gray-400"}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown size={16} className={`shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <>
            <div className="fixed inset-0" onClick={() => setOpen(false)} />
            <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-gray-200 backdrop-blur-sm bg-white/50 shadow-lg">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className={`flex w-full px-4 py-3 text-left text-sm transition-all hover:pl-6 hover:text-main ${
                    value === opt.value ? "bg-blue-50 font-medium text-main" : "text-gray-700"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Dropdown

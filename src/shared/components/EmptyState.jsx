import { Inbox } from "lucide-react"

const EmptyState = ({ icon: Icon = Inbox, title, description }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50/60 px-6 py-16 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-main/10">
      <Icon size={28} className="text-main/70" />
    </div>
    <p className="mt-4 text-base font-medium text-gray-600">{title}</p>
    {description && (
      <p className="mt-1 text-sm text-gray-400">{description}</p>
    )}
  </div>
)

export default EmptyState

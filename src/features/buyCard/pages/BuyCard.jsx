import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Check } from "lucide-react"
import becomeProviderImage from "../../../assets/buyCard.jpg"
import FormInput from "../../../shared/components/Form-Input"
import Dropdown from "../../../shared/components/Dropdown"
import { useHomeData } from "../../home/hooks/home.queries"

const GOVERNORATES = [
  { value: "", label: "Select an option" },
  { value: "cairo", label: "Cairo" },
  { value: "alexandria", label: "Alexandria" },
  { value: "giza", label: "Giza" },
  { value: "sharqia", label: "Sharqia" },
  { value: "dakahlia", label: "Dakahlia" },
  { value: "beheira", label: "Beheira" },
  { value: "gharbia", label: "Gharbia" },
]

const SelectablePlanCard = ({ plan, isSelected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(plan.id)}
    className={`
      relative flex w-1/2 cursor-pointer flex-col justify-between rounded-3xl border p-8 text-left
      transition-all duration-300
      ${
        isSelected
          ? "z-10 scale-100 border-[#3B82F6] bg-white/60 opacity-100 shadow-xl backdrop-blur-sm blur-0"
          : "scale-95 border-[#D6E4FF] bg-white/60 opacity-90 backdrop-blur-sm blur-[1px] hover:blur-0 hover:opacity-100"
      }
    `}
  >
    {plan.badge && (
      <div className="absolute right-5 top-5 rounded-full border border-[#FCD34D] bg-[#FEF3C7] px-3 py-1 text-xs font-medium text-[#D97706]">
        {plan.badge}
      </div>
    )}

    <div>
      <h3 className="mb-6 text-2xl font-bold uppercase text-main">{plan.title}</h3>

      <div className="mb-8 flex items-end gap-2 border-b border-gray-200 pb-4">
        <span className="text-6xl font-semibold text-[#0A1F57]">{plan.price}</span>
        <span className="mb-2 text-lg text-gray-500">EGP</span>
      </div>

      <div className="space-y-4">
        {plan.benefits.map((benefit, i) => (
          <div key={i} className="flex items-center gap-3">
            <Check size={18} className="shrink-0 text-green-600" />
            <p className="text-gray-600">{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  </button>
)

const BuyCard = () => {
  const navigate = useNavigate()
  const { data: homeData } = useHomeData()
  const apiPlans = (homeData?.data?.plans || []).slice(0, 2)

  const plans = apiPlans.map((p) => ({
    id: String(p.id),
    title: p.name,
    price: p.priceAfter,
    badge: p.discountPercentage ? `Save ${Math.round(p.discountPercentage)}%` : null,
    benefits: p.description.split("/").map((s) => s.trim()),
  }))

  const defaultPlanId = plans.length > 0 ? plans[0].id : ""
  const [selectedPlan, setSelectedPlan] = useState(defaultPlanId)
  const [formData, setFormData] = useState({
    plan: defaultPlanId,
    firstName: "",
    secondName: "",
    numberOfCards: "1",
    governorate: "",
    address: "",
    phone: "",
  })

  const planOptions = plans.map((p) => ({ value: p.id, label: p.title }))

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId)
    setFormData((prev) => ({ ...prev, plan: planId }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            <h1 className="mb-8 text-4xl font-bold text-gray-900">
              Ready to join Medicard
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Dropdown
                label="Plan"
                name="plan"
                options={planOptions}
                value={formData.plan}
                onChange={(e) => {
                  handleChange(e)
                  setSelectedPlan(e.target.value)
                }}
              />

              <FormInput
                label="First Name"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />

              <FormInput
                label="Second Name"
                name="secondName"
                placeholder="Enter your second name"
                value={formData.secondName}
                onChange={handleChange}
              />

              <FormInput
                label="Number of Cards"
                name="numberOfCards"
                type="number"
                min="1"
                placeholder="1"
                value={formData.numberOfCards}
                onChange={handleChange}
              />

              <Dropdown
                label="Government"
                name="governorate"
                options={GOVERNORATES}
                value={formData.governorate}
                onChange={handleChange}
              />

              <FormInput
                label="Address"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
              />

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-900">Phone Number</label>
                <div className="grid grid-cols-[auto_1fr] gap-2">
                  <div className="flex h-12 items-center rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-500">
                    +20
                  </div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-main"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-main py-3 font-medium text-white transition hover:bg-sec"
              >
                Buy Now
              </button>
            </form>
          </div>
        </div>

        <div className="relative hidden items-center justify-center overflow-hidden p-8 lg:flex lg:p-12">
          <img
            src={becomeProviderImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover blur-[0.5px]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFF]/80 via-[#F5FCFC]/80 to-[#F2FBF7]/80" />
          <div className="absolute inset-y-0 left-0 w-72 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="relative z-10 flex w-full max-w-2xl gap-6">
            {plans.map((plan) => (
              <SelectablePlanCard
                key={plan.id}
                plan={plan}
                isSelected={selectedPlan === plan.id}
                onSelect={handlePlanSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyCard

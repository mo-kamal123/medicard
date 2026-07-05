import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FormLayout from "../../../shared/components/FormLayout"
import FormInput from "../../../shared/components/Form-Input"
import FormSelect from "../../../shared/components/Form-Select"
import FormTextarea from "../../../shared/components/Form-Textarea"
import { useCategories } from "../hooks/becomeProvider.queries"
import becomeProviderImage from "../../../assets/becomeProviderImage.png"
const BecomeProvider = () => {
  const navigate = useNavigate()
  const { data: categoriesData } = useCategories()
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    contactPerson: "",
    phone: "",
    email: "",
    city: "",
    message: "",
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const categoryOptions = (categoriesData?.data || []).map((cat) => ({
    value: cat.id,
    label: cat.name,
  }))

  return (
    <FormLayout
      title="Become a Provider"
      image={becomeProviderImage}
    >
      <p className="mb-8 text-gray-500">
        Join our network and reach thousands of patients across Egypt.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          label="Clinic / Facility Name"
          name="name"
          placeholder="Enter your facility name"
          value={formData.name}
          onChange={handleChange}
        />

        <FormSelect
          label="Category"
          name="categoryId"
          options={categoryOptions}
          value={formData.categoryId}
          onChange={handleChange}
        />

        <FormInput
          label="Contact Person"
          name="contactPerson"
          placeholder="Full name"
          value={formData.contactPerson}
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Phone"
            name="phone"
            type="tel"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <FormInput
          label="City"
          name="city"
          placeholder="Your city"
          value={formData.city}
          onChange={handleChange}
        />

        <FormTextarea
          label="Message"
          name="message"
          placeholder="Tell us about your facility..."
          value={formData.message}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-main py-3 font-medium text-white transition hover:bg-sec"
        >
          Submit Request
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full text-center text-sm text-gray-400 hover:text-gray-600"
        >
          Back
        </button>
      </form>
    </FormLayout>
  )
}

export default BecomeProvider

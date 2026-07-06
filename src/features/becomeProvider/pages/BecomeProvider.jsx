import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import FormLayout from "../../../shared/components/FormLayout"
import FormInput from "../../../shared/components/Form-Input"
import Dropdown from "../../../shared/components/Dropdown"
import SuccessPopup from "../../../shared/components/SuccessPopup"
import { useCategories, useBecomeProvider } from "../hooks/becomeProvider.queries"
import becomeProviderImage from "../../../assets/becomeProviderImage.png"

const schema = z.object({
  providerName: z.string().min(1, "Facility name is required"),
  category: z.string().min(1, "Please select a category"),
  numberOfBranches: z.coerce.number().int().min(1, "At least 1 branch is required"),
  mainBranchAddress: z.string().min(1, "Main branch address is required"),
  email: z.string().email("Please enter a valid email"),
  phoneNumber: z.string().regex(/^\d{11}$/, "Phone number must be exactly 11 digits"),
})

const BecomeProvider = () => {
  const navigate = useNavigate()
  const { data: categoriesData } = useCategories()
  const { mutate, isPending, error: apiError, isSuccess } = useBecomeProvider()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      providerName: "",
      category: "",
      numberOfBranches: 1,
      mainBranchAddress: "",
      email: "",
      phoneNumber: "",
    },
  })

  const categoryOptions = [
    { value: "", label: "Select a category" },
    ...(categoriesData?.data || []).map((cat) => ({
      value: String(cat.id),
      label: cat.name,
    })),
  ]

  const onSubmit = (data) => {
    mutate({ ...data, category: data.category })
  }

  return (
    <FormLayout title="Become a Provider" image={becomeProviderImage}>
      <p className="mb-8 text-gray-500">
        Join our network and reach thousands of patients across Egypt.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {apiError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {apiError.message}
          </div>
        )}

        <div>
          <FormInput label="Clinic / Facility Name" placeholder="Enter your facility name" {...register("providerName")} />
          {errors.providerName && <p className="mt-1 text-sm text-red-500">{errors.providerName.message}</p>}
        </div>

        <div>
          <Dropdown label="Category" options={categoryOptions} value={watch("category")} {...register("category")} />
          {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>}
        </div>

        <div>
          <FormInput label="Number of Branches" type="number" min="1" {...register("numberOfBranches")} />
          {errors.numberOfBranches && <p className="mt-1 text-sm text-red-500">{errors.numberOfBranches.message}</p>}
        </div>

        <div>
          <FormInput label="Main Branch Address" placeholder="Enter your main branch address" {...register("mainBranchAddress")} />
          {errors.mainBranchAddress && <p className="mt-1 text-sm text-red-500">{errors.mainBranchAddress.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormInput label="Email" type="email" placeholder="Email address" {...register("email")} />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <FormInput label="Phone" type="tel" placeholder="Phone number" {...register("phoneNumber")} />
            {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-main py-3 font-medium text-white transition hover:bg-sec disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Submitting..." : "Submit Request"}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full text-center text-sm text-gray-400 hover:text-gray-600"
        >
          Back
        </button>
      </form>

      {isSuccess && (
        <SuccessPopup
          title="Request Sent!"
          message="We will review your request and get back to you soon."
          buttonText="Back to Home"
          onButtonClick={() => navigate("/")}
        />
      )}
    </FormLayout>
  )
}

export default BecomeProvider

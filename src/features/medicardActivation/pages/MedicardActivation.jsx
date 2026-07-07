import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, ArrowLeft, Phone } from "lucide-react"
import FormLayout from "../../../shared/components/FormLayout"
import FormInput from "../../../shared/components/Form-Input"
import Dropdown from "../../../shared/components/Dropdown"
import SuccessPopup from "../../../shared/components/SuccessPopup"
import { useActivateCard } from "../hooks/activateCard.queries"
import activateCard from "../../../assets/activateCard.jpg"

const MONTHS = [
  { value: "", label: "Month" },
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
]

const DAYS = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
}))

const YEARS = Array.from({ length: 100 }, (_, i) => {
  const year = 2026 - i
  return { value: String(year), label: String(year) }
})

const GENDER_OPTIONS = [
  { value: "", label: "Select an option" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
]

const schema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Second name is required"),
    cardNumber: z.string().min(1, "Card number is required"),
    gender: z.string().min(1, "Please select your gender"),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    nationalId: z.string().min(1, "National ID is required"),
    passportNumber: z.string().optional(),
    birthMonth: z.string().min(1, "Select month"),
    birthDay: z.string().min(1, "Select day"),
    birthYear: z.string().min(1, "Select year"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

const MedicardActivation = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { mutate, isPending, error: apiError, isSuccess } = useActivateCard()

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      cardNumber: "",
      gender: "",
      phone: "",
      nationalId: "",
      passportNumber: "",
      birthMonth: "",
      birthDay: "",
      birthYear: "",
      password: "",
      confirmPassword: "",
    },
  })

  const handleNext = async () => {
    const valid = await trigger(["firstName", "lastName", "cardNumber", "gender", "phone"])
    if (valid) setStep(2)
  }

  const onSubmit = (data) => {
    const phoneCleaned = data.phone.startsWith("0") ? data.phone.slice(1) : data.phone

    mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      cardNumber: data.cardNumber,
      isMale: data.gender === "male",
      phoneNumber: `0${phoneCleaned}`,
      nationalId: data.nationalId,
      passportNumber: data.passportNumber || null,
      birthDate: `${data.birthYear}-${data.birthMonth.padStart(2, "0")}-${data.birthDay.padStart(2, "0")}`,
      password: data.password,
      confirmPassword: data.confirmPassword,
    })
  }

  return (
    <FormLayout
      title={step === 1 ? "Activate Your Medicard" : "Complete Your Activation"}
      image={activateCard}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {apiError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {apiError.message}
          </div>
        )}

        {step === 1 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormInput
                  label="First Name"
                  placeholder="Enter your first name"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <FormInput
                  label="Second Name"
                  placeholder="Enter your second name"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <FormInput
                label="Card Number"
                placeholder="Enter your card number"
                {...register("cardNumber")}
              />
              {errors.cardNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.cardNumber.message}
                </p>
              )}
            </div>

            <div>
              <Dropdown
                label="Gender"
                options={GENDER_OPTIONS}
                value={watch("gender")}
                {...register("gender")}
              />
              {errors.gender && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-900">
                Phone Number
              </label>
              <div className="grid grid-cols-[auto_1fr] gap-2">
                <div className="flex h-12 items-center rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-500">
                  +20
                </div>
                <input
                  type="text"
                  placeholder="Phone number"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-main"
                  {...register("phone")}
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full rounded-xl bg-main py-3 font-medium text-white transition hover:bg-sec"
            >
              Next
            </button>

            <div className="flex items-center gap-3 py-2">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-sm text-gray-400">
                Prefer to activate by phone?
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-main py-3 font-medium text-main transition hover:bg-main hover:text-white"
            >
              <Phone size={16} />
              Call Now
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <div>
              <FormInput
                label="National ID"
                placeholder="Enter your national ID"
                {...register("nationalId")}
              />
              {errors.nationalId && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.nationalId.message}
                </p>
              )}
            </div>

            <div>
              <FormInput
                label="Passport"
                placeholder="Enter your passport number"
                {...register("passportNumber")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-900">
                Date of Birth
              </label>
              <div className="grid grid-cols-3 gap-2">
                <Dropdown
                  options={MONTHS}
                  placeholder="Month"
                  value={watch("birthMonth")}
                  {...register("birthMonth")}
                />
                <Dropdown
                  options={[{ value: "", label: "Day" }, ...DAYS]}
                  placeholder="Day"
                  value={watch("birthDay")}
                  {...register("birthDay")}
                />
                <Dropdown
                  options={[{ value: "", label: "Year" }, ...YEARS]}
                  placeholder="Year"
                  value={watch("birthYear")}
                  {...register("birthYear")}
                />
              </div>
              {(errors.birthMonth || errors.birthDay || errors.birthYear) && (
                <p className="text-sm text-red-500">
                  Please select your full date of birth
                </p>
              )}
            </div>

            <div className="relative">
              <FormInput
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-10 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative">
              <FormInput
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-[42px] text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-main py-3 font-medium text-white transition hover:bg-sec disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Activating..." : "Activate"}
            </button>
          </>
        )}
      </form>

      {isSuccess && (
        <SuccessPopup
          title="Card Activated!"
          message="Your Medicard has been activated successfully."
          buttonText="Back to Home"
          onButtonClick={() => navigate("/")}
        />
      )}
    </FormLayout>
  );
}

export default MedicardActivation

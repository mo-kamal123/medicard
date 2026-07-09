import { useState } from "react"
import { useTranslation } from "react-i18next"
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

const MedicardActivation = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { mutate, isPending, error: apiError, isSuccess } = useActivateCard()

  const MONTHS = [
    { value: "", label: t("activation.month") },
    { value: "1", label: t("activation.months.1") },
    { value: "2", label: t("activation.months.2") },
    { value: "3", label: t("activation.months.3") },
    { value: "4", label: t("activation.months.4") },
    { value: "5", label: t("activation.months.5") },
    { value: "6", label: t("activation.months.6") },
    { value: "7", label: t("activation.months.7") },
    { value: "8", label: t("activation.months.8") },
    { value: "9", label: t("activation.months.9") },
    { value: "10", label: t("activation.months.10") },
    { value: "11", label: t("activation.months.11") },
    { value: "12", label: t("activation.months.12") },
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
    { value: "", label: t("activation.genderOptions.select") },
    { value: "male", label: t("activation.genderOptions.male") },
    { value: "female", label: t("activation.genderOptions.female") },
  ]

  const schema = z
    .object({
      firstName: z.string().min(1, t("activation.firstNameRequired")),
      lastName: z.string().min(1, t("activation.secondNameRequired")),
      cardNumber: z.string().min(1, t("activation.cardNumberRequired")),
      gender: z.string().min(1, t("activation.genderRequired")),
      phone: z.string().regex(/^\d{10}$/, t("activation.phoneInvalid")),
      nationalId: z.string().min(1, t("activation.nationalIdRequired")),
      passportNumber: z.string().optional(),
      birthMonth: z.string().min(1, t("activation.selectMonth")),
      birthDay: z.string().min(1, t("activation.selectDay")),
      birthYear: z.string().min(1, t("activation.selectYear")),
      password: z.string().min(6, t("activation.passwordMinLength")),
      confirmPassword: z.string().min(1, t("activation.confirmPasswordRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("activation.passwordsDoNotMatch"),
      path: ["confirmPassword"],
    })

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
      title={step === 1 ? t("activation.titleStep1") : t("activation.titleStep2")}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FormInput
                  label={t("activation.firstName")}
                  placeholder={t("activation.firstNamePlaceholder")}
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
                  label={t("activation.secondName")}
                  placeholder={t("activation.secondNamePlaceholder")}
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
                label={t("activation.cardNumber")}
                placeholder={t("activation.cardNumberPlaceholder")}
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
                label={t("activation.gender")}
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
                {t("activation.phoneNumber")}
              </label>
              <div className="flex items-stretch gap-2">
                <div className="flex shrink-0 h-12 items-center rounded-xl border border-gray-200 bg-gray-50 px-3 md:px-4 text-sm text-gray-500">
                  +20
                </div>
                <input
                  type="text"
                  placeholder={t("activation.phonePlaceholder")}
                  className="w-full min-w-0 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-main"
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
              {t("activation.next")}
            </button>

            <div className="flex items-center gap-3 py-2">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-sm text-gray-400">
                {t("activation.activateByPhone")}
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-main py-3 font-medium text-main transition hover:bg-main hover:text-white"
            >
              <Phone size={16} />
              {t("activation.callNow")}
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
              {t("activation.back")}
            </button>

            <div>
              <FormInput
                label={t("activation.nationalId")}
                placeholder={t("activation.nationalIdPlaceholder")}
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
                label={t("activation.passport")}
                placeholder={t("activation.passportPlaceholder")}
                {...register("passportNumber")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-900">
                {t("activation.dateOfBirth")}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <Dropdown
                  options={MONTHS}
                  placeholder={t("activation.month")}
                  value={watch("birthMonth")}
                  {...register("birthMonth")}
                />
                <Dropdown
                  options={[{ value: "", label: t("activation.day") }, ...DAYS]}
                  placeholder={t("activation.day")}
                  value={watch("birthDay")}
                  {...register("birthDay")}
                />
                <Dropdown
                  options={[{ value: "", label: t("activation.year") }, ...YEARS]}
                  placeholder={t("activation.year")}
                  value={watch("birthYear")}
                  {...register("birthYear")}
                />
              </div>
              {(errors.birthMonth || errors.birthDay || errors.birthYear) && (
                <p className="text-sm text-red-500">
                  {t("activation.selectFullDateOfBirth")}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-900">{t("activation.password")}</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("activation.passwordPlaceholder")}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 outline-none focus:border-main"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-900">{t("activation.confirmPassword")}</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("activation.confirmPasswordPlaceholder")}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 outline-none focus:border-main"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-main py-3 font-medium text-white transition hover:bg-sec disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? t("activation.activating") : t("activation.activate")}
            </button>
          </>
        )}
      </form>

      {isSuccess && (
        <SuccessPopup
          title={t("activation.successTitle")}
          message={t("activation.successMessage")}
          buttonText={t("activation.backToHome")}
          onButtonClick={() => navigate("/")}
        />
      )}
    </FormLayout>
  );
}

export default MedicardActivation

import { useTranslation } from "react-i18next"
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

const BecomeProvider = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data: categoriesData } = useCategories()
  const { mutate, isPending, error: apiError, isSuccess } = useBecomeProvider()

  const schema = z.object({
    providerName: z.string().min(1, t("becomeProvider.facilityNameRequired")),
    category: z.string().min(1, t("becomeProvider.selectCategoryRequired")),
    numberOfBranches: z.coerce.number().int().min(1, t("becomeProvider.branchesRequired")),
    mainBranchAddress: z.string().min(1, t("becomeProvider.addressRequired")),
    email: z.string().email(t("becomeProvider.invalidEmail")),
    phoneNumber: z.string().regex(/^\d{11}$/, t("becomeProvider.phoneInvalid")),
  })

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
    { value: "", label: t("becomeProvider.selectCategory") },
    ...(categoriesData?.data || []).map((cat) => ({
      value: String(cat.id),
      label: cat.name,
    })),
  ]

  const onSubmit = (data) => {
    mutate({ ...data, category: data.category })
  }

  return (
    <FormLayout title={t("becomeProvider.title")} image={becomeProviderImage}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {apiError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {apiError.message}
          </div>
        )}

        <div>
          <FormInput
            label={t("becomeProvider.facilityName")}
            placeholder={t("becomeProvider.facilityNamePlaceholder")}
            {...register("providerName")}
          />
          {errors.providerName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.providerName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between w-full gap-4">
          <div className="w-full">
            <Dropdown
              label={t("becomeProvider.category")}
              options={categoryOptions}
              value={watch("category")}
              {...register("category")}
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <FormInput
              label={t("becomeProvider.numberOfBranches")}
              type="number"
              min="1"
              {...register("numberOfBranches")}
            />
            {errors.numberOfBranches && (
              <p className="mt-1 text-sm text-red-500">
                {errors.numberOfBranches.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <FormInput
            label={t("becomeProvider.mainBranchAddress")}
            placeholder={t("becomeProvider.mainBranchAddressPlaceholder")}
            {...register("mainBranchAddress")}
          />
          {errors.mainBranchAddress && (
            <p className="mt-1 text-sm text-red-500">
              {errors.mainBranchAddress.message}
            </p>
          )}
        </div>

          <div>
            <FormInput
              label={t("becomeProvider.email")}
              type="email"
              placeholder={t("becomeProvider.emailPlaceholder")}
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <FormInput
              label={t("becomeProvider.phone")}
              type="tel"
              placeholder={t("becomeProvider.phonePlaceholder")}
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-main py-3 font-medium text-white transition hover:bg-sec disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? t("becomeProvider.submitting") : t("becomeProvider.submit")}
        </button>
      </form>

      {isSuccess && (
        <SuccessPopup
          title={t("becomeProvider.successTitle")}
          message={t("becomeProvider.successMessage")}
          buttonText={t("becomeProvider.backToHome")}
          onButtonClick={() => navigate("/")}
        />
      )}
    </FormLayout>
  );
}

export default BecomeProvider

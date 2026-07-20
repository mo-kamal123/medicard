import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import facebook from "../../../assets/facebook.svg"
import instagram from "../../../assets/instagram.svg"
import mail from "../../../assets/mail.svg"
import phone from "../../../assets/phone.svg"
import tiktok from "../../../assets/tiktok.svg"
import whatsapp from "../../../assets/whatsapp.svg"
import FormInput from "../../../shared/components/Form-Input"
import FormTextarea from "../../../shared/components/Form-Textarea"
import Toast from "../../../shared/components/Toast"
import ContactCard from "./Contact-card"
import { useContactUs } from "../hooks/contactUs.queries"

const iconMap = {
  phone,
  email: mail,
  whatsapp,
  facebook,
  tiktok,
  instagram,
}

const contactLabelMap = {
  phone: "contact.phone",
  email: "contact.emailAddress",
  whatsapp: "contact.whatsapp",
}

const ContactUs = ({ data }) => {
  const { t } = useTranslation()
  const [toast, setToast] = useState(null)
  const { mutate, isPending, isSuccess } = useContactUs()

  const schema = z.object({
    name: z.string().min(2, t("contact.nameMinLength")),
    email: z.string().email(t("contact.invalidEmail")),
    message: z.string().min(10, t("contact.messageMinLength")),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        setToast({ message: t("contact.toastSuccess"), type: "success" })
        reset()
      },
      onError: () => {
        setToast({ message: t("contact.toastError"), type: "error" })
      },
    })
  }

  const closeToast = () => setToast(null)

  const contactItems = data?.contactItems || []
  const socialItems = data?.socialItems || []

  return (
    <section className="container mx-auto px-4 md:px-0 py-10 md:py-20">
      <h2 className="my-6 md:my-8 text-2xl md:text-3xl font-bold">{t("contact.title")}</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-[#D9E4F5] bg-[#F4F8FF] p-4 md:p-6">
          <h3 className="mb-4 md:mb-6 text-xl md:text-3xl font-medium">{t("contact.sendMessage")}</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div>
                <FormInput label={t("contact.name")} placeholder={t("contact.name")} {...register("name")} />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <FormInput label={t("contact.email")} type="email" placeholder={t("contact.email")} {...register("email")} />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <FormTextarea label={t("contact.message")} placeholder={t("contact.messagePlaceholder")} rows={6} {...register("message")} />
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-main py-3 font-medium text-white transition hover:bg-sec disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? t("contact.sending") : t("contact.send")}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {contactItems.map((item, index) => {
            const href =
              item.type === "whatsapp" ? `https://wa.me/${item.url.replace(/[^0-9]/g, "")}` :
              item.url

              const subtitle =
                item.type === "whatsapp"
                  ? `${t("contact.whatsappPrefix")}`
                  : item.value; 

            return (
              <ContactCard
                key={index}
                icon={iconMap[item.type]}
                title={contactLabelMap[item.type] ? t(contactLabelMap[item.type]) : item.label}
                subtitle={subtitle}
                href={href}
              />
            )
          })}

          {socialItems.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 md:gap-4 rounded-2xl border border-[#D9E4F5] bg-white p-4">
              {socialItems.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-xl bg-[#EAF2FF] transition hover:bg-[#D9E4F5]"
                >
                  <img src={iconMap[item.type]} alt={item.label} className="w-5 h-5 md:w-auto md:h-auto" />
                </a>
              ))}
              <h3 className="ml-1 md:ml-2 text-xl md:text-3xl font-semibold">{t("contact.followUs")}</h3>
            </div>
          )}
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </section>
  )
}

export default ContactUs

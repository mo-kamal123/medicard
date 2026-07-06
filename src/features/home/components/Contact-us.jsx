import { useState } from "react"
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

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

const iconMap = {
  phone,
  email: mail,
  whatsapp,
  facebook,
  tiktok,
  instagram,
}

const ContactUs = ({ data }) => {
  const [toast, setToast] = useState(null)
  const { mutate, isPending, isSuccess } = useContactUs()

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
        setToast({ message: "Message sent successfully!", type: "success" })
        reset()
      },
      onError: () => {
        setToast({ message: "Failed to send message. Please try again.", type: "error" })
      },
    })
  }

  const closeToast = () => setToast(null)

  const contactItems = data?.contactItems || []
  const socialItems = data?.socialItems || []

  return (
    <section className="container mx-auto py-20">
      <h2 className="my-8 text-3xl font-bold">Contact Us</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-[#D9E4F5] bg-[#F4F8FF] p-6">
          <h3 className="mb-6 text-3xl font-semibold">Send a Message</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FormInput label="Name" placeholder="Name" {...register("name")} />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <FormInput label="Email" type="email" placeholder="Email" {...register("email")} />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <FormTextarea label="Message" placeholder="enter your message" rows={6} {...register("message")} />
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-main py-4 font-medium text-white transition hover:bg-sec disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Sending..." : "Send"}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {contactItems.map((item, index) => (
            <ContactCard
              key={index}
              icon={iconMap[item.type]}
              title={item.label}
              subtitle={item.value}
              link={item.type === "whatsapp"}
            />
          ))}

          {socialItems.length > 0 && (
            <div className="flex items-center gap-4 rounded-2xl border border-[#D9E4F5] bg-white p-4">
              {socialItems.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#EAF2FF] transition hover:bg-[#D9E4F5]"
                >
                  <img src={iconMap[item.type]} alt={item.label} />
                </a>
              ))}
              <h3 className="ml-2 text-3xl font-semibold">Follow Us</h3>
            </div>
          )}
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </section>
  )
}

export default ContactUs

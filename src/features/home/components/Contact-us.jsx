import facebook from "../../../assets/facebook.svg";
import instagram from "../../../assets/instagram.svg";
import mail from "../../../assets/mail.svg";
import phone from "../../../assets/phone.svg";
import tiktok from "../../../assets/tiktok.svg";
import whatsapp from "../../../assets/whatsapp.svg";
import FormInput from "../../../shared/components/Form-Input";
import FormTextarea from "../../../shared/components/Form-Textarea";
import ContactCard from "./Contact-card";

const ContactUs = () => {
  return (
    <section className="container mx-auto py-20">
      <h2 className="mb-8 text-5xl font-bold text-main">Contact Us</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <div className="rounded-3xl border border-[#D9E4F5] bg-[#F4F8FF] p-6">
          <h3 className="mb-6 text-3xl font-semibold">Send a Message</h3>

          <form className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <FormInput label="Name" placeholder="Name" />

              <FormInput label="Email" type="email" placeholder="Email" />
            </div>

            <FormTextarea label="Message" placeholder="Input text" rows={6} />

            <button
              type="submit"
              className="w-full rounded-xl bg-main py-4 font-medium text-white transition hover:bg-sec"
            >
              Send
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <ContactCard
            icon={phone}
            title="Call us"
            subtitle="+2013402938372"
          />

          <ContactCard
            icon={mail}
            title="Email"
            subtitle="info@medicardeg.com"
          />

          <ContactCard
            icon={whatsapp}
            title="Whatsapp"
            subtitle="Chat with us"
            link
          />

          <div className="flex items-center gap-4 rounded-2xl border border-[#D9E4F5] bg-white p-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#EAF2FF]">
              <img src={facebook} alt="" />
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#EAF2FF]">
              <img src={tiktok} alt="" />
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#EAF2FF]">
              <img src={instagram} alt="" />
            </div>

            <h3 className="ml-2 text-3xl font-semibold">Follow Us</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

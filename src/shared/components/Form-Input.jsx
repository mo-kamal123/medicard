import { useTranslation } from "react-i18next";

const FormInput = ({
    label,
    type = "text",
    placeholder,
    ...props
  }) => {
    const { i18n } = useTranslation();
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-900">{label}</label>

        <input
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
          type={type}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-main"
          {...props}
        />
      </div>
    );
  };
  
  export default FormInput;
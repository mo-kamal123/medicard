const ContactCard = ({
    icon,
    title,
    subtitle,
    link = false,
  }) => {
    return (
      <div className="flex items-center gap-5 rounded-2xl border border-[#D9E4F5] bg-white p-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#EAF2FF]">
          <img src={icon} alt="" />
        </div>
  
        <div>
          <h3 className="text-2xl font-semibold">{title}</h3>
  
          {link ? (
            <a
              href="#"
              className="text-lg underline"
            >
              {subtitle}
            </a>
          ) : (
            <p>{subtitle}</p>
          )}
        </div>
      </div>
    );
  };
  
  export default ContactCard;
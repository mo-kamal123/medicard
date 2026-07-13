const ContactCard = ({
    icon,
    title,
    subtitle,
    href,
  }) => {
    const content = (
      <div className="flex items-center gap-3 md:gap-5 rounded-2xl border border-[#D9E4F5] bg-white p-3 md:p-4">
        <div className="flex h-10 w-10 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF]">
          <img src={icon} alt="" className="w-5 h-5 md:w-auto md:h-auto" />
        </div>
  
        <div className="min-w-0">
          <h3 className="text-base md:text-2xl font-semibold truncate">{title}</h3>
          <p className="text-sm md:text-base truncate">{subtitle}</p>
        </div>
      </div>
    );

    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block transition hover:shadow-md"
        >
          {content}
        </a>
      );
    }

    return content;
  };
  
  export default ContactCard;
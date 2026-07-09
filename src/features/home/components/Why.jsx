import { useTranslation } from "react-i18next";
import { HandCoins, ShieldCheck, Map } from "lucide-react";

const Why = () => {
  const { t } = useTranslation();
  const cards = [
    {
      icon: <ShieldCheck className="text-main" size={40} />,
      title: t("why.trust"),
      desc: t("why.trustDesc"),
    },
    {
      icon: <HandCoins className="text-main" size={40} />,
      title: t("why.savings"),
      desc: t("why.savingsDesc"),
    },
    {
      icon: <Map className="text-main" size={40}/>,
      title: t("why.coverage"),
      desc: t("why.coverageDesc"),
    },
  ];

  return (
    <div>
      <h2 className="my-6 md:my-8 text-2xl md:text-3xl font-bold text-black">{t("why.title")}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="p-6 bg-blue-50 rounded-2xl flex flex-col items-center gap-2 my-6 md:my-10"
          >
            {card.icon}
            <p className="font-semibold text-lg">{card.title}</p>
            <p className="text-sm text-gray-600 text-center">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Why;
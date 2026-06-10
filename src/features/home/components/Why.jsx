import { HandCoins, ShieldCheck, Map } from "lucide-react";
import React from "react";

const Why = () => {
  const cards = [
    {
      icon: <ShieldCheck className="text-main" size={40} />,
      title: "Trust",
      desc: "All our Service providers are verified and offer genuine discounts on quality medical services.",
    },
    {
      icon: <HandCoins className="text-main" size={40} />,
      title: "Savings",
      desc: "Save up to 30% on lab tests, scans, pharmacy services, and more.",
    },
    {
      icon: <Map className="text-main" size={40}/>,
      title: "Coverage",
      desc: "Coverage across all of Egypt 27 Governorates, urban and rural communities alike.",
    },
  ];

  return (
    <div>
      <h2>Why Choose MediCard?</h2>

      <div className="grid grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="p-6 text-center bg-blue-50 text-center rounded-2xl w-full flex flex-col items-center gap-2 my-10 w-40"
          >
            {card.icon}
            <p className="font-semibold text-lg">{card.title}</p>
            <p className="text-sm text-gray-600">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Why;
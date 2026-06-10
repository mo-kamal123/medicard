import beats from "../../../assets/beats.svg";
import PlanCard from "../../../shared/components/Plan-card";
const Plans = () => {
  const data = {
    title: "STANDARD PLAN",
    price: 299,
    benefits: [
      "Discounts on services",
      "Pharmacy discounts",
      "Search & booking",
    ],
  };
  return (
    <div className="flex items-center">
      <img src={beats} alt="" className="rotate-180" />
      <div className="flex items-center justify-between gap-5 w-full">
        <PlanCard data={data} />
        <PlanCard data={data} active />
      </div>
      <img src={beats} alt="" />
    </div>
  );
};

export default Plans;

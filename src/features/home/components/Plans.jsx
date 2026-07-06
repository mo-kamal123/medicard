import beats from "../../../assets/beats.svg";
import PlanCard from "../../../shared/components/Plan-card";

const Plans = ({ plans = [] }) => {
  if (!plans.length) return null;

  return (
    <>
      <h2 className="my-8 text-3xl font-bold text-black">MediCard Plans</h2>
      <div className="flex items-center">
        <img src={beats} alt="" className="rotate-180" />
        <div className="flex w-full items-center justify-between gap-5">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.id}
              data={{
                title: plan.name,
                price: plan.priceAfter,
                priceBefore: plan.priceBefore,
                discount: plan.discountPercentage,
                benefits: plan.description.split("/").map((s) => s.trim()),
              }}
              active={index === 1}
            />
          ))}
        </div>
        <img src={beats} alt="" />
      </div>
    </>
  );
};

export default Plans;

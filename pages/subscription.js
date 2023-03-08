import React from "react";

//INTERNAL IMPORT
import Style from "../styles/subscription.module.css";
import Subscription from "../Subscription/Subscription";
const subscription = () => {
  const subscriptionArray = [
    {
      plan: "STARTER",
      price: "coming soon",
      popular: "",
      service: ["Automated Reporting", "Faster Processing", "Customizations"],
      info: "Literally you probably haven't heard of them jean shorts.",
    },
    {
      plan: "BASIC",
      price: "coming soon",
      popular: "POPULAR",
      service: [
        "Everything in Starter",
        "100 Builds",
        "Progress Reports",
        "Premium Support",
      ],

      info: "Literally you probably haven't heard of them jean shorts.",
    },
    {
      plan: "PLUS",
      price: "coming soon",
      popular: "",
      service: [
        "Everything in Basic",
        "Unlimited Builds",
        "Advanced Analytics",
        "Company Evaluations",
      ],

      info: "Literally you probably haven't heard of them jean shorts.",
    },
  ];
  return (
    <div className={Style.Subscription}>
      <div className={Style.Subscription_box}>
        <div className={Style.Subscription_box_info}>
          <h1>💎 Subscription</h1>
          <p>Pricing to fit the needs of any companie size.</p>
        </div>

        <div className={Style.Subscription_box_box}>
          {subscriptionArray.map((el, i) => (
            <Subscription key={i + 1} i={1} el={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default subscription;

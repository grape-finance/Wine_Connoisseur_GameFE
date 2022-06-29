import priceOven from "assets/image/skills/1_precise_oven.svg";
import qualityControl from "assets/image/skills/2_quality_control.svg";
import unburnMechanism from "assets/image/skills/3_unburn_mechanism.svg";

export interface ISkills {
  burn: any;
  cellar: any;
  fatigue: any;
}

export const skills = {
  burn: [
    {
      name: "Price Ovens",
      skillType: "burn",
      skillPoint: 1,
      definition: "Decrease the amount of pepperoni burned when claimed by 3%",
      image: priceOven,
    },
    {
      name: "Quality Control",
      skillType: "burn",
      skillPoint: 2,
      definition:
        "Decrease the amount of pepperoni burned when claimed by 3% (6% total)",
      image: qualityControl,
    },
    {
      name: "Unburn Mechanism",
      skillType: "burn",
      skillPoint: 3,
      definition:
        "Decrease the amount of pepperoni burned when claimed by 2% (8% total)",
      image: unburnMechanism,
    },
  ],
  fatigue: [
    {
      name: "Chef's Endurance",
      skillType: "fatigue",
      skillPoint: 1,
      definition: "Decrease the effects of fatigue by 8%",
      image: priceOven,
    },
    {
      name: "Chef's Assistant",
      skillType: "fatigue",
      skillPoint: 2,
      definition: "Decrease the effects of fatigue by 7% (15% total)",
      image: qualityControl,
    },
    {
      name: "Fair Working Conditions",
      skillType: "fatigue",
      skillPoint: 3,
      definition: "Decrease the effects of fatigue by 5% (20% total)",
      image: unburnMechanism,
    },
    {
      name: "Survival Instincts",
      skillType: "fatigue",
      skillPoint: 4,
      definition: "Decrease the effects of fatigue by 10% (total 30%)",
      image: priceOven,
    },
    {
      name: "Ultimate Chef",
      skillType: "fatigue",
      skillPoint: 5,
      definition: "Decrease the effects of fatigue by 20% (total 50%)",
      image: qualityControl,
    },
  ],
  cellar: [
    {
      name: "Pizza Delivery",
      skillType: "cellar",
      skillPoint: 1,
      definition: "Decrease the amount lost to the Freezer when claiming by 4%",
      image: priceOven,
    },
    {
      name: "Selfishness",
      skillType: "cellar",
      skillPoint: 2,
      definition:
        "Decrease the amount lost to the Freezer when claiming by 5% (9% total)",
      image: qualityControl,
    },
  ],
};

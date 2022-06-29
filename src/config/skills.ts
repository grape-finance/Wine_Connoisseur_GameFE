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

      skillPoint: 1,
      definition: "Decrease the amount of pepperoni burned when claimed by 3%",
      image: priceOven,
    },
    {
      name: "Quality Control",

      skillPoint: 2,
      definition:
        "Decrease the amount of pepperoni burned when claimed by 3% (6% total)",
      image: qualityControl,
    },
    {
      name: "Unburn Mechanism",

      skillPoint: 3,
      definition:
        "Decrease the amount of pepperoni burned when claimed by 2% (8% total)",
      image: unburnMechanism,
    },
  ],
  fatigue: [
    {
      name: "Chef's Endurance",

      skillPoint: 1,
      definition: "Decrease the effects of fatigue by 8%",
      image: priceOven,
    },
    {
      name: "Chef's Assistant",

      skillPoint: 2,
      definition: "Decrease the effects of fatigue by 7% (15% total)",
      image: qualityControl,
    },
    {
      name: "Fair Working Conditions",

      skillPoint: 3,
      definition: "Decrease the effects of fatigue by 5% (20% total)",
      image: unburnMechanism,
    },
    {
      name: "Survival Instincts",

      skillPoint: 4,
      definition: "Decrease the effects of fatigue by 10% (total 30%)",
      image: priceOven,
    },
    {
      name: "Ultimate Chef",

      skillPoint: 5,
      definition: "Decrease the effects of fatigue by 20% (total 50%)",
      image: qualityControl,
    },
  ],
  cellar: [
    {
      name: "Pizza Delivery",

      skillPoint: 1,
      definition: "Decrease the amount lost to the Freezer when claiming by 4%",
      image: priceOven,
    },
    {
      name: "Selfishness",

      skillPoint: 2,
      definition:
        "Decrease the amount lost to the Freezer when claiming by 5% (9% total)",
      image: qualityControl,
    },
  ],
  mastervintner: [
    {
      name: "Master Conspiracy",

      skillPoint: 1,
      definition:
        "Increases by 3% the RPD of the Pizzeria if 2 or more Master Chefs are staked",
      image: priceOven,
    },
    {
      name: "Pizzagate",

      skillPoint: 2,
      definition:
        "Increases by 7% the RPD of the Pizzeria if 5 or more Master Chefs are staked",
      image: qualityControl,
    },
  ],
  upgrades: [
    {
      name: "Pizzaioli Training",

      skillPoint: 1,
      definition: "Allows to stake tools from tiers 3 to 5",
      image: priceOven,
    },
    {
      name: "Traditional Italian Cuisine",

      skillPoint: 2,
      definition: "Allows to stake tools from tiers 6 and 7",
      image: qualityControl,
    },
    {
      name: "Bleeding Edge Technology",

      skillPoint: 3,
      definition: "Allows to stake tools from tiers 8 and 9",
      image: unburnMechanism,
    },
    {
      name: "Fringe Science",

      skillPoint: 4,
      definition: "Allows to stake tools from tiers 10 to 12",
      image: qualityControl,
    },
    {
      name: "Interdimensional Cooking",

      skillPoint: 5,
      definition: "Allows to stake tools from tiers 13 and above",
      image: unburnMechanism,
    },
  ],
  vintners: [
    {
      name: "Humble Beginnings",

      skillPoint: 1,
      definition:
        "You can now stake up to 15 chefs you don't have enough skill points",
      image: priceOven,
    },
    {
      name: "Best Place in Town",

      skillPoint: 2,
      definition: "You can now stake up to 20 chefs",
      image: qualityControl,
    },
    {
      name: "Pizza Chains",

      skillPoint: 3,
      definition: "You can now stake up to 30 chefs",
      image: unburnMechanism,
    },
    {
      name: "Pizza Industry",

      skillPoint: 4,
      definition: "You can now stake up to 50 chefs",
      image: qualityControl,
    },
    {
      name: "Chef's Army",

      skillPoint: 5,
      definition: "You can now stake unlimited chefs",
      image: unburnMechanism,
    },
  ],
  vintageWineStorage: [
    {
      name: "Pizza Delivery",

      skillPoint: 1,
      definition: "Increase VintageWine store 15000",
      image: priceOven,
    },
    {
      name: "Selfishness",

      skillPoint: 2,
      definition: "Increase VintageWine store 50000",
      image: qualityControl,
    },
    {
      name: "Selfishness",

      skillPoint: 3,
      definition: "Increase VintageWine store 100000",
      image: unburnMechanism,
    },
    {
      name: "Selfishness",

      skillPoint: 4,
      definition: "Increase VintageWine store 300000",
      image: qualityControl,
    },
    {
      name: "Selfishness",

      skillPoint: 5,
      definition: "Increase VintageWine store 500000",
      image: unburnMechanism,
    },
  ],
};

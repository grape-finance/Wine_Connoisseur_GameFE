// Fagiue Reduce
import cut_with_water from "assets/image/skills/Reduce_Distributor_Cut/01-cut-with-water.jpg";
import sole_distributorship from "assets/image/skills/Reduce_Distributor_Cut/02-sole-distributorship.jpg";
import onsite_distribution_manager from "assets/image/skills/Reduce_Distributor_Cut/03-onsite-distribution-manager.jpg";

// Cellar Reducer
import blending from "assets/image/skills/Decrease_Loss_When_Unstaking/01-blending.jpg";
import deal_with_devil from "assets/image/skills/Decrease_Loss_When_Unstaking/02-deal-with-devil.jpg";

// Burn Reducer
import partners_in_wine from "assets/image/skills/Multiple_Wine_Master_Staked_Boost/01-partners-in-wine.jpg";
import wine_mixer from "assets/image/skills/Multiple_Wine_Master_Staked_Boost/02-wine-mixer.jpg";

// Burn Reducer
import Premium_Corks from "assets/image/skills/Decrease_Vintage_Spoiled/01-Premium-Corks.jpg";
import temperature_control from "assets/image/skills/Decrease_Vintage_Spoiled/02-temperature-control.jpg";
import solera_aging from "assets/image/skills/Decrease_Vintage_Spoiled/03-solera-aging.jpg";

// Increase VintageWine Amount
import backyard_farm from "assets/image/skills/Increase_Staked_Vintner_Slots/01-backyard-farm.jpg";
import expanded_tasting_room from "assets/image/skills/Increase_Staked_Vintner_Slots/02-expanded-tasting-room.jpg";
import vineyard_acquisition from "assets/image/skills/Increase_Staked_Vintner_Slots/03-vineyard-acquisition.jpg";
import overseas_expanstion from "assets/image/skills/Increase_Staked_Vintner_Slots/04-overseas-expanstion.jpg";
import megacorp_formation from "assets/image/skills/Increase_Staked_Vintner_Slots/05-megacorp-formation.jpg";

// Increase Tools Amount
import napa_valley_fieldtrip from "assets/image/skills/Stake_Higher_Tier_Tools/01-napa-valley-fieldtrip.jpg";
import winemaking_convention from "assets/image/skills/Stake_Higher_Tier_Tools/02-winemaking-convention.jpg";
import Wine_Summit from "assets/image/skills/Stake_Higher_Tier_Tools/03-Wine-Summit.jpg";
import onsite_engineer from "assets/image/skills/Stake_Higher_Tier_Tools/04-onsite-engineer.jpg";
import ancient_goon_bag from "assets/image/skills/Stake_Higher_Tier_Tools/05-ancient-goon-bag.jpg";

// Increase VintageWine Storaage Amount
import farm_hands from "assets/image/skills/Vintage_Storage_Increase/01-farm-hands.jpg";
import storage_shed from "assets/image/skills/Vintage_Storage_Increase/02-storage-shed.jpg";
import hardy_varaities from "assets/image/skills/Vintage_Storage_Increase/03-hardy-varaities.jpg";
import vine_mastery from "assets/image/skills/Vintage_Storage_Increase/04-vine-mastery.jpg";
import underground_farming from "assets/image/skills/Vintage_Storage_Increase/05-underground-farming.jpg";
import { ISkills } from "interface/ISkill";

export const skills: ISkills = {
  burn: [
    {
      name: "Premium Corks",
      skillPoint: 1,
      definition: "Decrease the amount of pepperoni burned when claimed by 3%",
      image: Premium_Corks,
    },
    {
      name: "Temperature Control",
      skillPoint: 2,
      definition:
        "Decrease the amount of pepperoni burned when claimed by 3% (6% total)",
      image: temperature_control,
    },
    {
      name: "Solera Aging",
      skillPoint: 3,
      definition:
        "Decrease the amount of pepperoni burned when claimed by 2% (8% total)",
      image: solera_aging,
    },
  ],
  fatigue: [
    {
      name: "Cut With Water",
      skillPoint: 1,
      definition: "Decrease the effects of fatigue by 8%",
      image: cut_with_water,
    },
    {
      name: "Sole Distributorship",
      skillPoint: 2,
      definition: "Decrease the effects of fatigue by 7% (15% total)",
      image: sole_distributorship,
    },
    {
      name: "Onsite Distribution Manager",
      skillPoint: 3,
      definition: "Decrease the effects of fatigue by 5% (20% total)",
      image: onsite_distribution_manager,
    },
    // {
    //   name: "Survival Instincts",

    //   skillPoint: 4,
    //   definition: "Decrease the effects of fatigue by 10% (total 30%)",
    //   image: farm_hands,
    // },
    // {
    //   name: "Ultimate Chef",

    //   skillPoint: 5,
    //   definition: "Decrease the effects of fatigue by 20% (total 50%)",
    //   image: storage_shed,
    // },
  ],
  cellar: [
    {
      name: "Blending",
      skillPoint: 1,
      definition: "Decrease the amount lost to the Freezer when claiming by 4%",
      image: blending,
    },
    {
      name: "Deal With Devil",
      skillPoint: 2,
      definition:
        "Decrease the amount lost to the Freezer when claiming by 5% (9% total)",
      image: deal_with_devil,
    },
  ],
  mastervintner: [
    {
      name: "Partners In Wine",
      skillPoint: 1,
      definition:
        "Increases by 3% the RPD of the Vintner if 2 or more Master Chefs are staked",
      image: partners_in_wine,
    },
    {
      name: "Wine Mixer",
      skillPoint: 2,
      definition:
        "Increases by 7% the RPD of the Vintner if 5 or more Master Chefs are staked",
      image: wine_mixer,
    },
  ],
  upgrades: [
    {
      name: "Napa Valley Fieldtrip",
      skillPoint: 1,
      definition: "Allows to stake tools from tiers 3 to 5",
      image: napa_valley_fieldtrip,
    },
    {
      name: "Winemaking Convention",
      skillPoint: 2,
      definition: "Allows to stake tools from tiers 6 and 7",
      image: winemaking_convention,
    },
    {
      name: "Wine Summit",
      skillPoint: 3,
      definition: "Allows to stake tools from tiers 8 and 9",
      image: Wine_Summit,
    },
    {
      name: "Onsite Engineer",
      skillPoint: 4,
      definition: "Allows to stake tools from tiers 10 to 12",
      image: onsite_engineer,
    },
    {
      name: "Ancient Goon Bag",
      skillPoint: 5,
      definition: "Allows to stake tools from tiers 13 and above",
      image: ancient_goon_bag,
    },
  ],
  vintners: [
    {
      name: "Backyard Farm",
      skillPoint: 1,
      definition:
        "You can now stake up to 15 chefs you don't have enough skill points",
      image: backyard_farm,
    },
    {
      name: "Expanded Tasting Room",
      skillPoint: 2,
      definition: "You can now stake up to 20 chefs",
      image: expanded_tasting_room,
    },
    {
      name: "Vineyard Acquisition",
      skillPoint: 3,
      definition: "You can now stake up to 30 chefs",
      image: vineyard_acquisition,
    },
    {
      name: "Overseas Expanstion",
      skillPoint: 4,
      definition: "You can now stake up to 50 chefs",
      image: overseas_expanstion,
    },
    {
      name: "Megacorp Formation",
      skillPoint: 5,
      definition: "You can now stake unlimited chefs",
      image: megacorp_formation,
    },
  ],
  vintageWineStorage: [
    {
      name: "Farm Hands",
      skillPoint: 1,
      definition: "Increase VintageWine store 15000",
      image: farm_hands,
    },
    {
      name: "Storage Shed",
      skillPoint: 2,
      definition: "Increase VintageWine store 50000",
      image: storage_shed,
    },
    {
      name: "Hardy Varaities",
      skillPoint: 3,
      definition: "Increase VintageWine store 100000",
      image: hardy_varaities,
    },
    {
      name: "Vine Mastery",
      skillPoint: 4,
      definition: "Increase VintageWine store 300000",
      image: vine_mastery,
    },
    {
      name: "Underground Farming",
      skillPoint: 5,
      definition: "Increase VintageWine store 500000",
      image: underground_farming,
    },
  ],
};

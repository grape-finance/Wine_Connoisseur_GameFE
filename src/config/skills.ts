// Fagiue Reduce
import cut_with_water from "assets/image/skills/Reduce_Distributor_Cut/01-cut-with-water.jpg";
import sole_distributorship from "assets/image/skills/Reduce_Distributor_Cut/02-sole-distributorship.jpg";
import onsite_distribution_manager from "assets/image/skills/Reduce_Distributor_Cut/03-onsite-distribution-manager.jpg";
import energyShot from "assets/image/skills/Reduce_Distributor_Cut/Fagitue-4.jpg";
import nightShifts from "assets/image/skills/Reduce_Distributor_Cut/Fatigue-5---Night-Shifts.jpg";

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
      definition: "Decrease the amount of vintage spoiled when claimed by 3%",
      image: Premium_Corks,
    },
    {
      name: "Temperature Control",
      skillPoint: 2,
      definition:
        "Decrease the amount of vintage spoiled when claimed by 3% (6% total)",
      image: temperature_control,
    },
    {
      name: "Solera Aging",
      skillPoint: 3,
      definition:
        "Decrease the amount of vintage spoiled when claimed by 3% (9% total)",
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
    {
      name: "Energy Shot",

       skillPoint: 4,
       definition: "Decrease the effects of fatigue by 10% (total 30%)",
       image: energyShot,
    },
     {
       name: "Night Shifts",
       skillPoint: 5,
       definition: "Decrease the effects of fatigue by 20% (total 50%)",
       image: nightShifts,
     },
  ],
  cellar: [
    {
      name: "Blending",
      skillPoint: 1,
      definition: "Decrease the amount lost to the cellar when claiming by 4%",
      image: blending,
    },
    {
      name: "Deal With Devil",
      skillPoint: 2,
      definition:
        "Decrease the amount lost to the cellar when claiming by 4% (8% total)",
      image: deal_with_devil,
    },
  ],
  mastervintner: [
    {
      name: "Partners In Wine",
      skillPoint: 1,
      definition:
        "Increases the VPD by 3% of the Vintner if 2 or more Master Vintners are staked",
      image: partners_in_wine,
    },
    {
      name: "Wine Mixer",
      skillPoint: 2,
      definition:
        "Increases the VPD by 17% of the Vintner if 5 or more Master Vintners are staked (20% total)",
      image: wine_mixer,
    },
  ],
  upgrades: [
    {
      name: "Napa Valley Fieldtrip",
      skillPoint: 1,
      definition: "Allows to stake tools from tier 2",
      image: napa_valley_fieldtrip,
    },
    {
      name: "Winemaking Convention",
      skillPoint: 2,
      definition: "Allows to stake tools from tier 3",
      image: winemaking_convention,
    },
    {
      name: "Wine Summit",
      skillPoint: 3,
      definition: "Allows to stake tools from tier 4",
      image: Wine_Summit,
    },
    {
      name: "Onsite Engineer",
      skillPoint: 4,
      definition: "Allows to stake tools from tiers 5 to 6",
      image: onsite_engineer,
    },
    {
      name: "Ancient Goon Bag",
      skillPoint: 5,
      definition: "Allows to stake tools from tiers 7 and above",
      image: ancient_goon_bag,
    },
  ],
  vintners: [
    {
      name: "Backyard Farm",
      skillPoint: 1,
      definition:
        "You can now stake up to 10 vintners",
      image: backyard_farm,
    },
    {
      name: "Expanded Tasting Room",
      skillPoint: 2,
      definition: "You can now stake up to 15 vintners",
      image: expanded_tasting_room,
    },
    {
      name: "Vineyard Acquisition",
      skillPoint: 3,
      definition: "You can now stake up to 30 vintners",
      image: vineyard_acquisition,
    },
    {
      name: "Overseas Expanstion",
      skillPoint: 4,
      definition: "You can now stake up to 50 vintners",
      image: overseas_expanstion,
    },
    {
      name: "Megacorp Formation",
      skillPoint: 5,
      definition: "You can now stake unlimited vintners",
      image: megacorp_formation,
    },
  ],
  vintageWineStorage: [
    {
      name: "Farm Hands",
      skillPoint: 1,
      definition: "Increase Vintage store 800",
      image: farm_hands,
    },
    {
      name: "Storage Shed",
      skillPoint: 2,
      definition: "Increase Vintage store 1200",
      image: storage_shed,
    },
    {
      name: "Hardy Varaities",
      skillPoint: 3,
      definition: "Increase Vintage store 2500",
      image: hardy_varaities,
    },
    {
      name: "Vine Mastery",
      skillPoint: 4,
      definition: "Increase Vintage store 5000",
      image: vine_mastery,
    },
    {
      name: "Underground Farming",
      skillPoint: 5,
      definition: "Increase Vintage store 200000",
      image: underground_farming,
    },
  ],
};

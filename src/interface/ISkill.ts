import { BigNumber } from "ethers";

export interface ISkillDetail {
  name: string;
  skillPoint: number;
  definition: string;
  image: string;
}
export interface ISkills {
  burn: ISkillDetail[];
  cellar: ISkillDetail[];
  fatigue: ISkillDetail[];
  mastervintner: ISkillDetail[];
  upgrades: ISkillDetail[];
  vintageWineStorage: ISkillDetail[];
  vintners: ISkillDetail[];
}

export interface ISkillLearned {
  burn: BigNumber;
  fatigue: BigNumber;
  cellar: BigNumber;
  mastervintner: BigNumber;
  upgrades: BigNumber;
  vintners: BigNumber;
  vintageWineStorage: BigNumber;
}

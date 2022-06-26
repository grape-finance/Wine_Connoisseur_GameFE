export const vintageWineAccruedCalculation = (
  wineryVintageWine: number,
  delta: number,
  ppm: number,
  masterVintnerSkillModifier: number,
  fatigueLastUpdate: number,
  fatiguePerMinuteWithModifier: number,
  yieldPPS: number
) => {
  const MAXFATIGUE = 100000000000000;
  if (fatigueLastUpdate >= MAXFATIGUE) {
    return wineryVintageWine;
  }

  const a =
    (delta *
      ppm *
      yieldPPS *
      masterVintnerSkillModifier *
      (MAXFATIGUE - fatigueLastUpdate)) /
    (100 * MAXFATIGUE);
  const b =
    (delta *
      delta *
      ppm *
      yieldPPS *
      masterVintnerSkillModifier *
      fatiguePerMinuteWithModifier) /
    (100 * 2 * 60 * MAXFATIGUE);
  if (a > b) {
    return wineryVintageWine + a - b;
  }

  return wineryVintageWine;
};

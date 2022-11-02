import { useSelector } from "react-redux";
import { AppState } from "store";

export function useIsFetching() {
  return useSelector((state: AppState) => state.user.isLoading);
}

export function useTokenBalance() {
  const grapeBalance = useSelector(
    (state: AppState) => state.user.grapeTokenBalance
  );

  const raisinBalance = useSelector(
    (state: AppState) => state.user.raisinTokenBalance
  );

  const grapeMIMTJBalance = useSelector(
    (state: AppState) => state.user.grapeMIMTJTokenBalance
  );
  const grapeMIMSWBalance = useSelector(
    (state: AppState) => state.user.grapeMIMSWTokenBalance
  );
  const xGrapeBalance = useSelector(
    (state: AppState) => state.user.xGrapeTokenBalance
  );
  const vintageMIMBalance = useSelector(
    (state: AppState) => state.user.vintageMIMTokenBalance
  );
  const MIMTokenBalance = useSelector(
    (state: AppState) => state.user.MIMTokenBalance
  );

  const vintageWineBalance = useSelector(
    (state: AppState) => state.user.vintageWineTokenBalance
  );
  const USDCVintageWineLPBalance = useSelector(
    (state: AppState) => state.user.USDCVintageWineLPBalance
  );
  const vintnerBalance = useSelector(
    (state: AppState) => state.user.vintnerBalance
  );
  const upgradeBalance = useSelector(
    (state: AppState) => state.user.upgradeBalance
  );
  const vintnerStakedBalance = useSelector(
    (state: AppState) => state.user.vintnerStakedBalance
  );
  const upgradeStakedBalance = useSelector(
    (state: AppState) => state.user.upgradeStakedBalance
  );
  return {
    grapeBalance,
    raisinBalance,
    grapeMIMTJBalance,
    grapeMIMSWBalance,
    xGrapeBalance,
    vintageMIMBalance,
    vintageWineBalance,
    USDCVintageWineLPBalance,
    vintnerBalance,
    upgradeBalance,
    vintnerStakedBalance,
    upgradeStakedBalance,
    MIMTokenBalance,
  };
}

export function useNFTState() {
  const fatigueAccrued = useSelector(
    (state: AppState) => state.user.fatigueAccrued
  );
  const timeUntilFatigues = useSelector(
    (state: AppState) => state.user.timeUntilFatigues
  );
  const vintageWineAccrued = useSelector(
    (state: AppState) => state.user.vintageWineAccrued
  );
  const vintageWinePerMinute = useSelector(
    (state: AppState) => state.user.vintageWinePerMinute
  );

  return {
    fatigueAccrued,
    timeUntilFatigues,
    vintageWineAccrued,
    vintageWinePerMinute,
  };
}

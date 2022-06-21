import { useSelector } from "react-redux";
import { AppState } from "store";

export function useIsFetching() {
  return useSelector((state: AppState) => state.user.isLoading);
}

export function useTokenBalance() {
  const grapeBalance = useSelector(
    (state: AppState) => state.user.grapeTokenBalance
  );
  const vintageWineBalance = useSelector(
    (state: AppState) => state.user.vintageWineTokenBalance
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
    vintageWineBalance,
    vintnerBalance,
    upgradeBalance,
    vintnerStakedBalance,
    upgradeStakedBalance,
  };
}

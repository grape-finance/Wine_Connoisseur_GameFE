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
  return { grapeBalance, vintageWineBalance };
}

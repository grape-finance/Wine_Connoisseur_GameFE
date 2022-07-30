import { useSelector } from "react-redux";
import { AppState } from "store";

export function useTokenPrice() {
  const grapePrice = useSelector((state: AppState) => state.token.grapePrice);
  const vintageWinePrice = useSelector(
    (state: AppState) => state.token.vintageWinePrice
  );
  const lpPrice = useSelector((state: AppState) => state.token.lpPrice);
  return { grapePrice, vintageWinePrice, lpPrice };
}

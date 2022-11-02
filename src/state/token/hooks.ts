import { useSelector } from "react-redux";
import { AppState } from "store";

export function useTokenPrice() {
  const grapePrice = useSelector((state: AppState) => state.token.grapePrice);
  const vintageWinePrice = useSelector(
    (state: AppState) => state.token.vintageWinePrice
  );
  const lpPrice = useSelector((state: AppState) => state.token.lpPrice);
  const grapeMIMTJPrice = useSelector(
    (state: AppState) => state.token.grapeMIMTJPrice
  );
  const grapeMIMSWPrice = useSelector(
    (state: AppState) => state.token.grapeMIMSWPrice
  );
  const xGrapePrice = useSelector((state: AppState) => state.token.xGrapePrice);
  const mimPrice = useSelector((state: AppState) => state.token.MIMPrice);
  return {
    grapePrice,
    vintageWinePrice,
    lpPrice,
    grapeMIMTJPrice,
    grapeMIMSWPrice,
    xGrapePrice,
    mimPrice,
  };
}

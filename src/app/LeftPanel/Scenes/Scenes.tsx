import { Skeleton } from "primereact/skeleton";
import { PanelSection } from "../../../components/PanelSection/PanelSection";

export function Scenes() {
  return (
    <PanelSection header="Scenes">
      <Skeleton width="10rem" height="4rem"></Skeleton>
      <Skeleton width="10rem" height="4rem"></Skeleton>
      <Skeleton width="10rem" height="4rem"></Skeleton>
      <Skeleton width="10rem" height="4rem"></Skeleton>
      <Skeleton width="10rem" height="4rem"></Skeleton>
    </PanelSection>
  )
}

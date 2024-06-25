import { PanelSection } from "../../../components/PanelSection/PanelSection";

import { Skeleton } from "primereact/skeleton";

export function Scenes() {
  return (
    <PanelSection header="Scenes">
      <Skeleton height="4rem" width="10rem" />
      <Skeleton height="4rem" width="10rem" />
      <Skeleton height="4rem" width="10rem" />
      <Skeleton height="4rem" width="10rem" />
      <Skeleton height="4rem" width="10rem" />
    </PanelSection>
  );
}

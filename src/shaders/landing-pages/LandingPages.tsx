// Content from kage-landing-page.json payload

import { LandingPageFrame, type LandingPageProps } from "./LandingPageFrame";
export { LandingPageFrame } from "./LandingPageFrame";
export type { LandingPageProps } from "./LandingPageFrame";
import { COMPLETE_SHELF_TYPOGRAPHY, KAGE_TYPOGRAPHY } from "./pageRecipes";
import { type PageTypographyProps, splitTypographyProps, usePageTypography } from "./pageTypography";

// Note: External/complex document imports are omitted in mock build for simplicity.
// import innerGreenSource from "../sylva-living-world/sources/inner-green-3d.html?raw";
// import { buildTidecrestDocument } from "../tidecrest-hero/tidecrestDocument.js";
// ... other imports
// import axonisArborSource from "../axonis-field/axonis-arbor.html?raw";

export function KageLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(KAGE_TYPOGRAPHY, type);
  // Note: The title is provided in the manifest, matching the requirement.
  return (
    <LandingPageFrame
      {...frame}
      customization={customization}
      title="Kage — Where stillness reveals the unseen"
      sourceUrl="/landing-pages/kage.html"
    />
  );
}

export function CompleteShelfLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(COMPLETE_SHELF_TYPOGRAPHY, type);
  return (
    <LandingPageFrame
      {...frame}
      customization={customization}
      title="Working Volumes — Seven Tools for Making"
      sourceUrl="/landing-pages/complete-shelf-v2.html"
    />
  );
}
// ... other components omitted for brevity in this mock file

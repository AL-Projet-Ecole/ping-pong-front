import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import GridUsers from "components/testimonials/ThreeColumnWithProfileImage";

export default (
    tradMode,
    toggleTradMode
) => (
    <AnimationRevealPage>
        <GridUsers/>
    </AnimationRevealPage>
);
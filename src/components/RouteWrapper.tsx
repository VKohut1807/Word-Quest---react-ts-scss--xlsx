import React from "react";

import type {SlotProps} from "@/types/route-types";

const RouteWrapper: React.FC<SlotProps> = ({children}) => {
    return <div className="wrapper">{children}</div>;
};

export default RouteWrapper;

import React from "react";

import type {RouteWrapperProps} from "@/types/route-types";

const RouteWrapper: React.FC<RouteWrapperProps> = ({children}) => {
    return <div className="wrapper">{children}</div>;
};

export default RouteWrapper;

declare module "*.svg?react" {
    import * as React from "react";

    const content: React.ForwardRefExoticComponent<
        React.SVGProps<SVGSVGElement> &
        React.RefAttributes<SVGSVGElement>
    >;

    export default content;
}
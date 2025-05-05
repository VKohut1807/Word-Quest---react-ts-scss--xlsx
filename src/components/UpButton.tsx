import React, {useEffect} from "react";

import "@/assets/scss/components/up-button.scss";

import ArrowUpIcon from "@/assets/icons/arrow-up.svg?react";
import CircleIcon from "@/assets/icons/circle.svg?react";

const UpButton: React.FC = () => {
    useEffect(() => {
        const section = document.querySelector<HTMLElement>(
            "[data-scroll-progress]",
        );
        const circle = document.querySelector<SVGPathElement>(
            "#circle_progress path",
        );

        if (!section || !circle) return;

        const totalLength = circle.getTotalLength();

        // Початкові стилі
        circle.style.strokeDasharray = `${226}`;
        circle.style.strokeDashoffset = `${226 - totalLength}`;
        circle.style.transition = "stroke-dashoffset 0.3s ease-out";

        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollTop / docHeight;

            const offset = totalLength * (1 - progress);
            circle.style.strokeDashoffset = `${offset}`;

            section.style.opacity = progress > 0.05 ? "1" : "0";
            section.style.visibility = progress > 0.05 ? "visible" : "hidden";

            console.log("docHeight", docHeight);
        };

        updateProgress();

        window.addEventListener("scroll", updateProgress);
        window.addEventListener("resize", updateProgress);

        section.addEventListener("click", () => {
            window.scrollTo({top: 0, behavior: "smooth"});
        });

        return () => {
            window.removeEventListener("scroll", updateProgress);
            window.removeEventListener("resize", updateProgress);
        };
    }, []);

    return (
        <section className="up-botton">
            <div data-scroll-progress className="circle-box">
                <ArrowUpIcon className="icon-arrow" />
                <CircleIcon id="circle_progress" className="icon-circle" />
            </div>
        </section>
    );
};

export default UpButton;

import React, {useEffect, useRef} from "react";

import "@/assets/scss/components/up-button.scss";

import ProgressIcon from "@/assets/icons/progress.svg?react";
import ArrowUpIcon from "@/assets/icons/arrow-up.svg?react";

const ScrollProgress: React.FC = () => {
    const circleBox = useRef<HTMLDivElement>(null);
    const progressCircle = useRef<SVGSVGElement>(null);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
        let progress = docHeight > 0 ? scrollTop / docHeight : 0;

        progress = Math.min(Math.max(progress, 0), 1);

        if (progress > 0.05) {
            circleBox.current?.classList.add("active");
        } else {
            circleBox.current?.classList.remove("active");
        }

        if (progressCircle.current) {
            progressCircle.current.style.setProperty(
                "--progress",
                `${1 - progress}`,
            );
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <section className="scroll-progress" onClick={handleClick}>
            <div ref={circleBox} className="circle-box">
                <ArrowUpIcon className="icon-arrow" />
                <ProgressIcon ref={progressCircle} className="icon-progress" />
            </div>
        </section>
    );
};

export default ScrollProgress;

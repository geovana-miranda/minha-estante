import type { ReactNode } from "react";

interface ISectionProps {
  children: ReactNode;
}

const Section = ({ children }: ISectionProps) => {
  return (
    <section className="w-4xl h-auto mx-auto my-3 px-10 py-5 rounded-3xl shadow bg-white border border-gray-300">
      {children}
    </section>
  );
};

export default Section;

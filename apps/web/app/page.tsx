import { Categories } from "../components/landing-page/categories";
import { Hero } from "../components/landing-page/hero";
import { Testimonials } from "../components/landing-page/testimonials";
import { TrustedBy } from "../components/landing-page/trusted-by";
import { WhyChoose } from "../components/landing-page/why-choose";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <WhyChoose />
      <Categories />
      <Testimonials />
    </>
  );
}

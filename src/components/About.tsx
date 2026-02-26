"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="bg-soft-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="font-body text-xs font-semibold tracking-[0.2em] text-warm-amber uppercase">
            Who We Are
          </span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold text-deep-espresso sm:text-4xl lg:text-5xl">
            Empowering Brands
            <br />
            Since 2014
          </h2>
          <p className="mt-6 font-body text-base leading-relaxed text-warm-gray sm:text-lg">
            Founded in 2014, MLBS International Marketing Sdn. Bhd. has grown
            into a strategic force in digital marketing. Operating under the
            banner of My Hometown Media, we specialize in social media
            marketing, online reputation management, and digital engagement
            solutions.
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-warm-gray sm:text-lg">
            Our passion lies in empowering businesses to build lasting brand
            value through innovative, data-driven strategies. We offer holistic
            advertising, marketing, and communications services designed to
            resonate with audiences from the inside-out.
          </p>
          <div className="mt-8 flex gap-8">
            <div>
              <span className="font-heading text-2xl font-extrabold text-warm-amber">
                9M+
              </span>
              <p className="mt-1 font-body text-sm text-warm-gray">
                Fans & Followers
              </p>
            </div>
            <div>
              <span className="font-heading text-2xl font-extrabold text-warm-amber">
                100M+
              </span>
              <p className="mt-1 font-body text-sm text-warm-gray">
                Monthly Online Traffic
              </p>
            </div>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-3xl bg-light-sand">
            <div className="flex flex-col items-center gap-3 text-warm-gray/50">
              <svg
                className="h-16 w-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                />
              </svg>
              <span className="text-sm font-medium">Company Photo</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

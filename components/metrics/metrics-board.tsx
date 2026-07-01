"use client";

import { motion } from "framer-motion";

import { metrics } from "@/content/metrics";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { MetricReadout } from "@/components/metrics/metric-readout";

export function MetricsBoard() {
  const heroMetric = metrics.find((metric) => metric.hero);
  const restMetrics = metrics.filter((metric) => !metric.hero);

  return (
    <Section id="metrics">
      <Container>
        <SectionHeading
          index="03"
          title="Leadership Metrics"
          description="Every number below is sourced, not rounded up for effect."
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.08)}
          className="grid grid-cols-2 grid-flow-row-dense gap-4 lg:grid-cols-4"
        >
          {heroMetric && (
            <motion.div variants={fadeInUp} className="col-span-2 row-span-2">
              <MetricReadout metric={heroMetric} hero />
            </motion.div>
          )}
          {restMetrics.map((metric) => (
            <motion.div key={metric.id} variants={fadeInUp}>
              <MetricReadout metric={metric} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

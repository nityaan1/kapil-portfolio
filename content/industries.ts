/**
 * Industry/domain exposure, sourced from docs/content-inventory.md's
 * "Industry/Domain Exposure" list. Each `context` line restates a fact
 * already established in the Career Timeline data — it does not introduce
 * anything new.
 */

export interface Industry {
  id: string;
  label: string;
  context: string;
}

export const industries: Industry[] = [
  {
    id: "technology",
    label: "Technology",
    context: "Enterprise technology sales leadership at Dell Technologies and HP Inc.",
  },
  {
    id: "telecom",
    label: "Telecommunications",
    context: "Two decades across Bharti Airtel, MTS, and Vodafone Idea.",
  },
  {
    id: "bfsi",
    label: "BFSI",
    context: "Led Vodafone Idea's BFSI vertical as VP & National Sales Head, serving clients including SBI and HDFC.",
  },
  {
    id: "iot",
    label: "IoT",
    context: "Enabled enterprise adoption of IoT solutions as Head for Global Enterprise at Vodafone Idea.",
  },
  {
    id: "smart-cities",
    label: "Smart Cities",
    context: "Helped enterprise clients adopt Smart Cities solutions at Vodafone Idea's Global Enterprise business.",
  },
  {
    id: "unified-comms",
    label: "Unified Communications",
    context: "Enabled client adoption of Unified Communications at Vodafone Idea's Global Enterprise business.",
  },
  {
    id: "cloud",
    label: "Cloud",
    context: "Enabled client adoption of Cloud technologies at Vodafone Idea's Global Enterprise business.",
  },
  {
    id: "enterprise-networking",
    label: "Enterprise Networking",
    context: "Built and scaled enterprise networking solutions across Bharti Airtel and Vodafone Idea.",
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity & Data Protection",
    context: "Part of the enterprise portfolio he leads today at Dell Technologies.",
  },
  {
    id: "servers-compute",
    label: "Servers & Compute",
    context: "Core to the Client Service Group and Infrastructure Solutions Group portfolio he manages at Dell.",
  },
  {
    id: "end-point-devices",
    label: "End Point Devices",
    context: "End-user computing focus across his HP and Dell enterprise sales roles.",
  },
  {
    id: "ai-transformation",
    label: "AI-Driven Transformation",
    context: "Champions AI-driven modernization for customer organizations in his current role at Dell.",
  },
];

/**
 * Leadership metrics, sourced from the Leadership Metrics table in
 * docs/content-inventory.md. `value` is numeric so MetricReadout can
 * animate it with a count-up; prefix/suffix carry the currency/unit.
 */

export interface Metric {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  hero?: boolean;
}

export const metrics: Metric[] = [
  {
    id: "years",
    value: 25,
    suffix: "+",
    label: "years in enterprise tech & telecom",
    hero: true,
  },
  {
    id: "budget",
    value: 211,
    prefix: "$",
    suffix: "M",
    label: "largest revenue budget owned",
  },
  {
    id: "pnl",
    value: 100,
    prefix: "$",
    suffix: "M+",
    label: "peak P&L responsibility",
  },
  {
    id: "growth",
    value: 23,
    suffix: "%",
    label: "peak year-over-year revenue growth",
  },
  {
    id: "team",
    value: 35,
    label: "largest team led",
  },
  {
    id: "companies",
    value: 6,
    label: "enterprises led business for",
  },
  {
    id: "dell-clients",
    value: 500,
    suffix: "+",
    label: "clients served at Dell",
  },
  {
    id: "hp-clients",
    value: 45,
    suffix: "+",
    label: "clients served at HP",
  },
];

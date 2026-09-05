import { formatShortDate } from "@/utils/dates";

export function testFormatShortDate() {
  const result = formatShortDate("2026-07-03");

  if (result !== "Jul 3") {
    throw new Error(`Expected Jul 3, received ${result}`);
  }
}

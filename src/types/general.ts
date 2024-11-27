import { CssColor, InlineSvg } from "inferred-types/types";

export type Direction = "up" | "down" | "left" | "right";

/**
 * A general purpose shape which can be grouped using the
 * `<group :data="data" />`
 */
export type GroupedItem = {
  id: string;
  name?: string;
  href?: string;
  /** hover text for an item, activated on hover */
  hover?: string;
  /** popover HTML content, activated with click */
  popover?: string;

  match?: string | RegExp;
  to?: string;

  /**
   * the primary text color -- defined in a valid CSS syntax (including variables) -- for
   * the text in this item.
   */
  textColor?: CssColor;
  bgColor?: CssColor;
  text?: string;
  /**
   * inline SVG content
   */
  svg?: InlineSvg;
  iconName?: string;
  disabled?: boolean;

  [key: string]: any;
}



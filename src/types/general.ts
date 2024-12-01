import { CssColor, InlineSvg } from "inferred-types/types";

export type Direction = "up" | "down" | "left" | "right";

/**
 * A general purpose shape which can be used for providing standard
 * shapes which in turn can be used inside the `Group` component easily.
 */
export type ParamData = {
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
   * An **SVG icon** represented in one of the following manners:
   * 
   * 1. a simple string representing the **iconify** name the icon (e.g., `carbon-home`)
   * 2. an inline SVG
   */
  icon?: string;
  disabled?: boolean;

  [key: string]: any;
}


export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type AutoSize = "auto" | "xs" | "sm" | "md" | "lg" | "xl";

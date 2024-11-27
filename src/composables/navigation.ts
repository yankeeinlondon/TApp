import {  isString,  isObject } from "inferred-types/runtime";
import { init } from "@paralleldrive/cuid2";

const createId = init({
  // A custom random function with the same API as Math.random.
  // You can use this to pass a cryptographically secure random function.
  random: Math.random,
  // the length of the id
  length: 10,
  // A custom fingerprint for the host environment. This is used to help
  // prevent collisions when generating ids in a distributed system.
  fingerprint: 'ken.net-navigation-item',
});

/**
 * Type guard which checks whether passed in value is a `NavItem`.
 */
export const isNavItem = (val: unknown): val is NavItem => {
  return isObject(val) && "title" in val && "match" in val;
}

/**
 * A way to describe a navigation item
 */
export type NavItem = {
  /**
   * A unique identifier for the item.
   *
   * Note: will be auto-generated when using `useNavigation` when not detected
   * but if you want to state it explicitly it will not be overwritten.
   */
  id?: string;
  /**
   * The text which should be displayed in the navigation UI.
   *
   * **Note:** _you can pass in a callback function which returns a string too
   * which can be useful in cases where you are using i18n and other more dynamic
   * situations_.
   */
  title: string | ComputedRef<string>;

  /**
   * optionally you may express text/html which you'd like to be shown as a
   * popover effect on hover.
   *
   * **Note:** the popover effect itself must be implemented in your navigation element
   * for this to work.
   */
  popover?: string;
  /**
   * when this navigation option is detected as being active it should be
   * removed from the navigation UI
   */
  hideWhenActive?: boolean;
  match: RegExp;
  active?: Ref<boolean>;
}

export type NavItemFinalized = {
  id: string;
  title: string | ComputedRef<string>;
  popover?: string;
  match: RegExp;
  active: Ref<boolean>;
}

export type NavigationOptions = {
  useI18n?: boolean | string;
}

const localize = <
  T extends readonly (string | ComputedRef<string> | NavItem)[]
>(
  items: T,
  base: null | string
) => {
  if (base) {
    const { t } = useI18n()
    return items.map(i =>
      isString(i) || (isNavItem(i) && isString(i.title))
        ? computed(() => isString(i)
            ? t(`${[base, i].join(".")}`)
            : t(`${[base, i.title].join(".")}`)
          )
        : i
    )
  } else {
    return items;
  }
}

/**
 * **useNavigation**`(items)`
 *
 * A VueJS _composable_ which provides a simply way to get:
 *
 * - an array of navigation "areas" which you'll use in your UI
 *    - your definition can be either a `NavItem` or just a plain string
 *    - you may express popover text when using `NavItem` but you'll need
 * to be sure that your UI supports this
 * - you may optionally use i18n titles (and/or popover text) by setting
 * the `i18n` option to **true** or a string value representing the base
 * i18n key.
 * - alternatively, you _can_ pass in a referenced value for title
 * and that will be respected over doing any i18n magic.
 */
export const useNavigation =  <
  T extends readonly (string | ComputedRef<string> | NavItem)[]
>(
  items: T,
  opt?: NavigationOptions
)  => {
  const router = useRouter();
  const base = opt?.useI18n
    ? typeof opt.useI18n === "string"
      ? opt.useI18n
      : "nav"
    : null;


  return computed(() => {
    /**
     * `NavItem` or _string_ route areas converted to a list of fully
     * qualified `NavItemFinalized` items.
     */
    const routes: NavItemFinalized[] = localize(items, base).map(i => {
        return isString(i)
          ? {
              id: `${i}-${createId()}`,
              title: i,
              match: new RegExp(`/${i.toLowerCase()}.*`),
              active: ref(false)
            } satisfies NavItemFinalized
          : isRef(i)
            ? {
                id: createId(),
                title: i as unknown as ComputedRef<string>,
                match: new RegExp(`/${i.value.toLowerCase()}.*`),
                active: ref(false)
              } satisfies NavItemFinalized
            : isNavItem(i)
              ? {
                  ...i,
                  id: i.id || createId(),
                  active: ref(false)
                } satisfies NavItemFinalized
            : null as never;
    })
    .map(i => i.match.test(router.currentRoute.value.path)
      ? {...i, active: ref(true)}
      : {...i, active: ref(false)}
    );

    return {
      router,
      routes,
      go: async (id: string) => {
        const found = routes.find(r => r.id === id);
        if (found) {
          await router.push(`/${found?.title.toLowerCase()}`);
        } else {
          console.error(`Passed in an invalid id [${id}] to go() method. Valid id's are: ${routes.map(r => r.id).join(", ")}`)
        }
      }
    }

  })

}

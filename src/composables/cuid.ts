
import { init } from "@paralleldrive/cuid2";

let cuid: (() => string) | null = null;

const initialize = () => {
  return init({
    // A custom random function with the same API as Math.random.
  // You can use this to pass a cryptographically secure random function.
  random: Math.random,
  // the length of the id
  length: 10,
  // A custom fingerprint for the host environment. This is used to help
  // prevent collisions when generating ids in a distributed system.
  fingerprint: 'ken.net-navigation-item',
  })
}


export const useCuid = () => {
  if(!cuid) {
    cuid = initialize();
  }

  return {
    cuid: () => (cuid as () => string)(),
    initialize: () => initialize()
  }

}

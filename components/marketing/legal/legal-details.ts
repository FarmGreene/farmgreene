/**
 * Shared facts for the policy pages, so the two documents can never drift
 * apart on who the controller is or when they were last revised.
 *
 * Farmgreene is not incorporated. Under the Nigeria Data Protection Act 2023 a
 * natural person who determines the purposes and means of processing is still
 * a data controller, so the controller named here is the founder personally.
 * When the company is registered, update CONTROLLER and add the RC number —
 * both documents pick it up.
 */
export const CONTROLLER = {
  name: "Emmanuel Owolabi",
  /** How the service is presented to the public. */
  tradingAs: "Farmgreene",
  incorporated: false,
  email: "emmycookcodes@gmail.com",
  country: "Nigeria",
};

export const LAST_UPDATED = "13 August 2026";

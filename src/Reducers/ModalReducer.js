import { modalConstants } from "Constants";

export function modal(state = {}, action) {
  switch (action.type) {
    case modalConstants.OPEN:
      return {
        open: true
      };
    case modalConstants.CLOSE:
      return {
        open: false
      };

    default:
      return state;
  }
}

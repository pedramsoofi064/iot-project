import { configure } from "vee-validate";

// setInteractionMode('lazy'); // blur or change
configure({
  classes: {
    valid: "is-valid",
    invalid: "is-invalid",
    dirty: ["is-dirty", "is-dirty"], // multiple classes per flag!
    // ...
  },
});

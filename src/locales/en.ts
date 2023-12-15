const common = {
  validation: {
    required: "{name} must be filled.",
  },
} as const;

const components = {
  calendar: {
    acceptText: "Apply",
    cancelText: "Cancel",
  },

  timePicker: {
    toolbarTitle: "Select time",
    cancelText: "Cancel",
    labels: ["Hour", "Minutes"],
  },
} as const;

const fourOFour = {
  title: "Well, Page Not Found",
  description:
    "This page does not exist on Rey. Come on, double-check your destination link or return to",
  action: "Home",
} as const;

const fiveHundred = {
  title: "Sorry, System Error",
  description:
    "Rey's system is experiencing problems. Please try again in a few moments or contact us via",
  action: "WhatsApp",
} as const;

export default {
  common,
  components,
  fourOFour,
  fiveHundred,
} as const;

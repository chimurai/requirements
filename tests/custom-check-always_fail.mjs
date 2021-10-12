export default {
  custom: {
    'Title Always Failure': {
      errorMessage: `Error message when failure occurs.`,
      fn: async () => {
        throw new Error('This example always fails.');
      },
    },
  },
};

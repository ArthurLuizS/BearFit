import { defineStore } from "pinia";

export const useSheet = defineStore("sheet", {
  state: () => ({
    WorkoutSheet: {
      id: null,
      title: "ABCDE",
      createdAt: null,
      sheets: [
        {
          id: null,
          name: "LegDay",
          muscleGroup: null,
          notes: null,
          exercises: [
            {
              id: null,
              name: "LegPress",
              muscleGroup: null,
              sets: null,
              reps: null,
              weight: null,
              restSeconds: null,
              notes: null,
            },
          ],
        },
        { name: "LegDay" },
        { name: "LegDay" },
        { name: "LegDay" },
        { name: "LegDay" },
        { name: "LegDay" },
        { name: "LegDay" },
        { name: "LegDay" },
        { name: "LegDay" },
        { name: "LegDay" },
        { name: "LegDay" },
        { name: "LegDay" },
        { name: "LegDay" },
        { name: "LegDay" },
        { name: "LegDay" },
        { name: "LegDay" },
        { name: "LegDay" },
        { name: "LegDay" },
        { name: "LegDay" },
        { name: "LegDay" },
      ],
    },
    exercise: {
      id: null,
      name: null,
      muscleGroup: null,
      sets: null,
      reps: null,
      weight: null,
      restSeconds: null,
      notes: null,
    },
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    moreService() {},
  },
});

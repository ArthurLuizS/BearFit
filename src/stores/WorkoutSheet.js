import { defineStore } from "pinia";

export const useSheet = defineStore("sheet", {
  state: () => ({
    WorkoutSheet: {
      id: null,
      title: "ABCDE",
      createdAt: null,
      sheets: [
        {
          id: 1,
          name: "LegDay",
          muscleGroup: null,
          notes: null,
          exercises: [
            {
              id: 1,
              name: "LegPress",
              muscleGroup: null,
              sets: null,
              reps: null,
              weight: "120kg",
              restSeconds: null,
              notes: "amplitude maxima",
              weightHistory: [
                { date: "22/01/2010", weight: 120 },
                { date: "10/01/2010", weight: 110 },
                { date: "02/01/2010", weight: 100 },
              ],
            },
            {
              id: 2,
              name: "Agachamento",
              muscleGroup: null,
              sets: null,
              reps: null,
              weight: null,
              restSeconds: null,
              notes: null,
            },
            {
              id: 3,
              name: "Cadeira flexora",
              muscleGroup: null,
              sets: null,
              reps: null,
              weight: null,
              restSeconds: null,
              notes: null,
            },
            {
              id: 4,
              name: "Cadeira Extensora",
              muscleGroup: null,
              sets: null,
              reps: null,
              weight: null,
              restSeconds: null,
              notes: null,
            },
          ],
        },
        { name: "Biceps" },
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

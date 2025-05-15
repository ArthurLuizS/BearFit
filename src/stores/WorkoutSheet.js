import { defineStore } from "pinia";
import { Storage } from "@capacitor/storage";
import { v4 as uuidv4 } from "uuid";

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
    savedDataList: [],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async addItem(item, options = { reload: true }) {
      const id = uuidv4();
      try {
        await Storage.set({
          key: id,
          value: JSON.stringify(item),
        });
        const storedKeys = await Storage.get({ key: "keys" });
        const keys = storedKeys.value ? JSON.parse(storedKeys.value) : [];
        keys.push(id);

        await Storage.set({
          key: "keys",
          value: JSON.stringify(keys),
        });

        console.log("Item salvo com id:", id);
        if (options.reload) {
          await this.loadAllItems();
        }
      } catch (e) {
        console.error("Error saving data", e);
      }
    },

    async loadAllItems() {
      try {
        const storedKeys = await Storage.get({ key: "keys" });
        const keys = storedKeys.value ? JSON.parse(storedKeys.value) : [];

        const allData = [];
        for (const id of keys) {
          const { value } = await Storage.get({ key: id });
          allData.push({
            id,
            data: value ? JSON.parse(value) : null,
          });
        }

        this.savedDataList = allData;
        if (this.savedDataList.length === 0) {
          this.addDefaultExercises();
        }
        console.log("All data loaded:", allData);
        return allData;
      } catch (e) {
        console.error("Error loading all data", e);
      }
    },

    async addDefaultExercises() {
      const exercises = [
        {
          name: "Pulley Frente",
          muscleGroup: "costas",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Remada Curvada com Barra",
          muscleGroup: "costas",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Remada Aberta (litle horse)",
          muscleGroup: "costas",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Crucifixo Inverso",
          muscleGroup: "ombros",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Rosca Simultânea com Halteres",
          muscleGroup: "biceps",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Extensão Lombar",
          muscleGroup: "costas",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Supino Máquina",
          muscleGroup: "peito",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Supino inclinado",
          muscleGroup: "peito",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Crucifixo",
          muscleGroup: "peito",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Crossover",
          muscleGroup: "peito",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Elevação Lateral",
          muscleGroup: "ombros",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Triceps Pulley",
          muscleGroup: "triceps",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Tríceps Frances",
          muscleGroup: "triceps",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Abdômen Máquina",
          muscleGroup: "abdomen",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Agachamento Livre",
          muscleGroup: "pernas",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Agachamento Smith",
          muscleGroup: "pernas",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Agachamento Hack",
          muscleGroup: "pernas",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "LegPress",
          muscleGroup: "pernas",
          impactLevel: "medio",
          category: "exercícios",
        },

        {
          name: "Cadeira Extensora",
          muscleGroup: "pernas",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Cadeira Flexora",
          muscleGroup: "pernas",
          impactLevel: "medio",
          category: "exercícios",
        },

        {
          name: "Panturrilha Sentado",
          muscleGroup: "Panturrilhas",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Panturrilha em Pé",
          muscleGroup: "Panturrilha",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Mesa Flexora",
          muscleGroup: "pernas",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Cadeira Abdutora",
          muscleGroup: "pernas",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Flexora em pé unilateral",
          muscleGroup: "pernas",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Elevação Pélvica",
          muscleGroup: "pernas",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Cadeira Adutora",
          muscleGroup: "pernas",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Rosca Direta Barra W",
          muscleGroup: "biceps",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Rosca Scott",
          muscleGroup: "biceps",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Rosca 45°",
          muscleGroup: "pernas",
          impactLevel: "medio",
          category: "exercícios",
        },
        {
          name: "Rosca Testa",
          muscleGroup: "biceps",
          impactLevel: "medio",
          category: "exercícios",
        },
      ];

      for (const exercise of exercises) {
        await this.addItem(exercise, { reload: false });
      }
      await this.loadAllItems();
    },

    async loadItem(id) {
      try {
        const { value } = await Storage.get({ key: id });
        const data = value ? JSON.parse(value) : null;
        console.log("Loaded sheet by id:", id, data);
        return data;
      } catch (e) {
        console.error("Error loading data by id", e);
      }
    },

    async updateItem(id, newData) {
      try {
        await Storage.set({
          key: id,
          value: JSON.stringify(newData),
        });
        console.log("Data updated:", id);
        this.loadAllItems();
      } catch (e) {
        console.error("Error updating data", e);
      }
    },

    async deleteItem(id) {
      try {
        await Storage.remove({ key: id });

        const storedKeys = await Storage.get({ key: "keys" });
        let keys = storedKeys.value ? JSON.parse(storedKeys.value) : [];
        keys = keys.filter((k) => k !== id);

        await Storage.set({
          key: "keys",
          value: JSON.stringify(keys),
        });

        console.log("Data removed:", id);
        this.loadAllItems();
      } catch (e) {
        console.error("Error removing data", e);
      }
    },

    async clearAllItems() {
      try {
        await Storage.clear();
        this.savedDataList = [];
        console.log("All data cleared!");
      } catch (e) {
        console.error("Error clearing all data", e);
      }
    },
  },
});

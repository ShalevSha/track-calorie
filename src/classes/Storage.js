class Storage {
  static getCaloriesLimit(defaultLimit = 2000) {
    let caloriesLimit;
    if (localStorage.getItem("caloriesLimit") === null) {
      caloriesLimit = defaultLimit;
    } else {
      caloriesLimit = +localStorage.getItem("caloriesLimit");
    }
    return caloriesLimit;
  }
  static setCaloriesLimit(caloriesLimit) {
    localStorage.setItem("caloriesLimit", caloriesLimit);
  }

  static getTotalCalories(defaultTotalCalories = 0) {
    let totalCalories;
    if (localStorage.getItem("totalCalories") == null) {
      totalCalories = defaultTotalCalories;
    } else {
      totalCalories = +localStorage.getItem("totalCalories");
    }
    return totalCalories;
  }
  static updateTotalCalories(totalCalories) {
    localStorage.setItem("totalCalories", totalCalories);
  }

  static getMeals(defaultMeals = []) {
    let meals;
    if (localStorage.getItem("meals") == null) {
      meals = defaultMeals;
    } else {
      meals = JSON.parse(localStorage.getItem("meals"));
    }
    return meals;
  }
  static saveMeal(meal) {
    const meals = this.getMeals();
    meals.push(meal);
    const mealsString = JSON.stringify(meals);
    localStorage.setItem("meals", mealsString);
  }

  static getWorkouts(defaultworkout = []) {
    let workouts;
    if (localStorage.getItem("workouts") == null) {
      workouts = defaultworkout;
    } else {
      workouts = JSON.parse(localStorage.getItem("workouts"));
    }
    return workouts;
  }
  static saveWorkout(workout) {
    const workouts = this.getWorkouts();
    workouts.push(workout);
    const workoutsString = JSON.stringify(workouts);
    localStorage.setItem("workouts", workoutsString);
  }

  static removeMeal(id) {
    const meals = this.getMeals();
    const filterdMeals = meals.filter((object) => {
      return object.id != id;
    });
    const filterdMealsString = JSON.stringify(filterdMeals);
    localStorage.setItem("meals", filterdMealsString);

    const totalCalories = this.getTotalCalories();
    this.updateTotalCalories(totalCalories);
  }
  static removeWorkout(id) {
    const workouts = this.getWorkouts();
    workouts.forEach((workout, index) => {
      if (workout.id == id) {
        workouts.remove(workout);
        const totalCalories = this.getTotalCalories() - +workout.calories;
        console.log(this.getTotalCalories());
        console.log(workout.calories);
        this.updateTotalCalories();
      }
    });

    const filterdWorkoutsString = JSON.stringify(workouts);
    localStorage.setItem("workouts", filterdWorkoutsString);
  }

  static clearAll() {
    this.updateTotalCalories(0);
    localStorage.setItem("meals", "[]");
    localStorage.setItem("workouts", "[]");
  }
}
export default Storage;

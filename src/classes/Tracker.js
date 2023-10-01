import Storage from "./Storage";

class CalorieTracker {
  constructor() {
    this._caloreiesLimit = Storage.getCaloriesLimit();
    this._totalCalories = Storage.getTotalCalories();
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();

    this._displayCaloreiesLimit();
    this._render();
  }

  //   public method
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    Storage.updateTotalCalories(this._totalCalories);
    Storage.saveMeal(meal);
    this._displayNewMeal(meal);
    this._render();
  }
  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    Storage.updateTotalCalories(this._totalCalories);
    Storage.saveWorkout(workout);
    this._displayNewWorkout(workout);
    this._render();
  }

  removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id == id);
    if (index != -1) {
      Storage.removeMeal(id);
      this._totalCalories -= this._meals[index].calories;
      Storage.updateTotalCalories(this._totalCalories);
      this._meals.splice(index, 1);
      this._render();
    }
  }

  removeWorkout(id) {
    const index = this._workouts.findIndex((workout) => workout.id == id);
    if (index != -1) {
      Storage.removeWorkout(id);
      this._totalCalories += this._workouts[index].calories;
      Storage.updateTotalCalories(this._totalCalories);
      this._workouts.splice(index, 1);
      this._render();
    }
  }

  reset() {
    // this._caloreiesLimit = 0;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    Storage.clearAll();

    this._render();
  }

  setLimit(limit) {
    this._caloreiesLimit = limit;
    Storage.setCaloriesLimit(limit);
    this._displayCaloreiesLimit();
    this._render();
  }

  showItems() {
    this._meals.forEach((meal) => this._displayNewMeal(meal));
    this._workouts.forEach((workout) => this._displayNewWorkout(workout));
  }
  //   private method
  _displayCaloreiesLimit() {
    const caloriesLimitDiv = document.getElementById("calories-limit");
    caloriesLimitDiv.textContent = this._caloreiesLimit;
  }
  _displayCaloreiesTotal() {
    const caloriesTotalDiv = document.getElementById("calories-total");
    caloriesTotalDiv.textContent = this._totalCalories;
  }
  _displayCaloreiesConsumed() {
    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
    const caloriesConsumedDiv = document.getElementById("calories-consumed");
    caloriesConsumedDiv.textContent = consumed;
    return consumed;
  }
  _displayCaloreiesBurned() {
    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );
    const caloriesBurnedDiv = document.getElementById("calories-burned");
    caloriesBurnedDiv.textContent = burned;
    return burned;
  }
  _displayCaloreiesRemaining() {
    const remaining = this._caloreiesLimit - this._totalCalories;
    const caloriesRemainingDiv = document.getElementById("calories-remaining");
    caloriesRemainingDiv.textContent = remaining;

    const progressDiv = document.getElementById("calorie-progress");
    if (remaining < 0) {
      caloriesRemainingDiv.parentElement.parentElement.classList.remove(
        "bg-light"
      );
      caloriesRemainingDiv.parentElement.parentElement.classList.add(
        "bg-danger"
      );
      progressDiv.classList.add("bg-danger");
    } else {
      caloriesRemainingDiv.parentElement.parentElement.classList.add(
        "bg-light"
      );
      caloriesRemainingDiv.parentElement.parentElement.classList.remove(
        "bg-danger"
      );
      progressDiv.classList.remove("bg-danger");
    }
  }
  _displayaProgressBar() {
    const progressPrecantage =
      (this._totalCalories / this._caloreiesLimit) * 100;
    const progressDiv = document.getElementById("calorie-progress");
    progressDiv.style.width = progressPrecantage + "%";
  }

  _displayNewMeal(meal) {
    const mealItesmDiv = document.getElementById("meal-items");
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("card", "my-2");
    itemDiv.setAttribute("data-id", meal.id);
    itemDiv.innerHTML = `
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${meal.name}</h4>
                <div
                  class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                >
                  ${meal.calories}
                </div>
                <button class="delete btn btn-danger btn-sm mx-2">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
          </div>
            `;
    mealItesmDiv.appendChild(itemDiv);
  }

  _displayNewWorkout(workout) {
    const workoutItesmDiv = document.getElementById("workout-items");
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("card", "my-2");
    itemDiv.setAttribute("data-id", workout.id);
    itemDiv.innerHTML = `
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
            <h4 class="mx-1">${workout.name}</h4>
            <div
              class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
            >
            ${workout.calories}
            </div>
            <button class="delete btn btn-danger btn-sm mx-2">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
            `;
    workoutItesmDiv.appendChild(itemDiv);
  }

  _render() {
    this._displayCaloreiesTotal();
    this._displayCaloreiesConsumed();
    this._displayCaloreiesBurned();
    this._displayCaloreiesRemaining();
    this._displayaProgressBar();
  }
}

export default CalorieTracker;

import "@fortawesome/fontawesome-free/js/all";
import { modal, collapse } from "bootstrap";
import "./style/style.css";
import "./style/bootstrap.css";

import CalorieTracker from "./classes/Tracker";
import Meal from "./classes/Meal";
import Workout from "./classes/Workout";

class App {
  constructor() {
    this._tracker = new CalorieTracker();

    this._loadEventListeners();
    this._tracker.showItems();
  }

  _loadEventListeners() {
    document
      .getElementById("meal-form")
      .addEventListener("submit", this._newItem.bind(this, "meal"));
    document
      .getElementById("workout-form")
      .addEventListener("submit", this._newItem.bind(this, "workout"));
    document
      .getElementById("meal-items")
      .addEventListener("click", this._removeItem.bind(this, "meal"));
    document
      .getElementById("workout-items")
      .addEventListener("click", this._removeItem.bind(this, "workout"));
    document
      .getElementById("filter-meals")
      .addEventListener("keyup", this._fliterItems.bind(this, "meal"));
    document
      .getElementById("filter-workouts")
      .addEventListener("keyup", this._fliterItems.bind(this, "workout"));
    document
      .getElementById("reset")
      .addEventListener("click", this._reset.bind(this));
    document
      .getElementById("limit-form")
      .addEventListener("submit", this._setLimit.bind(this));
  }

  _newItem(type, e) {
    e.preventDefault();

    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    if (name.value == "" || calories.value == "") {
      alert("please fill all fields");
      return;
    }

    if (type == "meal") {
      const meal = new Meal(name.value, +calories.value);
      this._tracker.addMeal(meal);
    } else {
      const workout = new Workout(name.value, +calories.value);
      this._tracker.addWorkout(workout);
    }

    name.value = "";
    calories.value = "";
    document.getElementById(`collapse-${type}`).classList.remove("show");
  }

  _removeItem(type, e) {
    if (
      e.target.classList.contains("delete") ||
      e.target.parentElement.classList.contains("delete")
    ) {
      if (confirm("are you sure?")) {
        const id = e.target.closest(".my-2").getAttribute("data-id");
        if (type == "meal") {
          this._tracker.removeMeal(id);
        } else {
          this._tracker.removeWorkout(id);
        }
        e.target.closest(".my-2").remove();
      }
    } else {
      return;
    }
  }

  _fliterItems(type, e) {
    const text = e.target.value.toLowerCase();
    const items = document.querySelectorAll(`#${type}-items .card`);
    items.forEach((item) => {
      const itemText =
        item.firstElementChild.firstElementChild.firstElementChild.textContent;
      if (itemText.includes(text)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  _reset() {
    if (confirm("are you sure you want to reser?")) {
      this._tracker.reset();

      const mealItesmDiv = document.getElementById("meal-items");
      const workoutItesmDiv = document.getElementById("workout-items");
      mealItesmDiv.innerHTML = "";
      workoutItesmDiv.innerHTML = "";
    }
  }

  _setLimit(e) {
    e.preventDefault();
    const limit = document.getElementById("limit");
    if (limit.value == "") {
      limit.value = 0;
    }

    this._tracker.setLimit(+limit.value);
    const limitPopup = document.getElementById("limit-modal");
    const modal = Modal.getInstance(limitPopup);
    modal.hide();
  }
}

const app = new App();

const track = new CalorieTracker();

const meal1 = new Meal("chicken", 900);
const meal2 = new Meal("rice", 400);

const workout1 = new Workout("run", 200);
const workout2 = new Workout("run", 300);

// track.addMeal(meal1);
// track.addMeal(meal2);
// track.addWorkout(workout1);
// track.addWorkout(workout2);
// console.log(track._meals, track._workouts, track._totalCalories);

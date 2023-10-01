class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(36).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

export default Workout;

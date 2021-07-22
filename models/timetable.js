class Timetable {
  constructor(id, title, startTime, endTime, location, extra_descriptions) {
    this.id = id;
    this.title = title;
    this.startTime = startTime;
    this.endTime = endTime;
    this.location = location;
    this.extra_descriptions = extra_descriptions;
  }
}

export default Timetable;

import axios from "axios";

let test = "oj";

let Service = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
}); // variabla za komunikaciju s backend-om

let Activities = {
  async create(data) {
    let serverData = {
      name: data.name,
      addedAt: data.addedAt,
      color: data.color,
    };
    await Service.post("/activities", serverData);
    return
  },
  getAll() {
    return Service.get("/activities");
  },
};

let Sessions = {
    async create( data ) {
          let serverData = {
              name: data.name,
              date: data.date,
              startTime: data.startedAt,
              minutes: data.minutes,
              isRest: data.isRest
          }
          await Service.post('/sessions', serverData)
          return
    },
  getAll() {
    return Service.get("/sessions");
  },
};

export { test, Service, Activities, Sessions };

export default {
  currentUser: null,
  activity: [
    {
      id: "1",
      name: "JS",
      addedAt: "1.1.2021.",
      session: [
        {
          date: "16.12.2021.",
          time: "16:46",
          minutes: 20,
          isRest: false,
        },
        {
          date: "16.12.2021.",
          time: "16:46",
          minutes: 40,
          isRest: false,
        },
      ],
    },
    {
      id: "2",
      name: "BJJ",
      addedAt: "1.1.2020.",
      color: "#36495d",
      session: [
        {
          date: "16.12.2021.",
          time: "16:46",
          minutes: 90,
          isRest: false,
        },
      ],
    },
    { id: "3", name: "Vue", addedAt: "1.1.2020.", color: "#42b983", session: [
      {
        date: "16.12.2021.",
        time: "16:46",
        minutes: 20,
        isRest: false,
      },
    ],},
    { id: "4", name: "spill time", addedAt: "14.12.2021.", color: "crimson", session: [
      {
        date: "16.12.2021.",
        time: "16:46",
        minutes: 5,
        isRest: false,
      },
    ],},
  ],
  session: [
    {
      sessionId: "1",
      activityId: "1",
      activityName: "JS",
      sesh: [
        { isRest: Boolean, minutes: Number, date: Date, seshId: Number },
        { isRest: Boolean, minutes: Number, date: Date, seshId: Number },
      ],
    },
  ],
};

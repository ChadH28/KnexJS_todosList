exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("todos")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("todos").insert([
        {
          id: 1,
          title: "Whistle blower",
          user_id: 1,
        },
        {
          id: 2,
          title: "Penny for your thoughts",
          user_id: 2,
        },
        {
          id: 3,
          title: "Lost without cause",
          user_id: 3,
        },
      ]);
    });
};

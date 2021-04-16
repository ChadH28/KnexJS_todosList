exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          name: "Greg",
          email: "Greg@gmail.com",
        },
        {
          id: 2,
          name: "Shaun",
          email: "Shaun@gmail.com",
        },
        {
          id: 3,
          name: "Sam",
          email: "Sam@gmail.com",
        },
      ]);
    });
};

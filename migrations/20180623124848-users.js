module.exports = {
  up: ({ sequelize: db }) =>
    db.query(`CREATE TABLE public.users
    (
      id serial NOT NULL,
      user_name character varying(128) NOT NULL,
      password character(64),
      created_at timestamp with time zone NOT NULL,
      updated_at timestamp with time zone NOT NULL,
      CONSTRAINT users_pkey PRIMARY KEY (id)
    )`),
  down: ({ sequelize: db }) => db.query('DROP table users;'),
};

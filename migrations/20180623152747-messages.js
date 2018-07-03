module.exports = {
  up: ({ sequelize: db }) =>
    db.query(`CREATE TABLE public.messages (
      id serial NOT NULL,
      text character varying(128) NOT NULL,
      created_at timestamp with time zone NOT NULL,
      updated_at timestamp with time zone NOT NULL,
      user_id integer,
      CONSTRAINT messages_pkey PRIMARY KEY (id),
      CONSTRAINT messages_user_id_fkey FOREIGN KEY (user_id)
          REFERENCES public.users (id) MATCH SIMPLE
          ON UPDATE CASCADE ON DELETE SET NULL
    )`),
  down: ({ sequelize: db }) => db.query('DROP table messages;'),
};

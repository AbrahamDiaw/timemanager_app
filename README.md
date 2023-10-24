# TIME_MANAGER

To start your Phoenix server:

  * Run `mix setup` to install and setup dependencies
  * Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: https://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Forum: https://elixirforum.com/c/phoenix-forum
  * Source: https://github.com/phoenixframework/phoenix


https://hexdocs.pm/phoenix/

## Theme 01

### Install Phoenix on the system

```
mix archive.install hex phx_new
```

### Create the project

```
mix phx.new TIME_MANAGER --app time_manager --module TIME_MANAGER --no-html --no-assets
```

### Create Schema

- Users

mix phx.gen.json Models User users username:string email:string

```
 mix phx.gen.schema User.User users username:string email:string
```

### Configure the database

- `config/dev.exs`

```
config :time_manager, TIME_MANAGER.Repo,
  username: "postgres",
  password: "postgres",
  hostname: "localhost",
  database: "time_manager_dev",
  port: 5432,
  stacktrace: true,
  show_sensitive_data_on_connection_error: true,
  pool_size: 10
```

### Configure the routes

- `lib/time_manager_web/router.ex`

```

```

- Display routes

`mix phx.routes`
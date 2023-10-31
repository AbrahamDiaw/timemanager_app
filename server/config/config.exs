# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :time_manager,
  namespace: TIME_MANAGER,
  ecto_repos: [TIME_MANAGER.Repo],
  generators: [timestamp_type: :utc_datetime]

# Configures the endpoint
config :time_manager, TIME_MANAGERWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Phoenix.Endpoint.Cowboy2Adapter,
  render_errors: [
    formats: [json: TIME_MANAGERWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: TIME_MANAGER.PubSub,
  live_view: [signing_salt: "gLjmNRMC"]

# Configures the mailer
#
# By default it uses the "Local" adapter which stores the emails
# locally. You can see the emails in your browser, at "/dev/mailbox".
#
# For production it's recommended to configure a different adapter
# at the `config/runtime.exs`.
config :time_manager, TIME_MANAGER.Mailer, adapter: Swoosh.Adapters.Local

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Guardian config
config :time_manager, TIME_MANAGER.Guardian,
  issuer: "time_manager",
  secret_key: "XvKuNIuTCfTynky8oM8ZN35NromZt2+wsEnZLSxh4Sd7LiIZ8YpMgbHthv0y2Cax"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"

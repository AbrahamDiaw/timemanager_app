defmodule TIME_MANAGER.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      TIME_MANAGERWeb.Telemetry,
      TIME_MANAGER.Repo,
      {DNSCluster, query: Application.get_env(:time_manager, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: TIME_MANAGER.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: TIME_MANAGER.Finch},
      # Start a worker by calling: TIME_MANAGER.Worker.start_link(arg)
      # {TIME_MANAGER.Worker, arg},
      # Start to serve requests, typically the last entry
      TIME_MANAGERWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: TIME_MANAGER.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    TIME_MANAGERWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end

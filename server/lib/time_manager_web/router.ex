defmodule TIME_MANAGERWeb.Router do
  use TIME_MANAGERWeb, :router

  alias TIME_MANAGERWeb.Guardian

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :jwt_authenticated do
    plug Guardian.AuthPipeline
  end

  scope "/api", TIME_MANAGERWeb do
    pipe_through :api

    resources "/users", UserController, except: [:new, :edit]

    post "/sign_in", SecurityController, :sign_in

    get "/clocks/:userID", ClockController, :show
    post "/clocks/:userID", ClockController, :create

    post "/workingtimes/:userID", WorkingtimeController, :create
    delete "/workingtimes/:id", WorkingtimeController, :delete
    put "/workingtimes/:id", WorkingtimeController, :update
    get "workingtimes/:userID/:id", WorkingtimeController, :one
    get "workingtimes/:userID", WorkingtimeController, :all

  end

  scope "/api/v1", TIME_MANAGERWeb do
    pipe_through [:api, :jwt_authenticated]

    resources "/users", UserController, except: [:new, :edit]
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:time_manager, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: TIME_MANAGERWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end

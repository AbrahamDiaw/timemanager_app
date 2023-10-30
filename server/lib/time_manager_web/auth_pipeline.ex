defmodule TIME_MANAGERWeb.Guardian.AuthPipeline do
  use Guardian.Plug.Pipeline, otp_app: :time_manager,
  module: TIME_MANAGERWeb.Guardian,
  error_handler: TIME_MANAGERWeb.AuthErrorHandler

  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
end
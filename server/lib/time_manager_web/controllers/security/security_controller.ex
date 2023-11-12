defmodule TIME_MANAGERWeb.SecurityController do
  use TIME_MANAGERWeb, :controller
  import Comeonin.Bcrypt, only: [checkpw: 2, dummy_checkpw: 0]

  alias TIME_MANAGER.UserRepo
  alias TIME_MANAGER.Models.User
  alias TIME_MANAGER.Guardian
  action_fallback TIME_MANAGERWeb.FallbackController


  def sign_in(conn, %{"email" => email, "password" => password}) do
    case token_sign_in(email, password) do
      {:ok, token, _claims} ->
        conn |> render(:show_json_web_token, jwt: token, _claims: _claims)
      _ ->
        {:error, :unauthorized}
    end
  end

  def token_sign_in(email, password) do
    case email_password_auth(email, password) do
      {:ok, user} ->
        Guardian.encode_and_sign(user)
      _ ->
        {:error, :unauthorized}
    end
  end

  defp email_password_auth(email, password) when is_binary(email) and is_binary(password) do
    with {:ok, user} <- get_by_email(email),
         do: verify_password(password, user)
  end

  defp get_by_email(email) when is_binary(email) do
    case UserRepo.get_by_email!(email) do
      nil ->
        dummy_checkpw()
        {:error, "Login error."}
      user ->
        {:ok, user}
    end
  end

  defp verify_password(password, %User{} = user) when is_binary(password) do
    if checkpw(password, user.password) do
      {:ok, user}
    else
      {:error, :invalid_password}
    end
  end


end

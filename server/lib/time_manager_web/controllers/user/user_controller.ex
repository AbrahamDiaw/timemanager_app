defmodule TIME_MANAGERWeb.UserController do
  use TIME_MANAGERWeb, :controller

  alias TIME_MANAGER.UserRepo
  alias TIME_MANAGER.Models.User
  alias TIME_MANAGER.Guardian

  action_fallback TIME_MANAGERWeb.FallbackController

  def index(conn, _params) do
    users = UserRepo.list_users()
    render(conn, :index, users: users)
  end

  def search(conn, %{ "email" => email, "username" => username }) do
    if not is_nil(email) and not is_nil(username) do
      user = UserRepo.get_by_email_and_username!(email, username)
      render(conn, :show, user: user)
    end
  end

  def create(conn, %{"user" => user_params}) do
    password_hash = "password"
    with {:ok, %User{} = user} <- UserRepo.create_user(Map.put(user_params, "password_hash", password_hash)) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/users/#{user}")
      |> render(:show, user: user)
    end
  end


  def show(conn, %{"id" => id}) do
    user = UserRepo.get_user!(id)
    render(conn, :show, user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = UserRepo.get_user!(id)
    # TODO : manage error when user not found

    with {:ok, %User{} = user} <- UserRepo.update_user(user, user_params) do
      render(conn, :show, user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = UserRepo.get_user!(id)

    with {:ok, %User{}} <- UserRepo.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end

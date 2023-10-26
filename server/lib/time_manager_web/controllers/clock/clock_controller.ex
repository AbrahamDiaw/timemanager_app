defmodule TIME_MANAGERWeb.ClockController do
  use TIME_MANAGERWeb, :controller

  alias TIME_MANAGER.ClockRepo
  alias TIME_MANAGER.UserRepo
  alias TIME_MANAGER.Models.Clock

  action_fallback TIME_MANAGERWeb.FallbackController

  def index(conn, _params) do
    clocks = ClockRepo.list_clocks()
    render(conn, :index, clocks: clocks)
  end

  def create(conn, %{"userID" => user_id , "clock" => clock_params}) do
    user = UserRepo.get_user!(user_id)

    if not is_nil(user) do
      with {:ok, %Clock{} = clock} <- ClockRepo.create_clock(Map.put(clock_params, "user", user.id)) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", ~p"/api/clocks/#{clock}")
        |> render(:show, clock: clock)
      end
    end
  end

  def show(conn,  %{"userID" => user_id}) do
    user = UserRepo.get_user!(user_id)

    if not is_nil(user) do
      clocks = ClockRepo.get_clocks_by_user_id(user_id)
      conn
      |> put_status(:ok)
      |> render(:index, clocks: clocks)
    else
      conn
      |> put_status(:not_found)
      |> render("error.json", message: "User not found")
    end

  end

  def update(conn, %{"id" => id, "clock" => clock_params}) do
    clock = ClockRepo.get_clock!(id)

    with {:ok, %Clock{} = clock} <- ClockRepo.update_clock(clock, clock_params) do
      render(conn, :show, clock: clock)
    end
  end

  def delete(conn, %{"id" => id}) do
    clock = ClockRepo.get_clock!(id)

    with {:ok, %Clock{}} <- ClockRepo.delete_clock(clock) do
      send_resp(conn, :no_content, "")
    end
  end
end

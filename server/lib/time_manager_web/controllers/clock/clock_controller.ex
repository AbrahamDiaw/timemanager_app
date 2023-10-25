defmodule TIME_MANAGERWeb.ClockController do
  use TIME_MANAGERWeb, :controller

  alias TIME_MANAGER.Models
  alias TIME_MANAGER.Models.Clock

  action_fallback TIME_MANAGERWeb.FallbackController

  def index(conn, _params) do
    clocks = Models.list_clocks()
    render(conn, :index, clocks: clocks)
  end

  def create(conn, %{"userID" => id , "clock" => clock_params}) do
    user = Models.get_user!(id)

    if not is_nil(user) do
      with {:ok, %Clock{} = clock} <- Models.create_clock(Map.put(clock_params, "user", user.id)) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", ~p"/api/clocks/#{clock}")
        |> render(:show, clock: clock)
      end
    end
  end

  def show(conn, %{"userID" => id}) do
    clock = Models.get_clock!(id)
    render(conn, :show, clock: clock)
  end

  def update(conn, %{"id" => id, "clock" => clock_params}) do
    clock = Models.get_clock!(id)

    with {:ok, %Clock{} = clock} <- Models.update_clock(clock, clock_params) do
      render(conn, :show, clock: clock)
    end
  end

  def delete(conn, %{"id" => id}) do
    clock = Models.get_clock!(id)

    with {:ok, %Clock{}} <- Models.delete_clock(clock) do
      send_resp(conn, :no_content, "")
    end
  end
end

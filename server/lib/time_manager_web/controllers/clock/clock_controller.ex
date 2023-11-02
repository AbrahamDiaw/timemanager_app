defmodule TIME_MANAGERWeb.ClockController do
  use TIME_MANAGERWeb, :controller

  alias TIME_MANAGER.ClockRepo
  alias TIME_MANAGER.UserRepo
  alias TIME_MANAGER.WorkingtimeRepo

  alias TIME_MANAGER.Models.Clock

  action_fallback TIME_MANAGERWeb.FallbackController

  def index(conn, _params) do
    clocks = ClockRepo.list_clocks()
    render(conn, :index, clocks: clocks)
  end

  def create(conn, %{"userID" => user_id}) do
    user = UserRepo.get_user!(user_id)

    if not is_nil(user) do
      last_clock = ClockRepo.get_last_clock_by_user_id(user_id)

      new_time = DateTime.utc_now()
      new_status = if not is_nil(last_clock)
                      and last_clock.status == true do
                        false
                      else
                        true
                      end

      clock_params =
        %{
          "time" => new_time,
          "status" => new_status,
          "user" => user_id
        }

      with {:ok, %Clock{} = clock} <- ClockRepo.create_clock(clock_params) do
        if new_status == false do
          # Create working time
          worktime = WorkingtimeRepo.create_workingtime(%{
            start: last_clock.time,
            end: new_time,
            user: user_id
          })
        end

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

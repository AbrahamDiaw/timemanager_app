defmodule TIME_MANAGERWeb.WorkingtimeController do
  use TIME_MANAGERWeb, :controller

  alias TIME_MANAGER.Models
  alias TIME_MANAGER.Models.Workingtime

  action_fallback TIME_MANAGERWeb.FallbackController

  def index(conn, _params) do
    workingtimes = Models.list_workingtimes()
    render(conn, :index, workingtimes: workingtimes)
  end

  def create(conn, %{"userID" => id, "workingtime" => workingtime_params}) do
    user = Models.get_user!(id)

    with {:ok, %Workingtime{} = workingtime} <- Models.create_workingtime(Map.put(workingtime_params, "user", user.id)) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/workingtimes/#{workingtime}")
      |> render(:show, workingtime: workingtime)
    end
  end

  def show(conn, %{"id" => id}) do
    workingtime = Models.get_workingtime!(id)
    render(conn, :show, workingtime: workingtime)
  end

  def update(conn, %{"id" => id, "workingtime" => workingtime_params}) do
    workingtime = Models.get_workingtime!(id)

    with {:ok, %Workingtime{} = workingtime} <- Models.update_workingtime(workingtime, workingtime_params) do
      render(conn, :show, workingtime: workingtime)
    end
  end

  def delete(conn, %{"id" => id}) do
    workingtime = Models.get_workingtime!(id)

    with {:ok, %Workingtime{}} <- Models.delete_workingtime(workingtime) do
      send_resp(conn, :no_content, "")
    end
  end
end

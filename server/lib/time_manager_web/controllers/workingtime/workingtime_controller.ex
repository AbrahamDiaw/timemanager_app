defmodule TIME_MANAGERWeb.WorkingtimeController do
  use TIME_MANAGERWeb, :controller

  import Ecto.Query

  alias TIME_MANAGER.WorkingtimeRepo
  alias TIME_MANAGER.UserRepo
  alias TIME_MANAGER.Models.Workingtime

  action_fallback TIME_MANAGERWeb.FallbackController

  def index(conn, _params) do
    workingtimes = WorkingtimeRepo.list_workingtimes()
    render(conn, :index, workingtimes: workingtimes)
  end

  def create(conn, %{"userID" => id, "workingtime" => workingtime_params}) do
    user = UserRepo.get_user!(id)

    if not is_nil(user) do
      with {:ok, %Workingtime{} = workingtime} <- WorkingtimeRepo.create_workingtime(Map.put(workingtime_params, "user", user.id)) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", ~p"/api/workingtimes/#{workingtime}")
        |> render(:show, workingtime: workingtime)
      end
    end
  end

  def one(conn, %{"userID" => id_user, "id" => id}) do
    workingtime = WorkingtimeRepo.get_workingtime!(id)

    if workingtime.user == String.to_integer(id_user) do
      render(conn, :show, workingtime: workingtime)
    else
      conn
      |> put_status(:forbidden)  # Utilisez un autre code d'état HTTP si nécessaire
      |> put_view(TIME_MANAGERWeb.ErrorView)
      |> put_layout(false)
      |> render(conn, message: "Unauthorized access to this workingtime")
    end
  end

  def all(conn, %{"userID" => id, "start" => start_param, "end" => end_param}) do
    workingtimes= WorkingtimeRepo.get_user_workingtime!(String.to_integer(id), start_param, end_param)
    render(conn,:index, workingtimes: workingtimes)
  end

  def update(conn, %{"id" => id, "workingtime" => workingtime_params}) do
    workingtime = WorkingtimeRepo.get_workingtime!(id)

    with {:ok, %Workingtime{} = workingtime} <- WorkingtimeRepo.update_workingtime(workingtime, workingtime_params) do
      render(conn, :show, workingtime: workingtime)
    end
  end

  def delete(conn, %{"id" => id}) do
    workingtime = WorkingtimeRepo.get_workingtime!(id)

    with {:ok, %Workingtime{}} <- WorkingtimeRepo.delete_workingtime(workingtime) do
      send_resp(conn, :no_content, "")
    end
  end
end

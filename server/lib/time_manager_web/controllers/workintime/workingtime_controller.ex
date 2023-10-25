defmodule TIME_MANAGERWeb.WorkingtimeController do
  use TIME_MANAGERWeb, :controller

  import Ecto.Query

  alias TIME_MANAGER.Models
  alias TIME_MANAGER.Models.Workingtime

  action_fallback TIME_MANAGERWeb.FallbackController

  def index(conn, _params) do
    workingtimes = Models.list_workingtimes()
    render(conn, :index, workingtimes: workingtimes)
  end

  def create(conn, %{"userID" => id, "workingtime" => workingtime_params}) do
    user = Models.get_user!(id)

    if not is_nil(user) do
      with {:ok, %Workingtime{} = workingtime} <- Models.create_workingtime(Map.put(workingtime_params, "user", user.id)) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", ~p"/api/workingtimes/#{workingtime}")
        |> render(:show, workingtime: workingtime)
      end
    end
  end

  def show(conn, %{"userID" => id_user, "id" => id}) do
    workingtime = Models.get_workingtime!(id)

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

  def all(conn, %{"userID" => id}) do
    start_param = conn.query_params["start"]
    end_param = conn.query_params["end"]

    query = from w in Workingtime,
                 where: w.user == ^String.to_integer(id)

    if not is_nil(start_param) do
      query = from w in query,
                   where: fragment("? <= ?", w.start, ^start_param)
    end

    if not is_nil(end_param) do
      query = from w in query,
                   where: fragment("? >= ?", w.end, ^end_param)
    end

    workingtimes = TIME_MANAGER.Repo.all(query)

    render(conn,:show, workingtimes: workingtimes)
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

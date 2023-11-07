defmodule TIME_MANAGERWeb.WorkingtimeController do
  use TIME_MANAGERWeb, :controller

  import Ecto.Query
  alias Jason, as: JSON
  alias TIME_MANAGER.WorkingtimeRepo
  alias TIME_MANAGER.UserRepo
  alias TIME_MANAGER.Models.Workingtime

  action_fallback TIME_MANAGERWeb.FallbackController

  def index(conn, _params) do
    workingtimes = WorkingtimeRepo.list_workingtimes()
    render(conn, :index, workingtimes: workingtimes)
  end

  defp render_error(conn, error_message) do
    error_message = %{error: error_message}
    conn
    |> put_status(400)
    |> put_resp_content_type("application/json")
    |> send_resp(400, Jason.encode!(error_message))
  end

  def create(conn, %{"userID" => id, "workingtime" => workingtime_params}) do
    user = UserRepo.get_user!(id)
    workingtime_start = workingtime_params["start"]
    workingtime_end = workingtime_params["end"]
    existing_dates = WorkingtimeRepo.check_existing_date_for_user!(user.id, workingtime_start, workingtime_end)

    if workingtime_start > workingtime_end do
      render_error(conn, "La date START ne peut pas être postérieure à END.")
    else
       if length(existing_dates) > 0 do
         render_error(conn, "La date de Start ou End existe déjà !.")
       else
         if not is_nil(user) do
           with {:ok, %Workingtime{} = workingtime} <- WorkingtimeRepo.create_workingtime(Map.put(workingtime_params, "user", user.id)) do
             conn
             |> put_status(:created)
             |> put_resp_header("location", ~p"/api/workingtimes/#{workingtime}")
             |> render(:show, workingtime: workingtime)
           end
         end
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
    workingtimes = WorkingtimeRepo.get_user_workingtime!(String.to_integer(id), start_param, end_param)
    render(conn,:index, workingtimes: workingtimes)
  end

  def update(conn, %{"id" => id, "workingtime" => workingtime_params}) do
    workingtime_start = workingtime_params["start"]
    workingtime_end = workingtime_params["end"]
    if workingtime_start > workingtime_end do
      render_error(conn, "La date START ne peut pas être postérieure à END.")
    else
         workingtime = WorkingtimeRepo.get_workingtime!(id)

         with {:ok, %Workingtime{} = workingtime} <- WorkingtimeRepo.update_workingtime(workingtime, workingtime_params) do
           render(conn, :show, workingtime: workingtime)
         end
    end
  end

  def delete(conn, %{"id" => id}) do
    workingtime = WorkingtimeRepo.get_workingtime!(id)

    with {:ok, %Workingtime{}} <- WorkingtimeRepo.delete_workingtime(workingtime) do
      send_resp(conn, :no_content, "")
    end
  end
end

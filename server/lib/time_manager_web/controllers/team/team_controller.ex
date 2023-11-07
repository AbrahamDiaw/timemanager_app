defmodule TIME_MANAGERWeb.TeamController do
  use TIME_MANAGERWeb, :controller

  alias TIME_MANAGER.TeamRepo
  alias TIME_MANAGER.UserRepo

  alias TIME_MANAGER.Models.Team

  action_fallback TIME_MANAGERWeb.FallbackController

  def index(conn, _params) do
    teams = TeamRepo.list_teams()
    render(conn, :index, teams: teams)
  end

  def create(conn, %{"team" => team_params}) do
    with {:ok, %Team{} = team} <- TeamRepo.create_team(team_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/teams/#{team}")
      |> render(:show, team: team)
    end
  end

  def show(conn, %{"id" => id}) do
    team = TeamRepo.get_team!(id)
    render(conn, :show, team: team)
  end

  def update(conn, %{"id" => id, "team" => team_params}) do
    team = TeamRepo.get_team!(id)

    with {:ok, %Team{} = team} <- TeamRepo.update_team(team, team_params) do
      render(conn, :show, team: team)
    end
  end

  def delete(conn, %{"id" => id}) do
    team = TeamRepo.get_team!(id)

    with {:ok, %Team{}} <- TeamRepo.delete_team(team) do
      send_resp(conn, :no_content, "")
    end
  end

  def add_member(conn, %{ "teamID" => team_id, "userID" => user_id }) do
    if can_process_team_management(conn, team_id, user_id) do
      TeamRepo.add_team_member(team_id, user_id)
      send_resp(conn, :no_content, "")
    end
  end

  def delete_member(conn, %{ "team_id" => team_id, "user_id" => user_id }) do
    if can_process_team_management(conn, team_id, user_id) do
      team_user = TeamRepo.get_team_member(team_id, user_id)
      TeamRepo.delete_team_member(team_user)
      send_resp(conn, :no_content, "")
    end
  end

  defp can_process_team_management(conn, team_id, user_id) do
    logged_user =  Guardian.Plug.current_resource(conn)

    team = TeamRepo.get_team!(team_id)
    user = UserRepo.get_user!(user_id)

    not is_nil(logged_user) and
    not is_nil(team) and
    not is_nil(user) and
    Enum.member?([:administrator, :general_manager, :manager], logged_user.role)
  end

end

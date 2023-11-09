defmodule TIME_MANAGERWeb.TeamJSON do
  alias TIME_MANAGER.Models.Team

  alias TIME_MANAGERWeb.UserJSON
  alias TIME_MANAGER.Repo

  @doc """
  Renders a list of teams.
  """
  def index(%{teams: teams}) do
    %{data: for(team <- teams, do: data(team))}
  end

  @doc """
  Renders a single team.
  """
  def show(%{team: team}) do
    %{data: data(team)}
  end

  defp data(%Team{} = team) do
    users = Repo.preload(team, :users).users

    %{
      id: team.id,
      name: team.name,
      users: UserJSON.index_team(%{ users: users })
    }
  end
end

defmodule TIME_MANAGERWeb.UserJSON do
  alias TIME_MANAGER.Models.User

  alias TIME_MANAGER.Repo

  @doc """
  Renders a list of users.
  """
  def index(%{users: users}) do
    %{data: for(user <- users, do: data(user))}
  end

  @doc """
  Renders a single user.
  """
  def show(%{user: user}) do
    %{data: data(user)}
  end


  defp data(%User{} = user) do
    teams = Repo.preload(user, :teams)

    %{
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      teams: format_teams(teams)
    }
  end

  defp format_teams(nil), do: []
  defp format_teams(teams) do
    Enum.map(teams, &team_name/1)
  end

  defp team_name(team) do
    %{
      id: team.id,
      name: team.name
    }
  end
end

defmodule TIME_MANAGERWeb.UserJSON do
  alias TIME_MANAGER.Models.{User, Team}

  alias TIME_MANAGERWeb.TeamJSON
  alias TIME_MANAGER.Repo

  @doc """
  Renders a list of users.
  """
  def index(%{users: users}) do
    %{data: for(user <- users, do: data(user))}
  end

  @doc """
  """
  def index_team(%{users: users}) do
    %{data: for(user <- users, do: data_team(user))}
  end

  @doc """
  Renders a single user.
  """
  def show(%{user: user}) do
    %{data: data(user)}
  end

  defp data(%User{} = user) do
    teams = Repo.preload(user, :teams).teams

    %{
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      teams: TeamJSON.index(%{teams: teams})
    }
  end

  defp data_team(%User{} = user) do
    %{
      id: user.id
    }
  end
end

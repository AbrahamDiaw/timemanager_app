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
  Renders a single user.
  """
  def show(%{user: user}) do
    %{data: data(user)}
  end

  defp data(%User{} = user) do
    teams = Repo.preload(user, :teams).teams

    IO.inspect("------------------")
    IO.inspect(teams)
    IO.inspect("------------------")

    %{
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      teams: Enum.map(teams, &TeamJSON.data/1)
    }
  end
end

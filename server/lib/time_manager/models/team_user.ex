defmodule TIME_MANAGER.Models.TeamUser do
  use Ecto.Schema

  import Ecto.Changeset

  schema "team_users" do
    belongs_to(:teams, TIME_MANAGER.Models.Team, foreign_key: :team_id)
    belongs_to(:users, TIME_MANAGER.Models.User, foreign_key: :user_id)

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(team_users, attrs) do
    team_users
    |> cast(attrs, [:team_id, :user_id])
    |> validate_required([:team_id, :user_id])
    |> unique_constraint([:team_id, :user_id],
         name: :user_id_team_id_unique_index,
         message: "Already exists"
       )
  end
end

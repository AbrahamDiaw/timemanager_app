defmodule TIME_MANAGER.Models.TeamUser do
  use Ecto.Schema

  import Ecto.Changeset

  @already_exists "Already exists"

  @primary_key false
  schema "team_users" do
    belongs_to(:teams, TIME_MANAGER.Models.Team, primary_key: true)
    belongs_to(:users, TIME_MANAGER.Models.User, primary_key: true)

    timestamps(type: :utc_datetime)
  end

  @doc false
  @required_fields ~w(user_id team_id)a
  def changeset(team_users, attrs) do
    team_user
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:team_id)
    |> unique_constraint([:users, :projects],
         name: :user_id_team_id_unique_index,
         message: @already_exists
       )
  end
end

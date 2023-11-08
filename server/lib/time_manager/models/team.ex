defmodule TIME_MANAGER.Models.Team do
  use Ecto.Schema

  import Ecto.Changeset

  schema "teams" do
    field :name, :string
    many_to_many :users, TIME_MANAGER.Models.User, join_through: "team_users"

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(team, attrs) do
    team
    |> cast(attrs, [:name])
    |> validate_required([:name])
    |> unique_constraint(:name)
  end
end

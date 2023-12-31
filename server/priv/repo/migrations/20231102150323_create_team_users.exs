defmodule TIME_MANAGER.Repo.Migrations.CreateTeamUsers do
  use Ecto.Migration

  def change do
    create table(:team_users) do
      add :team_id, references(:teams, on_delete: :delete_all), foreign_key: true
      add :user_id, references(:users, on_delete: :delete_all), foreign_key: true

      timestamps(type: :utc_datetime)
    end

    create(unique_index(:team_users, [:team_id, :user_id]))
  end
end

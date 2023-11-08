defmodule TIME_MANAGER.Models.User do
  use Ecto.Schema
  import Ecto.Changeset
  import Comeonin.Bcrypt, only: [hashpwsalt: 1]

  schema "users" do
    field :username, :string
    field :email, :string
    field :role, Ecto.Enum, values: [:administrator, :employee, :manager, :general_manager]
    field :password, :string
    many_to_many :teams, TIME_MANAGER.Models.Team, join_through: "team_users"

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :email, :role, :password_hash])
    |> validate_required([:username, :email, :role], message: "Required - can't be null")
    |> unique_constraint(:email)
    |> validate_length(:password, min: 8, max: 20, message: "The password must contain between 8 and 20 characters.")
    |> validate_format(:email, ~r/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "X@X.X")
    |> validate_type(:username, :string, "Username must be a string")
    |> validate_type(:email, :string, "Email must be a string")
    |> put_password_hash
  end

  defp validate_type(changeset, field, expected_type, message) do
    value = get_field(changeset, field)
    if is_expected_type?(value, expected_type) do
      changeset
    else
      add_error(changeset, field, message)
    end
  end

  defp is_expected_type?(value, :string) do
    is_binary(value)
  end

  defp is_expected_type?(_value, _expected_type) do
    false
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}}
      ->
        put_change(changeset, :password, hashpwsalt(pass))
      _ ->
        changeset
    end
  end
end

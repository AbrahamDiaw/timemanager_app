defmodule TIME_MANAGER.Models.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :username, :string
    field :email, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :email])
    |> unique_constraint(:email)
    |> validate_required([:username, :email], message: "Required - can't be null")
    |> validate_format(:email, ~r/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "X@X.X")
    |> validate_type(:username, :string, "Username must be a string")
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
end

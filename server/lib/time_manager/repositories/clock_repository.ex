defmodule TIME_MANAGER.ClockRepo do
  @moduledoc """
  The Clock Repository context.
  """

  import Ecto.Query, warn: false

  alias TIME_MANAGER.Repo
  alias TIME_MANAGER.Models.Clock

  @doc """
  Returns the list of clocks.

  ## Examples

      iex> list_clocks()
      [%Clock{}, ...]

  """
  def list_clocks do
    Repo.all(Clock)
  end

  @doc """
  Gets a single clock.

  Raises `Ecto.NoResultsError` if the Clock does not exist.

  ## Examples

      iex> get_clock!(123)
      %Clock{}

      iex> get_clock!(456)
      ** (Ecto.NoResultsError)

  """
  def get_clock!(id), do: Repo.get!(Clock, id)

  @doc """
  Gets a multiple clock by userId.

  Raises `Ecto.NoResultsError` if the Clock does not exist.

  ## Examples

      iex> get_clocks_by_user_id!(123)
      %Clock{}

      iex> get_clocks_by_user_id!(456)
      ** (Ecto.NoResultsError)

  """
  def get_clocks_by_user_id(user_id) do
    unix_timestamp = :os.system_time(:seconds)

    {:ok, datetime} = DateTime.from_unix(unix_timestamp)

    date = DateTime.to_date(datetime)

    {:ok, start_datetime} = NaiveDateTime.new(date.year, date.month, date.day, 0, 0, 0)
    {:ok, end_datetime} = NaiveDateTime.new(date.year, date.month, date.day, 23, 59, 59)

    from(c in Clock,
      where: c.user == ^user_id and c.time >= ^start_datetime and c.time < ^end_datetime
    )

    |> Repo.all()
  end

  @doc """
  Get.

  """
  def get_last_clock_by_user_id(user_id) do
    from(c in Clock,
      where: c.user == ^user_id,
      order_by: [desc: c.time],
      limit: 1
    )

    |> Repo.one()
  end

  @doc """
  Creates a clock.

  ## Examples

      iex> create_clock(%{field: value})
      {:ok, %Clock{}}

      iex> create_clock(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_clock(attrs \\ %{}) do
    %Clock{}
    |> Clock.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a clock.

  ## Examples

      iex> update_clock(clock, %{field: new_value})
      {:ok, %Clock{}}

      iex> update_clock(clock, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_clock(%Clock{} = clock, attrs) do
    clock
    |> Clock.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a clock.

  ## Examples

      iex> delete_clock(clock)
      {:ok, %Clock{}}

      iex> delete_clock(clock)
      {:error, %Ecto.Changeset{}}

  """
  def delete_clock(%Clock{} = clock) do
    Repo.delete(clock)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking clock changes.

  ## Examples

      iex> change_clock(clock)
      %Ecto.Changeset{data: %Clock{}}

  """
  def change_clock(%Clock{} = clock, attrs \\ %{}) do
    Clock.changeset(clock, attrs)
  end
end
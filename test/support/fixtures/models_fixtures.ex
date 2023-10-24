defmodule TIME_MANAGER.ModelsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `TIME_MANAGER.Models` context.
  """

  @doc """
  Generate a user.
  """
  def user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(%{
        email: "some email",
        username: "some username"
      })
      |> TIME_MANAGER.Models.create_user()

    user
  end

  @doc """
  Generate a workingtime.
  """
  def workingtime_fixture(attrs \\ %{}) do
    {:ok, workingtime} =
      attrs
      |> Enum.into(%{
        end: ~N[2023-10-23 13:28:00],
        time: ~N[2023-10-23 13:28:00]
      })
      |> TIME_MANAGER.Models.create_workingtime()

    workingtime
  end

  @doc """
  Generate a workingtime.
  """
  def workingtime_fixture(attrs \\ %{}) do
    {:ok, workingtime} =
      attrs
      |> Enum.into(%{
        end: ~N[2023-10-23 15:17:00],
        start: ~N[2023-10-23 15:17:00]
      })
      |> TIME_MANAGER.Models.create_workingtime()

    workingtime
  end

  @doc """
  Generate a workingtime.
  """
  def workingtime_fixture(attrs \\ %{}) do
    {:ok, workingtime} =
      attrs
      |> Enum.into(%{
        end: ~N[2023-10-23 16:11:00],
        start: ~N[2023-10-23 16:11:00]
      })
      |> TIME_MANAGER.Models.create_workingtime()

    workingtime
  end

  @doc """
  Generate a clock.
  """
  def clock_fixture(attrs \\ %{}) do
    {:ok, clock} =
      attrs
      |> Enum.into(%{
        status: true,
        time: ~N[2023-10-23 15:49:00]
      })
      |> TIME_MANAGER.Models.create_clock()

    clock
  end
end

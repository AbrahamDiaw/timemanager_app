defmodule TIME_MANAGERWeb.WorkingtimeJSON do
  alias TIME_MANAGER.Models.Workingtime

  @doc """
  Renders a list of workingtimes.
  """
  def index(%{workingtimes: workingtimes}) do
    %{data: for(workingtime <- workingtimes, do: data(workingtime))}
  end

  @doc """
  Renders a single workingtime.
  """
  def show(%{workingtime: workingtime}) do
    %{data: data(workingtime)}
  end

  defp data(%Workingtime{} = workingtime) do
    %{
      start: workingtime.start,
      end: workingtime.end
    }
  end
end
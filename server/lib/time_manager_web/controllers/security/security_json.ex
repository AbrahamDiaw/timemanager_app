defmodule TIME_MANAGERWeb.SecurityJSON do
  alias TIME_MANAGER.Models.User

  @doc """
  Renders a json web token.
  """

  def show_json_web_token(%{jwt: jwt}) do
    %{jwt: jwt}
  end

end

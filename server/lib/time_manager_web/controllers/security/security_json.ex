defmodule TIME_MANAGERWeb.SecurityJSON do

  @doc """
  Renders a json web token.
  """
  def show_json_web_token(%{jwt: jwt}) do
    %{jwt: jwt}
  end

end

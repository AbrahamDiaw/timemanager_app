defmodule TIME_MANAGERWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use TIME_MANAGERWeb, :controller

  # This clause handles errors returned by Ecto's insert/update/delete.
  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(json: TIME_MANAGERWeb.ChangesetJSON)
    |> render(:error, changeset: changeset)
  end

  # This clause is an example of how to handle resources that cannot be found.
  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> put_view(html: TIME_MANAGERWeb.ErrorHTML, json: TIME_MANAGERWeb.ErrorJSON)
    |> render(:"404")
  end

  # This clause is used to process server requests without authentication.
  def call(conn, {:error, :unauthorized}) do
    conn
    |> put_status(:unauthorized)
    |> json(%{error: "authentication error"})
  end
end

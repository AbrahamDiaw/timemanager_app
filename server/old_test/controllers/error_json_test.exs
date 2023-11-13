defmodule TIME_MANAGERWeb.ErrorJSONTest do
  use TIME_MANAGERWeb.ConnCase, async: true

  test "renders 404" do
    assert TIME_MANAGERWeb.ErrorJSON.render("404.json", %{}) == %{errors: %{detail: "Not Found"}}
  end

  test "renders 500" do
    assert TIME_MANAGERWeb.ErrorJSON.render("500.json", %{}) ==
             %{errors: %{detail: "Internal Server Error"}}
  end
end

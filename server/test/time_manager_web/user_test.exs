defmodule TIME_MANAGERWeb.UserTest do
  use ExUnit.Case
  alias TIME_MANAGERWeb.UserController
  alias TIME_MANAGER.UserRepo
  alias TIME_MANAGER.Models.User

  test "index returns a list with a single user" do
    # Créez un utilisateur de test dans la base de données de test
    user = %User{id: 1, username: "user1", email: "user1@example.com", role: "general_manager", password: "password"}
    UserRepo.create_user(user)

    result = UserController.index(%{}, %{"email" => nil, "username" => nil})

    assert result == {:ok, [%{id: 1, username: "user1", email: "user1@example.com", role: "general_manager", password: "password"}]}
  end
end
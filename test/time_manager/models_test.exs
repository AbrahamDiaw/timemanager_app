defmodule TIME_MANAGER.ModelsTest do
  use TIME_MANAGER.DataCase

  alias TIME_MANAGER.Models

  describe "users" do
    alias TIME_MANAGER.Models.User

    import TIME_MANAGER.ModelsFixtures

    @invalid_attrs %{username: nil, email: nil}

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Models.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Models.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      valid_attrs = %{username: "some username", email: "some email"}

      assert {:ok, %User{} = user} = Models.create_user(valid_attrs)
      assert user.username == "some username"
      assert user.email == "some email"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Models.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      update_attrs = %{username: "some updated username", email: "some updated email"}

      assert {:ok, %User{} = user} = Models.update_user(user, update_attrs)
      assert user.username == "some updated username"
      assert user.email == "some updated email"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Models.update_user(user, @invalid_attrs)
      assert user == Models.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Models.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Models.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Models.change_user(user)
    end
  end

  describe "workingtimes" do
    alias TIME_MANAGER.Models.Workingtime

    import TIME_MANAGER.ModelsFixtures

    @invalid_attrs %{time: nil, end: nil}

    test "list_workingtimes/0 returns all workingtimes" do
      workingtime = workingtime_fixture()
      assert Models.list_workingtimes() == [workingtime]
    end

    test "get_workingtime!/1 returns the workingtime with given id" do
      workingtime = workingtime_fixture()
      assert Models.get_workingtime!(workingtime.id) == workingtime
    end

    test "create_workingtime/1 with valid data creates a workingtime" do
      valid_attrs = %{time: ~N[2023-10-23 13:28:00], end: ~N[2023-10-23 13:28:00]}

      assert {:ok, %Workingtime{} = workingtime} = Models.create_workingtime(valid_attrs)
      assert workingtime.time == ~N[2023-10-23 13:28:00]
      assert workingtime.end == ~N[2023-10-23 13:28:00]
    end

    test "create_workingtime/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Models.create_workingtime(@invalid_attrs)
    end

    test "update_workingtime/2 with valid data updates the workingtime" do
      workingtime = workingtime_fixture()
      update_attrs = %{time: ~N[2023-10-24 13:28:00], end: ~N[2023-10-24 13:28:00]}

      assert {:ok, %Workingtime{} = workingtime} = Models.update_workingtime(workingtime, update_attrs)
      assert workingtime.time == ~N[2023-10-24 13:28:00]
      assert workingtime.end == ~N[2023-10-24 13:28:00]
    end

    test "update_workingtime/2 with invalid data returns error changeset" do
      workingtime = workingtime_fixture()
      assert {:error, %Ecto.Changeset{}} = Models.update_workingtime(workingtime, @invalid_attrs)
      assert workingtime == Models.get_workingtime!(workingtime.id)
    end

    test "delete_workingtime/1 deletes the workingtime" do
      workingtime = workingtime_fixture()
      assert {:ok, %Workingtime{}} = Models.delete_workingtime(workingtime)
      assert_raise Ecto.NoResultsError, fn -> Models.get_workingtime!(workingtime.id) end
    end

    test "change_workingtime/1 returns a workingtime changeset" do
      workingtime = workingtime_fixture()
      assert %Ecto.Changeset{} = Models.change_workingtime(workingtime)
    end
  end

  describe "workingtimes" do
    alias TIME_MANAGER.Models.Workingtime

    import TIME_MANAGER.ModelsFixtures

    @invalid_attrs %{start: nil, end: nil}

    test "list_workingtimes/0 returns all workingtimes" do
      workingtime = workingtime_fixture()
      assert Models.list_workingtimes() == [workingtime]
    end

    test "get_workingtime!/1 returns the workingtime with given id" do
      workingtime = workingtime_fixture()
      assert Models.get_workingtime!(workingtime.id) == workingtime
    end

    test "create_workingtime/1 with valid data creates a workingtime" do
      valid_attrs = %{start: ~N[2023-10-23 15:17:00], end: ~N[2023-10-23 15:17:00]}

      assert {:ok, %Workingtime{} = workingtime} = Models.create_workingtime(valid_attrs)
      assert workingtime.start == ~N[2023-10-23 15:17:00]
      assert workingtime.end == ~N[2023-10-23 15:17:00]
    end

    test "create_workingtime/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Models.create_workingtime(@invalid_attrs)
    end

    test "update_workingtime/2 with valid data updates the workingtime" do
      workingtime = workingtime_fixture()
      update_attrs = %{start: ~N[2023-10-24 15:17:00], end: ~N[2023-10-24 15:17:00]}

      assert {:ok, %Workingtime{} = workingtime} = Models.update_workingtime(workingtime, update_attrs)
      assert workingtime.start == ~N[2023-10-24 15:17:00]
      assert workingtime.end == ~N[2023-10-24 15:17:00]
    end

    test "update_workingtime/2 with invalid data returns error changeset" do
      workingtime = workingtime_fixture()
      assert {:error, %Ecto.Changeset{}} = Models.update_workingtime(workingtime, @invalid_attrs)
      assert workingtime == Models.get_workingtime!(workingtime.id)
    end

    test "delete_workingtime/1 deletes the workingtime" do
      workingtime = workingtime_fixture()
      assert {:ok, %Workingtime{}} = Models.delete_workingtime(workingtime)
      assert_raise Ecto.NoResultsError, fn -> Models.get_workingtime!(workingtime.id) end
    end

    test "change_workingtime/1 returns a workingtime changeset" do
      workingtime = workingtime_fixture()
      assert %Ecto.Changeset{} = Models.change_workingtime(workingtime)
    end
  end

  describe "workingtimes" do
    alias TIME_MANAGER.Models.Workingtime

    import TIME_MANAGER.ModelsFixtures

    @invalid_attrs %{start: nil, end: nil}

    test "list_workingtimes/0 returns all workingtimes" do
      workingtime = workingtime_fixture()
      assert Models.list_workingtimes() == [workingtime]
    end

    test "get_workingtime!/1 returns the workingtime with given id" do
      workingtime = workingtime_fixture()
      assert Models.get_workingtime!(workingtime.id) == workingtime
    end

    test "create_workingtime/1 with valid data creates a workingtime" do
      valid_attrs = %{start: ~N[2023-10-23 16:11:00], end: ~N[2023-10-23 16:11:00]}

      assert {:ok, %Workingtime{} = workingtime} = Models.create_workingtime(valid_attrs)
      assert workingtime.start == ~N[2023-10-23 16:11:00]
      assert workingtime.end == ~N[2023-10-23 16:11:00]
    end

    test "create_workingtime/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Models.create_workingtime(@invalid_attrs)
    end

    test "update_workingtime/2 with valid data updates the workingtime" do
      workingtime = workingtime_fixture()
      update_attrs = %{start: ~N[2023-10-24 16:11:00], end: ~N[2023-10-24 16:11:00]}

      assert {:ok, %Workingtime{} = workingtime} = Models.update_workingtime(workingtime, update_attrs)
      assert workingtime.start == ~N[2023-10-24 16:11:00]
      assert workingtime.end == ~N[2023-10-24 16:11:00]
    end

    test "update_workingtime/2 with invalid data returns error changeset" do
      workingtime = workingtime_fixture()
      assert {:error, %Ecto.Changeset{}} = Models.update_workingtime(workingtime, @invalid_attrs)
      assert workingtime == Models.get_workingtime!(workingtime.id)
    end

    test "delete_workingtime/1 deletes the workingtime" do
      workingtime = workingtime_fixture()
      assert {:ok, %Workingtime{}} = Models.delete_workingtime(workingtime)
      assert_raise Ecto.NoResultsError, fn -> Models.get_workingtime!(workingtime.id) end
    end

    test "change_workingtime/1 returns a workingtime changeset" do
      workingtime = workingtime_fixture()
      assert %Ecto.Changeset{} = Models.change_workingtime(workingtime)
    end
  end
end

# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TIME_MANAGER.Repo.insert!(%TIME_MANAGER.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias TIME_MANAGER.Repo
alias TIME_MANAGER.Models.User
alias TIME_MANAGER.Models.Team

# PASSWORD : password

hashed_password = "$2b$12$hIFbngtcUwQQ4ARJgVKVWeVkEi7Uv3se6yieXrQg2O6V5s26uq37e"

# administrator

Repo.insert! %User{
  username: "john",
  email: "john.doe@gmail.com",
  role: :administrator,
  password: hashed_password
}

# general_manager

Repo.insert! %User{
  username: "jane",
  email: "jane.doe@gmail.com",
  role: :general_manager,
  password: hashed_password
}

# manager

Repo.insert! %User{
  username: "ken",
  email: "ken.doe@gmail.com",
  role: :manager,
  password: hashed_password
}

# employee

Repo.insert! %User{
  username: "ben",
  email: "ben.doe@gmail.com",
  role: :employee,
  password: hashed_password
}

# Team

Repo.insert! %Team{
  name: "Fc barcelone",
}

Repo.insert! %Team{
  name: "Real madrid",
}

Repo.insert! %Team{
  name: "PSG",
}

Repo.insert! %Team{
  name: "Fc Marseille",
}




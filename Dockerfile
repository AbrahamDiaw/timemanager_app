FROM  bitwalker/alpine-elixir-phoenix:latest

WORKDIR /app

EXPOSE 4000

COPY . .

RUN mix local.hex --force && mix local.rebar --force
RUN mix deps.get

RUN mix compile

CMD ["mix", "phx.server"]
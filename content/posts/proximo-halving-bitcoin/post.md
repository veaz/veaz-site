---
type: "post"
slug: "proximo-halving-bitcoin"
date: 2020-02-10
title: "El proximo halving de bitcoin"
description: "A escasos meses del proximo halving, las dudas son muchas acerca de como afectara el precio del bitcoin"
---


Estamos a pocos meses del próximo halving de Bitcoin el 3ero en su corta historia, nadie sabe con exactitud qué podría pasar, la mayoría especulan el precio con predicciones de un 1000 % modestamente, algo que no ocurrirá de un día para otro, por más que nos guste esta idea el tiempo nos ha demostrado que la paciencia es la que paga y este proceso puede demorar años. 

El primer halving ocurrió en el 29 de Noviembre del 2012, la recompensa por bloque fue reducida de 50 a 25 Bitcoins, el precio de bitcoin de apenas era de $ 12 y luego de 366 dias llego a su precio mas alto (All time high) llegando a valorarse en $ 1163, un imcremento del 9301,78 % 

https://www.tradingview.com/x/MxMQdndj/

El segundo halving ocurrió el 9 de Julio de 2016, la recompensa por bloque fue reducida de 25 a 12.5 Bitcoins, el precio de bitcoin 663 y luego de 526 dias llego a su precio mas alto de $ 19.666, un incremento de 2866,21%

https://www.tradingview.com/x/fWMdCE4K/

El tercer halvin ocurrirá el 12 de mayo del 2020, la recompensa por bloque da de 12.5 a 6.25 Bitcoin por bloque. 


Viendo más gráficas y conociendo los ciclos del mercado, podemos notar que el halving ha marcado el inicio del mercado alcista (bull run) en el pasado




Todo aquel consciente de lo importante que puede llegar a pasar este y el próximo año debido al halving vive en una ansiedad prolongada, emocionado por la llegada del mismo pero al mismo tiempo furioso por no tener mas tiempo para comprar mas satoshis. Atentos a lo que nos deparan los próximos años. 





A few days ago, I read a post about [Why you shouldn't use a web framework](https://dev.to/gypsydave5/why-you-shouldnt-use-a-web-framework-3g24) that gave me a bit of inspiration. Frameworks are great tools for full-fledged apps, but sometimes you don't need or want all the magic a framework provides.

Full disclosure though, a much better solution to what we're building is better done in Phoenix by passing `--no-ecto --no-webpack` which would get you a much better, more stable, more efficient base in which to build upon.

But thats not the point of this tutorial. We're not fully replicating Phoenix, we're making this a super simple HTTP server. You can view the full implementation [here](https://github.com/matthewsecrist/TodoOTP-HTTP).

Go ahead and open up a terminal and do `mix new todo --sup` which will get us a nice little project started with a Supervision tree. That will allow us to start the GenServer automatically when the application is ran.

We'll start by building up the GenServer portion of it. We need to be able to do all CRUD functions in the app, so we'll make a file under `todo/elixir/lib/todo/` called `server.ex`.

> server.ex

```elixir
defmodule Todo.Server do
	use GenServer

	# Client
	def start_link(opts) do
	end

	def list() do
	end

	def add(todo) do
	end

	def remove(id) do
	end

	def toggle(id) do
	end

	# Server
end
```

That lays out the client interface for us so that we can begin implementation. To start a GenServer, we call `start` or `start_link` which handles the call to `init`.

> server.ex

```elixir
...
def start_link(opts) do
	GenServer.start_link(__MODULE__, :ok, opts)
end
...

# Server

def init(:ok) do
	{:ok, []}
end
```

Going back to our Terminal, we can run our app by typing `iex -S mix` which will get a REPL. Inside, we can make sure our server starts by typing `Todo.Server.start_link([])`, and you should get the following

```
iex(1)> Todo.Server.start_link([])
{:ok, #PID<0.135.0>}
```

The PID will likely be different for you, of course.

We can go ahead and make sure that the Todo Server starts when we run `iex -S mix`. Go into `lib/todo/application.ex` and to the `start(_type, _args)` function already there.

> application.ex

```elixir
...
def  start(_type,  _args) do
	children =  [
		{Todo.Server,  [name:  Todo.Server]}
	]
...
```

Next, we'll implement the Add and List functions.

> server.ex

```elixir
...
def list() do
	GenServer.call(__MODULE__, {:list})
end

def add(todo) do
	GenServer.call(__MODULE__, {:add, todo})
end
...
# Server
...
def  handle_call({:list},  _from, state) do
	{:reply, state, state}
end

def handle_call({:add, todo}, _from, state) do
	new_todo = %{name: todo, done: false, id: generate_id()}
	new_state = state ++ [new_todo]
	{:reply, new_state, new_state}
end
...
# Private
defp generate_id() do
# This generates a basic ID for us, ends up being something
# like "CeiGYfspjHJAld42hI3OY1lbulxGkyR8W-zqXpkSMwpilPFtv0uE5jCW229-k47J"
# which will not completely prevent collisions, but will reduce
# their chances.
	:crypto.strong_rand_bytes(64)
	|>  Base.url_encode64()
	|> binary_part(0,  64)
end
```

Notice that I'm using `call` here instead of `cast`. This is because when we make our HTTP server, it will reply with the list of Todos with every response. We're not going to be dealing with holding any state on the front end, so we can't just reply with an `:ok`.

We can then go back to our terminal again and `iex -S mix`. Our GenServer should boot up with the application, so no need to call `start_link` this time. Lets try it out!

```elixir
iex(1)> Todo.Server.add("Hello")
[
	%{
		done: false,
		id: "B9aMiHTT5CAqDWY8JyxV6QbmlRdiPyLopThv_EHARk4EwRFCyRG_Ip4q5NJv7NSh",
		name: "Hello"
	}
]
iex(2)> Todo.Server.list()
[
	%{
		done: false,
		id: "B9aMiHTT5CAqDWY8JyxV6QbmlRdiPyLopThv_EHARk4EwRFCyRG_Ip4q5NJv7NSh",
		name: "Hello"
	}
]
```

Your response should look something like that. If it does, great! Lets move on to our `toggle(id)` function.

> server.ex

```elixir
...
def  toggle(id) do
	GenServer.call(__MODULE__,  {:toggle, id})
end
...
def  handle_call({:toggle, id},  _from, state) do
	[todo]  =  Enum.filter(state,  fn x -> x.id == id end)
	toggled_todo = %{todo |  done:  !todo.done}
	new_state =
		state
		|>  Enum.map(fn x ->
				if is_id?(x, id) do
					toggled_todo
				else
					x
				end
			end)
	{:reply, new_state, new_state}
end
...
# Private
defp is_id?(x, id), do: x.id == id
```

And again, we'll test it out.

```elixir
iex(1)> [todo] = Todo.Server.add("test")
[
	%{
		done: false,
		id: "KTH7L3yoHNS_-ciwdLpMbmCtW62VY8xS_VPT62yVxdXv_ZQDb1GROVmjBV6oEage",
		name: "test"
	}
]
iex(2)> Todo.Server.toggle(todo.id)
[
	%{
		done: true,
		id: "KTH7L3yoHNS_-ciwdLpMbmCtW62VY8xS_VPT62yVxdXv_ZQDb1GROVmjBV6oEage",
		name: "test"
	}
]
```

Wonderful! Next up, `remove(id)`.

> server.ex

```elixir
...
def  remove(id) do
	GenServer.call(__MODULE__,  {:delete, id})
end
...
def  handle_call({:delete, id},  _from, state) do
	new_state =
	state
	|>  Enum.filter(fn x ->
			!is_id?(x, id)
		end)
	{:reply, new_state, new_state}
end
```

And we test..

```elixir
iex(1)> [todo] = Todo.Server.add("test")
[
	%{
		done: false,
		id: "RpfnxF-YJE_A4FgsQFtg1ODhRcY90lxkSG0U0DHlVDvAfN_zDOJOVXPEkjuBAPsz",
		name: "test"
	}
]
iex(2)> Todo.Server.remove(todo.id)
[]
iex(3)> Todo.Server.list()
[]
```

Great, that makes up our abilities to add, toggle, remove and list Todos in a GenServer app. Next, we'll make our HTTP server.

[Check out part 2 here](http://www.matthewsecrist.net//building-a-basic-http-server-with-elixir-p2/)

Have any questions or comments? Feel free to send me a [tweet](https://twitter.com/_mattsecrist)!

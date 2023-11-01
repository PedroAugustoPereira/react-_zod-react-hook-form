import './index.css';

import { useState } from 'react';

import { useForm } from 'react-hook-form';

function App() {
  const [output, setOutput] = useState("");
  const { register, handleSubmit } = useForm();

  function createUser(data: unknown) {
    setOutput(JSON.stringify(data, null, 2));
  }

  //High order function

  return (
    <>
      <main className="h-screen text-zinc-300 bg-zinc-950 flex items-center justify-center">
        <form
          action=""
          className="flex flex-col gap-4 w-full max-w-xs"
          onSubmit={handleSubmit(createUser)}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="">E-mail</label>
            <input
              type="email"
              className="border border-zinc-200 shadow-sm rounded h-10 px-3"
              {...register("email")}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="">Senha</label>
            <input
              type="password"
              id=""
              className="border border-zinc-200 shadow-sm rounded h-10 px-3"
              {...register("password")}
            />
          </div>

          <button
            type="submit"
            className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
          >
            Salvar
          </button>
        </form>
      </main>
    </>
  );
}

export default App;

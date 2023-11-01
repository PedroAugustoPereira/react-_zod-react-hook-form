import './index.css';

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

const createUserFormSchema = z.object({
  email: z
    .string()
    .nonempty("O email é obrigatório")
    .email("Formato de email inválido"),
  password: z.string().min(6, "A senha precisa de pelo menos 6 caractreres"),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

function App() {
  const [output, setOutput] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  function createUser(data: unknown) {
    setOutput(JSON.stringify(data, null, 2));
  }

  //High order function

  return (
    <>
      <main className="flex-col gap-10 h-screen text-zinc-300 bg-zinc-950 flex items-center justify-center">
        <form
          action=""
          className="flex flex-col gap-4 w-full max-w-xs"
          onSubmit={handleSubmit(createUser)}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="">E-mail</label>
            <input
              type="email"
              className="bg-zinc-800 text-white  border border-zinc-600 shadow-sm rounded h-10 px-3"
              {...register("email")}
            />
            {errors.email && <span className="">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="">Senha</label>
            <input
              type="password"
              id=""
              className="bg-zinc-800 text-white border border-zinc-600 shadow-sm rounded h-10 px-3"
              {...register("password")}
            />
            {errors.password && (
              <span className="">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
          >
            Salvar
          </button>
        </form>

        <pre>{output}</pre>
      </main>
    </>
  );
}

export default App;

import './index.css';

import { useState } from 'react';

import {
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

const createUserFormSchema = z.object({
  name: z
    .string()
    .nonempty("O nome é obrigatorio")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  email: z
    .string()
    .nonempty("O email é obrigatório")
    .email("Formato de email inválido")
    .refine((email) => {
      return email.endsWith("@gmail.com");
    }, "O email precisar ser uma conta google"),
  password: z.string().min(6, "A senha precisa de pelo menos 6 caractreres"),
  techs: z
    .array(
      z.object({
        title: z.string().nonempty("Titulo obrigatório"),
        knowledge: z.coerce.number().min(1).max(100),
      })
    )
    .min(2, "Insira pelo menos duas tecnologias"),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

function App() {
  const [output, setOutput] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "techs",
  });

  function createUser(data: unknown) {
    setOutput(JSON.stringify(data, null, 2));
  }

  function addNewTech() {
    append({ title: "", knowledge: 0 });
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
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              className="bg-zinc-800 text-white  border border-zinc-600 shadow-sm rounded h-10 px-3"
              {...register("name")}
            />
            {errors.name && <span className="">{errors.name.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              className="bg-zinc-800 text-white  border border-zinc-600 shadow-sm rounded h-10 px-3"
              {...register("email")}
            />
            {errors.email && <span className="">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Senha</label>
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

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="flex items-center justify-between">
              Tecnologias
              <button
                type="button"
                className="text-emerald-500 text-xs"
                onClick={addNewTech}
              >
                Adicionar
              </button>
            </label>

            {fields.map((field, index) => {
              return (
                <div className="flex gap-2" key={field.id}>
                  <div className="flex gap-1 flex-col flex-1">
                    <input
                      type="text"
                      id=""
                      className=" bg-zinc-800 text-white border border-zinc-600 shadow-sm rounded h-10 px-3"
                      {...register(`techs.${index}.title`)}
                    />
                    {errors?.techs?.[index]?.title && (
                      <span className="">
                        {errors?.techs?.[index]?.title?.message}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-1 flex-col flex-1">
                    <input
                      type="number"
                      id=""
                      className="w-16  bg-zinc-800 text-white border border-zinc-600 shadow-sm rounded h-10 px-3"
                      {...register(`techs.${index}.knowledge`)}
                    />
                    {errors?.techs?.[index]?.knowledge && (
                      <span className="">
                        {errors?.techs?.[index]?.knowledge?.message}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            {errors.techs && <span className="">{errors.techs.message}</span>}
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

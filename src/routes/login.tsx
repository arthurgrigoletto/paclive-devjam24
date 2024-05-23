import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { Checkbox, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAuth } from '@/context/auth'
import { sleep } from '@/lib/utils'

const fallback = '/' as const

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback })
    }
  },
  component: LoginPage,
})

const signInForm = z.object({
  email: z.string().email(),
  password: z.string(),
  keepSigned: z.boolean().default(false).optional(),
})

export type SignInForm = z.infer<typeof signInForm>

function LoginPage() {
  const auth = useAuth()
  const router = useRouter()
  const navigate = Route.useNavigate()
  const search = Route.useSearch()

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: '',
      keepSigned: false,
      password: '',
    },
  })

  async function handleSignIn({ email, password }: SignInForm) {
    try {
      await auth.login({ email, password })

      await router.invalidate()

      await sleep(1)

      await navigate({ to: search.redirect || fallback })
    } catch (error) {
      console.error('Invalid credentials')
    }
  }

  return (
    <section className="grid min-h-screen grid-cols-2 bg-muted antialiased">
      <div className="flex h-full flex-col justify-center gap-4 bg-white p-10 shadow-[0_6px_24px_0_rgba(0,0,0,0.1)]">
        <div className="m-auto flex max-w-80 flex-col justify-center gap-4">
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="text-sm font-normal text-zinc-500">
            Please enter your password below to proceed or sign in with a code.
          </p>

          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSignIn)}
          >
            <Controller
              control={form.control}
              name="email"
              render={({ field }) => (
                <fieldset>
                  <label htmlFor={field.name}>Email</label>
                  <Input {...field} id={field.name} className="h-10" />
                </fieldset>
              )}
            />

            <Controller
              control={form.control}
              name="password"
              render={({ field }) => (
                <fieldset>
                  <label htmlFor={field.name}>Password</label>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    className="h-10"
                  />
                </fieldset>
              )}
            />

            <Controller
              control={form.control}
              name="keepSigned"
              render={({ field }) => (
                <fieldset className="flex flex-row items-start space-x-2 space-y-0">
                  <Checkbox
                    id={field.name}
                    checked={field.value}
                    onChange={field.onChange}
                  />
                  <label htmlFor={field.name}>Keep me signed in</label>
                </fieldset>
              )}
            />

            <button
              type="submit"
              className="item-center inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded border bg-[#B5082A] p-3 px-3 py-2 text-base font-bold text-white shadow-[0_4px_8px_0_rgba(0,0,0,0.1)]"
              disabled={form.formState.isSubmitting}
            >
              Sign In
            </button>
            <button
              type="button"
              className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded border border-[#CCD1D9] bg-white px-3 py-2 text-base font-bold shadow-[0_4px_8px_0_rgba(0,0,0,0.1)]"
              disabled={form.formState.isSubmitting}
            >
              Sign In With a Code
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

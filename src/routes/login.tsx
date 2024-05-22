import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { CircleX } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
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
      toast.error('Invalid Credentials', {
        position: 'top-right',
        icon: <CircleX />,
      })
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

          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleSignIn)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="keepSigned"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Keep me signed in</FormLabel>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                Sign In
              </Button>
              <Button
                type="button"
                className="w-full"
                variant="secondary"
                disabled={form.formState.isSubmitting}
              >
                Sign In With a Code
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  )
}

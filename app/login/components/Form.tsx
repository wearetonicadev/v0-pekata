import {
  Form as FormUI,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import { getCompanySlugFromHost } from "@/lib/utils";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().optional(),
    verificationCode: z.string().optional(),
    type: z.enum(["password", "verification"]),
  })
  .refine(
    (data) => {
      if (data.type === "password") {
        return data.password && data.password.length > 0;
      }
      if (data.type === "verification") {
        return data.verificationCode && data.verificationCode.length > 0;
      }
      return false;
    },
    {
      message:
        "Password is required for password login, verification code is required for verification login",
      path: ["password", "verificationCode"],
    }
  );

type FormSchema = z.infer<typeof formSchema>;

export const Form = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      verificationCode: "",
      type: "password",
    },
  });

  const watchType = form.watch("type");

  const loginMutation = useMutation({
    mutationFn: async (data: FormSchema) => {
      const formData = new FormData();
      formData.append("email", data.email);

      if (data.type === "password" && data.password) {
        formData.append("password", data.password);
      } else if (data.type === "verification" && data.verificationCode) {
        formData.append("verificationCode", data.verificationCode);
      }

      const response = await api.post("/admin/user-login/do-login/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Company-Slug": getCompanySlugFromHost(),
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      login(data.token, data.user);

      router.push("/");
      router.refresh();
    },
  });

  const sendEmailMutation = useMutation({
    mutationFn: async (data: FormSchema) =>
      api.post(
        "/admin/user-login/request-login-code/",
        { email: data.email },
        {
          headers: {
            "X-Company-Slug": getCompanySlugFromHost(),
          },
        }
      ),
    onSuccess: () => {
      setEmailSent(true);
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async (data: FormSchema) => {
      const response = await api.post(
        "/admin/user-login/verify-login-code/",
        { email: data.email, code: data.verificationCode },
        {
          headers: {
            "X-Company-Slug": getCompanySlugFromHost(),
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      login(data.token, data.user);

      router.push("/");
      router.refresh();
    },
  });

  const onSubmit = async (data: FormSchema) => {
    loginMutation.mutate(data);
  };

  const handleTypeChange = (newType: "password" | "verification") => {
    form.setValue("type", newType);
    setEmailSent(false);

    if (newType === "password") {
      form.setValue("verificationCode", "");
    } else {
      form.setValue("password", "");
    }
  };

  const handleOtpComplete = (value: string) => {
    form.setValue("verificationCode", value);

    verifyOtpMutation.mutate(form.getValues());
  };

  return (
    <FormUI {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {watchType === "password" && (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>
                    Correo electrónico *
                  </FormLabel>
                  <FormControl>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="Email address"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Contraseña *</FormLabel>
                  <FormControl>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder="Password"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full rounded-3xl text-white"
            >
              Entrar
            </Button>

            {loginMutation.error && (
              <div className="text-red-600 text-sm text-center">
                {loginMutation.error.message}
              </div>
            )}

            <div className="flex items-center mb-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-3 font-medium">o</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full rounded-3xl border-black"
              onClick={() => handleTypeChange("verification")}
            >
              Envíame código de verificación
            </Button>
          </>
        )}

        {watchType === "verification" && !emailSent && (
          <>
            <div className="text-sm">
              Por favor, introduce el email al que te enviaremos el código de
              verificación
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Email address</FormLabel>
                  <FormControl>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="Email address"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="button"
              disabled={sendEmailMutation.isPending}
              className="w-full"
              onClick={() => sendEmailMutation.mutate(form.getValues())}
            >
              Enviar
            </Button>

            {sendEmailMutation.error && (
              <div className="text-red-600 text-sm text-center">
                No se pudo enviar el código
              </div>
            )}

            <Button
              type="button"
              variant="link"
              className="w-full underline"
              onClick={() => handleTypeChange("password")}
            >
              Volver a inicio de sesión
            </Button>
          </>
        )}

        {watchType === "verification" && emailSent && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-xs">
                Por favor, introduce el código enviado desde el mail:
              </div>

              <div className="text-md font-bold">{form.getValues("email")}</div>

              <div className="text-xs">
                Si no lo ves, revisa la carpeta de correo no deseado, puede que
                haya sido marcado como spam
              </div>
            </div>

            <div className="flex justify-center">
              <FormField
                control={form.control}
                name="verificationCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={(e) => field.onChange(e)}
                        onComplete={handleOtpComplete}
                        render={({ slots }) => (
                          <InputOTPGroup>
                            {slots.map((props, index) => (
                              <div
                                key={index}
                                className={cn(
                                  "relative size-10 text-[2rem] mx-1 text-lg",
                                  "flex items-center justify-center",
                                  "transition-all duration-300",
                                  "border rounded-md border-w-1",
                                  "group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20",
                                  {
                                    "outline-1 outline-accent-foreground":
                                      props.isActive,
                                  }
                                )}
                              >
                                <div className="group-has-[input[data-input-otp-placeholder-shown]]:opacity-20">
                                  {props.char ?? props.placeholderChar}
                                </div>
                              </div>
                            ))}
                          </InputOTPGroup>
                        )}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="button"
              disabled={verifyOtpMutation.isPending}
              className="w-full"
              onClick={() => verifyOtpMutation.mutate(form.getValues())}
            >
              Verificar
            </Button>

            {verifyOtpMutation.error && (
              <div className="text-red-600 text-sm text-center">
                No se pudo verificar el código
              </div>
            )}

            <div className="text-center">
              <div className="text-xs">¿No has recibido el código?</div>

              <Button
                type="button"
                variant="link"
                className="text-xs underline text-[#4D955D]"
                onClick={() => sendEmailMutation.mutate(form.getValues())}
              >
                Reenviar código
              </Button>
            </div>
          </div>
        )}
      </form>
    </FormUI>
  );
};

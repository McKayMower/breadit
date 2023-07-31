"use client";

import { UsernameRequest, UsernameValidator } from "@/lib/validators/username";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { FC } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

interface UsernameFormProps {
  user: Pick<User, "id" | "username">;
}

const UsernameForm: FC<UsernameFormProps> = ({ user }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UsernameRequest>({
    resolver: zodResolver(UsernameValidator),
    defaultValues: {
      name: user?.username || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <Card>
        <CardHeader>
          <CardTitle>Your username</CardTitle>
          <CardDescription>
            Please enter a display name you are comfortable with.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative grid gap-1">
            <div className="absolute top-0 left-0 w-8 h-10 grid place-items-center">
              <span className="text-sm text-zinc-400">u/</span>
            </div>
          </div>
          <Label className="sr-only" htmlFor="name">
            Name
          </Label>
          <Input
            id="name"
            className="w-[400px] pl-6"
            size={32}
            {...register("name")}
          />
          {errors?.name && (
            <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </CardContent>
        <CardFooter>
          <Button>Change Name</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default UsernameForm;

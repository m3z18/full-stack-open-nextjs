"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import {
  registrationFormSchema,
  type LoginFormState,
  type RegistrationFormState,
} from "@/app/lib/definitions";
import { createUser, getUserByUsername } from "@/app/services/users";

export async function login(
  _previousState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const username =
    typeof formData.get("username") === "string"
      ? String(formData.get("username")).trim()
      : "";
  const password =
    typeof formData.get("password") === "string"
      ? String(formData.get("password"))
      : "";

  if (!username || !password) {
    return {
      message: "Username and password are required",
      values: { username },
    };
  }

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: "/?notification=Logged%20in",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        message: "Invalid username or password",
        values: { username },
      };
    }

    throw error;
  }

  return { values: { username } };
}

export async function logout() {
  await signOut({ redirectTo: "/?notification=Logged%20out" });
}

export async function registerUser(
  _previousState: RegistrationFormState,
  formData: FormData,
): Promise<RegistrationFormState> {
  const values = {
    username:
      typeof formData.get("username") === "string"
        ? String(formData.get("username")).trim()
        : "",
    name:
      typeof formData.get("name") === "string"
        ? String(formData.get("name")).trim()
        : "",
  };
  const validatedFields = registrationFormSchema.safeParse({
    ...values,
    password: formData.get("password"),
    passwordConfirmation: formData.get("passwordConfirmation"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the highlighted fields",
      values,
    };
  }

  const existingUser = await getUserByUsername(validatedFields.data.username);

  if (existingUser) {
    return {
      errors: { username: ["Username is already taken"] },
      message: "Registration failed",
      values,
    };
  }

  const passwordHash = await bcrypt.hash(validatedFields.data.password, 10);

  await createUser({
    username: validatedFields.data.username,
    name: validatedFields.data.name,
    passwordHash,
  });

  revalidatePath("/users");
  redirect("/login?notification=Registration%20successful");
}

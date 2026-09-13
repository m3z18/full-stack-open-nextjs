import { z } from "zod";

export const blogFormSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters"),
  author: z.string().trim().min(5, "Author must be at least 5 characters"),
  url: z.string().trim().min(5, "URL must be at least 5 characters"),
});

export type BlogFormState = {
  errors?: {
    title?: string[];
    author?: string[];
    url?: string[];
  };
  message?: string;
  values: {
    title: string;
    author: string;
    url: string;
  };
};

export const initialBlogFormState: BlogFormState = {
  values: {
    title: "",
    author: "",
    url: "",
  },
};

export const registrationFormSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(4, "Username must be at least 4 characters"),
    name: z.string().trim().min(1, "Name is required"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    passwordConfirmation: z.string().min(1, "Password confirmation is required"),
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export type RegistrationFormState = {
  errors?: {
    username?: string[];
    name?: string[];
    password?: string[];
    passwordConfirmation?: string[];
  };
  message?: string;
  values: {
    username: string;
    name: string;
  };
};

export const initialRegistrationFormState: RegistrationFormState = {
  values: {
    username: "",
    name: "",
  },
};

export type LoginFormState = {
  message?: string;
  values: {
    username: string;
  };
};

export const initialLoginFormState: LoginFormState = {
  values: {
    username: "",
  },
};

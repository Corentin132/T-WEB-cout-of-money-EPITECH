import { Controller, Route, Post, Body, Request, Security, Get } from "tsoa";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.TOKEN_KEY || "${TOKEN_KEY}";
const prisma = new PrismaClient();

interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  role: string;
  passwordConfirm: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface CreateAdminRequest {
  email: string;
  username: string;
  password: string;
  role: string;
  passwordConfirm: string;
}

interface DeleteUserRequest {
  email: string;
}

interface UpdateUserRequest {
  email: string;
  username: string;
  password: string;
  role: string;
  passwordConfirm: string;
}

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

@Route("/user")
export class UsersController extends Controller {
  private async check_email_validity(email: string): Promise<boolean> {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      throw new Error("Email already used");
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error("Invalid email");
    }
    return true;
  }

  private async check_password_requierements(
    password: string
  ): Promise<boolean> {
    if (password.length < 12) {
      throw new Error("Password must be at least 12 characters long");
    }
    if (!password.match(/[A-Z]/)) {
      throw new Error("Password must contain at least one uppercase letter");
    }
    if (!password.match(/[a-z]/)) {
      throw new Error("Password must contain at least one lowercase letter");
    }
    if (!password.match(/[0-9]/)) {
      throw new Error("Password must contain at least one number");
    }
    if (!password.match(/[^A-Za-z0-9]/)) {
      throw new Error("Password must contain at least one special character");
    }
    return true;
  }

  private async check_username_validity(username: string): Promise<boolean> {
    if (
      !username.match(/^[a-zA-Z0-9_]{3,16}$/) ||
      (await prisma.user.findFirst({ where: { username } }))
    ) {
      throw new Error("Username already used or invalid");
    }
    return true;
  }

  private async check_role_validity(role: string): Promise<boolean> {
    if (!role.match(/^[a-zA-Z0-9_]{3,16}$/)) {
      throw new Error("Invalid role");
    }
    if (!["user", "admin", "superadmin"].includes(role)) {
      throw new Error("Invalid role");
    }
    return true;
  }

  private async check_password_passwordConfirm(
    password: string,
    passwordConfirm: string
  ): Promise<boolean> {
    if (!password.match(passwordConfirm)) {
      throw new Error("Passwords do not match");
    }
    return true;
  }

  private async hash_password(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  @Post("/register")
  async register(@Body() requestBody: RegisterRequest): Promise<string> {
    const { email, username, password, role, passwordConfirm } = requestBody;
    await this.check_email_validity(email);
    await this.check_username_validity(username);
    await this.check_password_requierements(password);
    await this.check_role_validity(role);
    await this.check_password_passwordConfirm(password, passwordConfirm);
    const hashedPassword = await this.hash_password(password);

    await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
        role: role,
      },
    });

    return "User created successfully";
  }

  @Post("/login")
  async login(@Body() requestBody: LoginRequest): Promise<string> {
    const { email, password } = requestBody;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("Incorrect credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Incorrect credentials");
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET as string, {
      expiresIn: "2h",
    });
    return token;
  }

  @Post("/create_admin")
  @Security("jwt")
  async createAdmin(
    @Body() requestBody: CreateAdminRequest,
    @Request() user: DecodedToken
  ): Promise<string> {
    const { email, username, password, role, passwordConfirm } = requestBody;

    const userFromToken = await prisma.user.findUnique({
      where: { id: user.userId },
    });
    if (!userFromToken) {
      throw new Error("Incorrect credentials");
    }
    if (userFromToken.role !== "superadmin") {
      throw new Error("You are not allowed to create an admin");
    }

    await this.check_email_validity(email);
    await this.check_username_validity(username);
    await this.check_password_requierements(password);
    await this.check_role_validity(role);

    if (!["admin", "user"].includes(role)) {
      throw new Error("You are not allowed to create a superadmin");
    }

    await this.check_password_passwordConfirm(password, passwordConfirm);
    const hashedPassword = await this.hash_password(password);

    await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
        role: role,
      },
    });

    return "Admin created successfully";
  }

  @Post("/delete_user")
  @Security("jwt")
  async deleteUser(
    @Body() requestBody: DeleteUserRequest,
    @Request() user: DecodedToken
  ): Promise<string> {
    const { email } = requestBody;

    const userFromToken = await prisma.user.findUnique({
      where: { id: user.userId },
    });
    if (!userFromToken) {
      throw new Error("Incorrect credentials");
    }

    const userToDelete = await prisma.user.findUnique({ where: { email } });
    if (!userToDelete) {
      throw new Error("User does not exist, bad email");
    }

    if (userFromToken.id === userToDelete.id) {
      await prisma.user.delete({ where: { id: userToDelete.id } });
      return "User deleted successfully";
    }

    if (userToDelete.role === "user") {
      if (
        userFromToken.role === "admin" ||
        userFromToken.role === "superadmin"
      ) {
        await prisma.user.delete({ where: { id: userToDelete.id } });
        return "User deleted successfully";
      }
    }
    if (userToDelete.role === "admin") {
      if (userFromToken.role === "superadmin") {
        await prisma.user.delete({ where: { id: userToDelete.id } });
        return "User deleted successfully";
      }
    }
    if (userToDelete.role === "superadmin") {
      throw new Error("You are not allowed to delete a superadmin");
    }

    return "User deleted successfully";
  }

  @Post("/update_user")
  @Security("jwt")
  async updateUser(
    @Body() requestBody: UpdateUserRequest,
    @Request() user: DecodedToken
  ): Promise<string> {
    const { email, username, password, role, passwordConfirm } = requestBody;
    const userFromToken = await prisma.user.findUnique({
      where: { id: user.userId },
    });
    if (!userFromToken) {
      throw new Error("Incorrect credentials");
    }

    // change password
    if (password && passwordConfirm) {
      await this.check_password_requierements(password);
      await this.check_password_passwordConfirm(password, passwordConfirm);
      const hashedPassword = await this.hash_password(password);
      await prisma.user.update({
        where: {
          id: userFromToken.id,
        },
        data: {
          password: hashedPassword,
        },
      });
      return "User password updated successfully";
    }

    if (!email && !username && !password && !role && !passwordConfirm) {
      throw new Error("No data to update");
    }

    // change email or role
    if (email) {
      if (role) {
        await this.check_role_validity(role);
        if (userFromToken.role === "user") {
          if (role !== userFromToken.role) {
            throw new Error("You are not allowed to change your role");
          }
        } else if (["admin", "superadmin"].includes(userFromToken.role)) {
          await prisma.user.update({
            where: {
              email: email,
            },
            data: {
              role: role,
            },
          });
          return "User role updated successfully";
        }
      } else {
        await this.check_email_validity(email);
        await prisma.user.update({
          where: {
            email: userFromToken.email,
          },
          data: {
            email: email,
          },
        });
        return "User email updated successfully";
      }
    }

    // change username
    if (username) {
      await this.check_username_validity(username);
      console.log(userFromToken.email);
      await prisma.user.update({
        where: {
          email: userFromToken.email,
        },
        data: {
          username: username,
        },
      });
      return "User username updated successfully";
    }
    throw new Error("Internal Server Error");
  }

  @Get("/info")
  @Security("jwt")
  async getUserInfo(@Request() user: DecodedToken): Promise<any> {
    const userFromToken = await prisma.user.findUnique({
      where: { id: user.userId },
    });
    if (!userFromToken) {
      throw new Error("Incorrect credentials");
    }
    const answer = {
      email: userFromToken.email,
      username: userFromToken.username,
      role: userFromToken.role,
      createdAt: userFromToken.createdAt,
      updatedAt: userFromToken.updatedAt,
    };
    return answer;
  }

  @Get("/all_users")
  @Security("jwt")
  async getAllUsers(@Request() user: DecodedToken): Promise<any> {
    const userFromToken = await prisma.user.findUnique({
      where: { id: user.userId },
    });
    if (!userFromToken) {
      throw new Error("Incorrect credentials");
    }
    if (userFromToken.role === "user") {
      throw new Error("You are not allowed to get all users");
    }
    const allUsers = await prisma.user.findMany();
    const answer = allUsers.map((user) => {
      return {
        email: user.email,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
    return answer;
  }
}

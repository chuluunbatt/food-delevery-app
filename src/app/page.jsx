"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("");
  const endpoint = "http://localhost:8000/book";

  const getBooks = async () => {
    try {
      const response = await axios.get(endpoint);
      console.log("response", response);
      if (Array.isArray(response.data)) {
        setBooks(response.data);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("error  :", error);
    }
  };

  const addBook = async (e) => {
    if (e) e.preventDefault();
    if (!bookName.trim()) return;

    try {
      await axios.post(endpoint, { bookName: bookName });
      setBookName("");
      await getBooks();
    } catch (error) {
      console.error("error:", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

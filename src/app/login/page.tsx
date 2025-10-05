"use client";

import { Card, Input } from "antd";
import Password from "antd/es/input/Password";
import { useCallback } from "react";
import { Controller, Form, useForm } from "react-hook-form";

export default function LoginPage() {
  const { control, trigger } = useForm();
  const handleLogin = useCallback(() => {
    const isValid = trigger(["username", "password"]);
    console.log(isValid);
  }, []);
  return (
    <Card className="flex flex-col gap-3" title="Login">
      <Form control={control}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input type="text" placeholder="Enter Username" {...field} />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Password placeholder="Enter Password" {...field} />
          )}
        />
      </Form>
    </Card>
  );
}

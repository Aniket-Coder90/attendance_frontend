"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { submitAttendance, type FormState } from "@/lib/actions";
import type { Employee } from "@/lib/types";
import { getUserModulesActivityAsyncThunk } from "@/redux/async-thunk/employees-async-thunk";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, LoaderCircle } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const attendanceSchema = z.object({
  ...Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [
      (i + 1).toString(),
      z.enum(["present", "absent", "leave"], {
        required_error: "Please select a status.",
      }),
    ])
  ),
});

type AttendanceFormValues = z.infer<typeof attendanceSchema>;

type AttendanceFormProps = {
  employees: Employee[];
};

const initialState: FormState = {
  message: "",
};

export function AttendanceForm() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [state, formAction, isPending] = useActionState(
    submitAttendance,
    initialState
  );

  const form = useForm<AttendanceFormValues>({
    resolver: zodResolver(attendanceSchema),
    // defaultValues: employees.reduce((acc, employee) => {
    //   acc[employee.id as keyof AttendanceFormValues] = 1;
    //   return acc;
    // }, {} as any),
  });

  useEffect(() => {
    if (state.message && !state.errors) {
      toast({
        title: "Success!",
        description: state.message,
        variant: "default",
      });
    } else if (state.message && state.errors) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  const [employeeList, setEmployeeList] = useState<Employee[]>([]);

  useEffect(() => {
    dispatch(getUserModulesActivityAsyncThunk()).then((res) => {
      setEmployeeList(res.payload as Employee[]);
    });
  }, []);

  console.log(employeeList);

  return (
    <Form {...form}>
      <form action={formAction}>
        <Card>
          <CardHeader>
            <CardTitle>Employee List</CardTitle>
            <CardDescription>
              {/* Today is {format(new Date(), "eeee, MMMM do")}. */}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px] lg:w-[400px]">
                      Employee
                    </TableHead>
                    <TableHead className="w-[300px] lg:w-[400px]">
                      Designation
                    </TableHead>
                    <TableHead className="w-[300px] lg:w-[400px]">
                      Category
                    </TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeList?.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {employee.email ?? ""}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p>{employee?.designation}</p>
                      </TableCell>
                      <TableCell>
                        <p>{employee?.category}</p>
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={employee.id?.toString()}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4"
                                >
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem
                                        value="present"
                                        id={`${employee.id}-present`}
                                      />
                                    </FormControl>
                                    <Label
                                      htmlFor={`${employee.id}-present`}
                                      className="font-normal"
                                    >
                                      Present
                                    </Label>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem
                                        value="absent"
                                        id={`${employee.id}-absent`}
                                      />
                                    </FormControl>
                                    <Label
                                      htmlFor={`${employee.id}-absent`}
                                      className="font-normal"
                                    >
                                      Absent
                                    </Label>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem
                                        value="leave"
                                        id={`${employee.id}-leave`}
                                      />
                                    </FormControl>
                                    <Label
                                      htmlFor={`${employee.id}-leave`}
                                      className="font-normal"
                                    >
                                      Leave
                                    </Label>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <CheckCircle />
              )}
              Submit Attendance
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

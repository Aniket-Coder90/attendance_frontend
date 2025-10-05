"use client";

import PageHeader from "@/components/PageHeader";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  addEmployeeAsyncThunk,
  getDesignationListAsyncThunk,
  getEmployeeListAsyncThunk,
  updateEmployeeAsyncThunk,
} from "@/redux/async-thunk/employees-async-thunk";
import {
  CreateEmployeeFormType,
  createEmployeeSchema,
} from "@/schema/createEmployee-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Select, Table, TableColumnsType } from "antd";
import { EditIcon, PlusCircle, Trash2 } from "lucide-react";
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/hooks/useAppSelector";
import { TEmployeeType } from "@/types/employee-type";
import RemoveEmployeeModal from "@/components/employee/RemoveEmployeeModal";
import EmployeeList from "@/components/employee/EmployeeList";
import AddEmployeeModal from "@/components/employee/AddEmployeeModal";

const Employee = () => {
  const dispatch = useAppDispatch();
  const [isToggle, setIsToggle] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(0);

  const hookForm = useForm<CreateEmployeeFormType>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      name: "",
      email: "",
      category: "",
      designation: "",
    },
    mode: "all",
  });

  const formRef = useRef<any>(null);

  // ✅ Expose methods to parent
  useImperativeHandle(formRef, () => ({
    reset: () => {
      hookForm.reset({
        name: "",
        email: "",
        category: "",
        designation: "",
      });
    },
    toggleModal: () => {
      setIsToggle(!isToggle);
    },
    submit: () => {
      handleAddEmployee();
    },
    onEdit: (emp_id: number) => {
      handleEdit(emp_id);
    },
  }));

  const handleEdit = (emp_id: number) => {
    formRef.current?.toggleModal();
    setEditEmployeeId(emp_id);
    hookForm.reset({
      name: employeeList.list?.find((emp) => emp.id === emp_id)?.name,
      email: employeeList.list?.find((emp) => emp.id === emp_id)?.email,
      category: employeeList.list?.find((emp) => emp.id === emp_id)?.category,
      designation: employeeList.list?.find((emp) => emp.id === emp_id)
        ?.designation,
    });
  };

  const { loader, employeeList, designationList } = useAppSelector(
    (state) => state.employees
  );

  const getDesignationList = useCallback(async () => {
    await dispatch(getDesignationListAsyncThunk());
  }, []);

  const getEmployeesList = useCallback(async () => {
    await dispatch(getEmployeeListAsyncThunk({}));
  }, []);

  const getInitialCalls = useCallback(async () => {
    await Promise.all([getDesignationList(), getEmployeesList()]);
  }, [getDesignationList, getEmployeesList]);

  useEffect(() => {
    getInitialCalls();
  }, []);

  const fields: (keyof CreateEmployeeFormType)[] = [
    "name",
    "category",
    "designation",
  ];
  const handleAddEmployee = useCallback(async () => {
    const isValid = await hookForm.trigger(fields);

    if (isValid) {
      if (editEmployeeId) {
        dispatch(
          updateEmployeeAsyncThunk({
            payload: {
              name: hookForm.getValues("name"),
              email: hookForm.getValues("email"),
              category: hookForm.getValues("category"),
              designation: hookForm.getValues("designation"),
            },
            emp_id: editEmployeeId,
          })
        )
          .unwrap()
          .finally(() => {
            hookForm.reset();
            setIsToggle(false);
            setEditEmployeeId(0);
          });
      } else {
        dispatch(
          addEmployeeAsyncThunk({
            name: hookForm.getValues("name"),
            email: hookForm.getValues("email"),
            category: hookForm.getValues("category"),
            designation: hookForm.getValues("designation"),
          })
        )
          .unwrap()
          .finally(() => {
            hookForm.reset();
            setIsToggle(false);
          });
      }
    }
  }, [hookForm, editEmployeeId]);

  return (
    <div className="">
      <PageHeader
        className="flex justify-between items-center"
        label="Employees"
        supportText="View monthly attendance summaries for each employee."
      >
        <div className="flex items-center gap-2">
          <Select
            className="w-[200px]"
            defaultValue={"all"}
            placeholder="Designation"
          >
            <Select.Option value="all">All</Select.Option>
            {designationList?.map((des) => (
              <Select.Option value={des}>{des}</Select.Option>
            ))}
          </Select>
          <Button
            variant="solid"
            color="primary"
            onClick={() => setIsToggle(!isToggle)}
          >
            <PlusCircle width={14} />
            Add Employee
          </Button>
        </div>
      </PageHeader>
      <EmployeeList formRef={formRef} />
      <AddEmployeeModal
        open={isToggle}
        hookForm={hookForm}
        ref={formRef}
        emp_id={editEmployeeId}
      />
    </div>
  );
};

export default Employee;

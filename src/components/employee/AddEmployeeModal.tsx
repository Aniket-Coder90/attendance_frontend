import { useAppSelector } from "@/hooks/useAppSelector";
import { CreateEmployeeFormType } from "@/schema/createEmployee-schema";
import { Button, Input, Modal, ModalProps, Select } from "antd";
import React, { useEffect } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import PageHeader from "../PageHeader";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getCategoriesOptionsAsyncThunk } from "@/redux/async-thunk/employees-async-thunk";

const AddEmployeeModal = ({
  hookForm,
  ref,
  emp_id,
  ...props
}: {
  hookForm: UseFormReturn<CreateEmployeeFormType>;
  emp_id?: number;
  ref: {
    current: {
      toggleModal: () => void;
      submit: () => void;
      reset: () => void;
    };
  };
} & ModalProps) => {
  const { control } = hookForm;
  const dispatch = useAppDispatch();

  const { designationList, categoryList } = useAppSelector(
    (state) => state.employees
  );

  useEffect(() => {
    dispatch(getCategoriesOptionsAsyncThunk());
  }, []);

  return (
    <Modal
      {...props}
      onCancel={() => {
        ref?.current?.toggleModal();
        ref?.current?.reset();
      }}
      footer={
        <div className="flex justify-end gap-2">
          <Button
            className="btn btn-primary"
            type="default"
            color="default"
            onClick={() => {
              ref?.current?.toggleModal();
              ref?.current?.reset();
            }}
          >
            Cancel
          </Button>
          <Button
            className="primary"
            type="primary"
            onClick={() => ref?.current?.submit()}
          >
            Save
          </Button>
        </div>
      }
    >
      <PageHeader label="Add Employee" />
      <div className="flex flex-col gap-2">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => {
            return (
              <Input
                {...field}
                required
                placeholder="Enter name"
                status={fieldState?.error?.message && "error"}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input {...field} placeholder="Enter email" type="email" />
          )}
        />
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Select {...field} placeholder="Select one">
              {categoryList.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          )}
        />
        <Controller
          control={control}
          name="designation"
          render={({ field }) => (
            <Select {...field} placeholder="Select one">
              {designationList.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          )}
        />
      </div>
    </Modal>
  );
};

export default AddEmployeeModal;

import { useAppSelector } from "@/hooks/useAppSelector";
import { TEmployeeType } from "@/types/employee-type";
import { Button, message, Table, TableColumnsType } from "antd";
import { EditIcon, Trash2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import RemoveEmployeeModal from "./RemoveEmployeeModal";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { removeEmployeeAsyncThunk } from "@/redux/async-thunk/employees-async-thunk";
import { record } from "zod";
import { employeeListUpdateActionHandler } from "@/redux/slice/employeeSlice";
import { list } from "postcss";

const EmployeeList = ({
  formRef,
}: {
  formRef: {
    current: {
      toggleModal: () => void;
      submit: () => void;
      reset: () => void;
      onEdit: (emp_id: number) => void;
    };
  };
}) => {
  const { loader, employeeList } = useAppSelector((state) => state.employees);
  const [removeToggle, setRemoveToggle] = useState({
    open: false,
    emp_id: 0,
  });

  const dispatch = useAppDispatch();

  const columns: TableColumnsType<TEmployeeType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email?.localeCompare(b.email),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      sorter: (a, b) => a.designation.localeCompare(b.designation),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-3">
          <button
            title="Edit"
            onClick={() => {
              formRef.current?.onEdit(record.id ?? 0);
              formRef.current?.toggleModal();
            }}
          >
            <EditIcon />
          </button>
          <button
            title="Delete"
            onClick={() => {
              setRemoveToggle({
                open: true,
                emp_id: record.id ?? 0,
              });
            }}
          >
            <Trash2 color="red" />
          </button>
        </div>
      ),
    },
  ];

  const handleRemoveEmployee = useCallback(
    (emp_id: number) => {
      setRemoveToggle({
        open: false,
        emp_id: 0,
      });
      dispatch(removeEmployeeAsyncThunk(emp_id))
        .unwrap()
        .then((res) => {
          if (res?.status === 200) {
            message.success("Employee removed successfully!");
            dispatch(
              employeeListUpdateActionHandler({
                list: employeeList.list?.filter((emp) => emp.id !== emp_id),
                total: employeeList.total - 1,
              })
            );
          }
        });
    },
    [employeeList]
  );

  return (
    <div className="p-4">
      <Table
        key={"id"}
        rowKey={"id"}
        columns={columns}
        loading={loader?.getEmployeeListLoader}
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true,
          showSizeChanger: false,
          onChange(page, pageSize) {
            console.log(page, pageSize);
          },
        }}
        dataSource={employeeList.list}
        bordered
      />
      <RemoveEmployeeModal
        closable={false}
        open={removeToggle.open}
        footer={
          <div className="flex gap-3">
            <Button
              className="w-1/2 h-10"
              variant="outlined"
              color="default"
              onClick={() => setRemoveToggle({ open: false, emp_id: 0 })}
            >
              Cancel
            </Button>
            <Button
              className="w-1/2 h-10"
              variant="solid"
              color="red"
              onClick={() => handleRemoveEmployee(removeToggle?.emp_id)}
            >
              Remove
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default EmployeeList;

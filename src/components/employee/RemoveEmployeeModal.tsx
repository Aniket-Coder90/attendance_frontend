import { Button, Modal, ModalProps } from "antd";
import { Trash2 } from "lucide-react";
import React from "react";

const RemoveEmployeeModal = ({ ...props }: ModalProps) => {
  return (
    <Modal {...props}>
      <div className="flex flex-col items-center gap-2">
        <div className="w-20 h-20 mx-auto flex items-center justify-center !border-solid border-2 rounded-full border-red-500">
          <Trash2 color="red" width={40} height={40} />
        </div>
        <h1 className="text-2xl mb-0 text-center leading-normal font-semiBold">
          Remove Employee
        </h1>
        <p>Are you sure you want to remove this employee?</p>
      </div>
    </Modal>
  );
};

export default RemoveEmployeeModal;

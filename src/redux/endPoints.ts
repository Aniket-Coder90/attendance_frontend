export const API_END_POINTS = {
    EMPLOYEES_LIST: "employees-list",
    EMPLOYEE_ATTENDANCE_FILL: "update-attendance-list",
    DOWNLOAD_CSV: "download-sheet",
    GET_DESIGNATION_OPTIONS: "get-designations-options",
    CREATE_EMPLOYEE: "create-employee",
    UPDATE_EMPLOYEE: (emp_id: number) => `update-employee/${emp_id}`,
    REMOVE_EMPLOYEE: (emp_id: number) => `remove-employee/${emp_id}`,
}
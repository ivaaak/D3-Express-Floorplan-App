// employeeService.js
import axios from 'axios';

const url = 'http://localhost:3000';

export default {
  data() {
    return {
      employees: [],
      employee: {},
    };
 },
 methods: {
    async refreshEmployees() {
      const response = await axios.get(`${url}/employees`);
      this.employees = response.data;
    },
    async getEmployees() {
      await this.refreshEmployees();
      return this.employees;
    },
    async getEmployee(id) {
      const response = await axios.get(`${url}/employees/${id}`);
      this.employee = response.data;
      return this.employee;
    },
    createEmployee(employee) {
      return axios.post(`${url}/employees`, employee);
    },
    updateEmployee(id, employee) {
      return axios.put(`${url}/employees/${id}`, employee);
    },
    deleteEmployee(id) {
      return axios.delete(`${url}/employees/${id}`);
    },
 },
};

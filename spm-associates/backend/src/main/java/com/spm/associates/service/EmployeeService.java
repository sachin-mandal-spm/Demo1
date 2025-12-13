package com.spm.associates.service;

import com.spm.associates.entity.Employee;
import com.spm.associates.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setPhone(employeeDetails.getPhone());
        employee.setEmail(employeeDetails.getEmail());
        employee.setAddress(employeeDetails.getAddress());
        employee.setDesignation(employeeDetails.getDesignation());
        employee.setSalaryType(employeeDetails.getSalaryType());
        employee.setBasicSalary(employeeDetails.getBasicSalary());
        employee.setDailyWage(employeeDetails.getDailyWage());
        employee.setJoiningDate(employeeDetails.getJoiningDate());
        employee.setAadhaarNumber(employeeDetails.getAadhaarNumber());
        employee.setPanNumber(employeeDetails.getPanNumber());
        employee.setBankAccountNumber(employeeDetails.getBankAccountNumber());
        employee.setIfscCode(employeeDetails.getIfscCode());
        employee.setStatus(employeeDetails.getStatus());

        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        employeeRepository.delete(employee);
    }
}

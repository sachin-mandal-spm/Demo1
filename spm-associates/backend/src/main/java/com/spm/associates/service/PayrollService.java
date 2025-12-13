package com.spm.associates.service;

import com.spm.associates.entity.Attendance;
import com.spm.associates.entity.Employee;
import com.spm.associates.entity.Salary;
import com.spm.associates.repository.AttendanceRepository;
import com.spm.associates.repository.EmployeeRepository;
import com.spm.associates.repository.SalaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class PayrollService {
    @Autowired
    private SalaryRepository salaryRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public Salary generateSalary(Long employeeId, int month, int year) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        List<Attendance> attendances = attendanceRepository.findByEmployeeIdAndDateBetween(employeeId, startDate, endDate);

        BigDecimal totalDaysWorked = BigDecimal.ZERO;
        BigDecimal overtimeHours = BigDecimal.ZERO;

        for (Attendance att : attendances) {
            if (att.getStatus() == Attendance.Status.PRESENT) {
                totalDaysWorked = totalDaysWorked.add(BigDecimal.ONE);
            } else if (att.getStatus() == Attendance.Status.HALF_DAY) {
                totalDaysWorked = totalDaysWorked.add(new BigDecimal("0.5"));
            }
            if (att.getOvertimeHours() != null) {
                overtimeHours = overtimeHours.add(att.getOvertimeHours());
            }
        }

        BigDecimal basicSalary = BigDecimal.ZERO;
        if (employee.getSalaryType() == Employee.SalaryType.MONTHLY) {
            basicSalary = employee.getBasicSalary();
            // Pro-rate if needed, but for simplicity assuming full basic if monthly
            // Or calculate based on days present vs working days
        } else {
            basicSalary = employee.getDailyWage().multiply(totalDaysWorked);
        }

        BigDecimal overtimeAmount = overtimeHours.multiply(new BigDecimal("100")); // Example rate
        BigDecimal grossSalary = basicSalary.add(overtimeAmount);
        BigDecimal deductions = BigDecimal.ZERO; // Implement logic
        BigDecimal netSalary = grossSalary.subtract(deductions);

        Salary salary = new Salary();
        salary.setEmployee(employee);
        salary.setMonth(month);
        salary.setYear(year);
        salary.setTotalDaysWorked(totalDaysWorked);
        salary.setBasicAmount(basicSalary);
        salary.setOvertimeAmount(overtimeAmount);
        salary.setDeductions(deductions);
        salary.setNetSalary(netSalary);
        salary.setPaymentStatus("PENDING");

        return salaryRepository.save(salary);
    }

    public List<Salary> getSalariesByMonth(int month, int year) {
        return salaryRepository.findByMonthAndYear(month, year);
    }
}

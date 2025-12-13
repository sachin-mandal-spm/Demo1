package com.spm.associates.controller;

import com.spm.associates.entity.Salary;
import com.spm.associates.service.PayrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/payroll")
public class PayrollController {
    @Autowired
    private PayrollService payrollService;

    @PostMapping("/generate")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<Salary> generateSalary(@RequestParam Long employeeId, @RequestParam int month, @RequestParam int year) {
        return ResponseEntity.ok(payrollService.generateSalary(employeeId, month, year));
    }

    @GetMapping
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN') or hasRole('ACCOUNTANT')")
    public List<Salary> getSalaries(@RequestParam int month, @RequestParam int year) {
        return payrollService.getSalariesByMonth(month, year);
    }
}

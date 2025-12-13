package com.spm.associates.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "employees")
@Data
@NoArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    private String lastName;
    private String phone;
    private String email;
    private String address;
    private String designation; // Mason, Helper, Supervisor
    
    @Enumerated(EnumType.STRING)
    private SalaryType salaryType; // DAILY, MONTHLY

    private BigDecimal basicSalary;
    private BigDecimal dailyWage;
    private LocalDate joiningDate;
    private String aadhaarNumber;
    private String panNumber;
    private String bankAccountNumber;
    private String ifscCode;
    
    private String status = "ACTIVE";

    public enum SalaryType {
        DAILY, MONTHLY
    }
}

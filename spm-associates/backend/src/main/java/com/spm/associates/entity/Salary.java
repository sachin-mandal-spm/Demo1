package com.spm.associates.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "salaries")
@Data
@NoArgsConstructor
public class Salary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    private int month;
    private int year;

    private BigDecimal totalDaysWorked;
    private BigDecimal basicAmount;
    private BigDecimal daAmount;
    private BigDecimal hraAmount;
    private BigDecimal overtimeAmount;
    private BigDecimal bonusAmount;
    private BigDecimal deductions; // PF, Tax, Loan
    private BigDecimal netSalary;

    private String paymentStatus = "PENDING"; // PENDING, PAID
}

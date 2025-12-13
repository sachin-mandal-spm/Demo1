package com.spm.associates.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "attendance")
@Data
@NoArgsConstructor
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "site_id")
    private Site site;

    @Column(nullable = false)
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private Status status; // PRESENT, ABSENT, HALF_DAY

    private LocalTime checkInTime;
    private LocalTime checkOutTime;
    private BigDecimal overtimeHours = BigDecimal.ZERO;

    public enum Status {
        PRESENT, ABSENT, HALF_DAY
    }
}

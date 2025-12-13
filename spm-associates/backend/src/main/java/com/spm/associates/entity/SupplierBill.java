package com.spm.associates.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "supplier_bills")
@Data
@NoArgsConstructor
public class SupplierBill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    @ManyToOne
    @JoinColumn(name = "site_id")
    private Site site;

    private String billNumber;
    private LocalDate billDate;
    private BigDecimal totalAmount;
    private BigDecimal paidAmount = BigDecimal.ZERO;

    private String status = "PENDING"; // PAID, PARTIAL, PENDING
}

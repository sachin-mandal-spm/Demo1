package com.spm.associates.repository;

import com.spm.associates.entity.SupplierBill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplierBillRepository extends JpaRepository<SupplierBill, Long> {
    List<SupplierBill> findBySupplierId(Long supplierId);
}

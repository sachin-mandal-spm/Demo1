package com.spm.associates.service;

import com.spm.associates.entity.Supplier;
import com.spm.associates.entity.SupplierBill;
import com.spm.associates.repository.SupplierBillRepository;
import com.spm.associates.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private SupplierBillRepository supplierBillRepository;

    public Supplier createSupplier(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    public SupplierBill createBill(SupplierBill bill) {
        return supplierBillRepository.save(bill);
    }

    public List<SupplierBill> getBillsBySupplier(Long supplierId) {
        return supplierBillRepository.findBySupplierId(supplierId);
    }
}

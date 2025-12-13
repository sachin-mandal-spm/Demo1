package com.spm.associates.controller;

import com.spm.associates.entity.Supplier;
import com.spm.associates.entity.SupplierBill;
import com.spm.associates.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {
    @Autowired
    private SupplierService supplierService;

    @PostMapping
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN') or hasRole('ACCOUNTANT')")
    public Supplier createSupplier(@RequestBody Supplier supplier) {
        return supplierService.createSupplier(supplier);
    }

    @GetMapping
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN') or hasRole('ACCOUNTANT')")
    public List<Supplier> getAllSuppliers() {
        return supplierService.getAllSuppliers();
    }

    @PostMapping("/bills")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN') or hasRole('ACCOUNTANT')")
    public SupplierBill createBill(@RequestBody SupplierBill bill) {
        return supplierService.createBill(bill);
    }

    @GetMapping("/{id}/bills")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN') or hasRole('ACCOUNTANT')")
    public List<SupplierBill> getBillsBySupplier(@PathVariable Long id) {
        return supplierService.getBillsBySupplier(id);
    }
}

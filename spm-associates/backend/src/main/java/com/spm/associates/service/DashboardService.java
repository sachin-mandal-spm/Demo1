package com.spm.associates.service;

import com.spm.associates.dto.DashboardDtos.*;
import com.spm.associates.entity.Invoice;
import com.spm.associates.entity.Salary;
import com.spm.associates.entity.Site;
import com.spm.associates.entity.SupplierBill;
import com.spm.associates.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private SalaryRepository salaryRepository;

    @Autowired
    private SupplierBillRepository supplierBillRepository;

    public DashboardStats getStats() {
        DashboardStats stats = new DashboardStats();

        stats.setTotalEmployees(employeeRepository.count());
        stats.setTotalSites(siteRepository.count());

        // Calculate Revenue (Invoices)
        List<Invoice> invoices = invoiceRepository.findAll();
        BigDecimal totalRevenue = invoices.stream()
                .map(Invoice::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        stats.setTotalRevenue(totalRevenue);

        // Calculate Expenses (Salaries + Supplier Bills)
        List<Salary> salaries = salaryRepository.findAll();
        BigDecimal totalSalaries = salaries.stream()
                .map(Salary::getNetSalary)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<SupplierBill> bills = supplierBillRepository.findAll();
        BigDecimal totalBills = bills.stream()
                .map(SupplierBill::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpenses = totalSalaries.add(totalBills);
        stats.setTotalExpenses(totalExpenses);

        stats.setNetProfit(totalRevenue.subtract(totalExpenses));

        // Site Progress
        List<Site> sites = siteRepository.findAll();
        List<SiteProgress> siteProgressList = new ArrayList<>();
        for (Site site : sites) {
            SiteProgress sp = new SiteProgress();
            sp.setSiteName(site.getName());
            sp.setStatus(site.getStatus());
            sp.setBudget(site.getBudget());
            // Calculate site specific expenses if needed
            sp.setExpenses(BigDecimal.ZERO); // Placeholder
            siteProgressList.add(sp);
        }
        stats.setSiteProgress(siteProgressList);

        return stats;
    }
}

package com.spm.associates.controller;

import com.spm.associates.dto.DashboardDtos.DashboardStats;
import com.spm.associates.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/reports")
public class ReportController {
    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN') or hasRole('ACCOUNTANT')")
    public DashboardStats getDashboardStats() {
        return dashboardService.getStats();
    }
}

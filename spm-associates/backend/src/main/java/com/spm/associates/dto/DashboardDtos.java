package com.spm.associates.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

public class DashboardDtos {
    @Data
    public static class DashboardStats {
        private long totalEmployees;
        private long totalSites;
        private BigDecimal totalRevenue;
        private BigDecimal totalExpenses;
        private BigDecimal netProfit;
        private List<SiteProgress> siteProgress;
    }

    @Data
    public static class SiteProgress {
        private String siteName;
        private String status;
        private BigDecimal budget;
        private BigDecimal expenses;
    }
}

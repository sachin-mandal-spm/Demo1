package com.spm.associates.service;

import com.spm.associates.entity.Site;
import com.spm.associates.repository.SiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SiteService {
    @Autowired
    private SiteRepository siteRepository;

    public List<Site> getAllSites() {
        return siteRepository.findAll();
    }

    public Optional<Site> getSiteById(Long id) {
        return siteRepository.findById(id);
    }

    public Site createSite(Site site) {
        return siteRepository.save(site);
    }

    public Site updateSite(Long id, Site siteDetails) {
        Site site = siteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Site not found with id: " + id));

        site.setName(siteDetails.getName());
        site.setLocation(siteDetails.getLocation());
        site.setClientName(siteDetails.getClientName());
        site.setBudget(siteDetails.getBudget());
        site.setStartDate(siteDetails.getStartDate());
        site.setStatus(siteDetails.getStatus());

        return siteRepository.save(site);
    }

    public void deleteSite(Long id) {
        Site site = siteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Site not found with id: " + id));
        siteRepository.delete(site);
    }
}

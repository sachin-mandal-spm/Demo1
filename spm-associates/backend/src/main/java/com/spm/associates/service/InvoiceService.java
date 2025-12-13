package com.spm.associates.service;

import com.spm.associates.entity.Invoice;
import com.spm.associates.entity.InvoiceItem;
import com.spm.associates.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;

    public Invoice createInvoice(Invoice invoice) {
        BigDecimal subtotal = BigDecimal.ZERO;
        for (InvoiceItem item : invoice.getItems()) {
            item.setInvoice(invoice);
            item.setAmount(item.getQuantity().multiply(item.getUnitPrice()));
            subtotal = subtotal.add(item.getAmount());
        }
        invoice.setSubtotal(subtotal);
        // Assuming 18% tax for example
        invoice.setTaxAmount(subtotal.multiply(new BigDecimal("0.18")));
        invoice.setTotalAmount(subtotal.add(invoice.getTaxAmount()));
        
        return invoiceRepository.save(invoice);
    }

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }
    
    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id).orElseThrow(() -> new RuntimeException("Invoice not found"));
    }
}

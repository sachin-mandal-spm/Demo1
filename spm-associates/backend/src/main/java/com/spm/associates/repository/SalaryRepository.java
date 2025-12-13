package com.spm.associates.repository;

import com.spm.associates.entity.Salary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SalaryRepository extends JpaRepository<Salary, Long> {
    Optional<Salary> findByEmployeeIdAndMonthAndYear(Long employeeId, int month, int year);
    List<Salary> findByMonthAndYear(int month, int year);
}

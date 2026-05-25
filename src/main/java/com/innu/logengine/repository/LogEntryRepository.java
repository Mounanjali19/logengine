package com.innu.logengine.repository;

import com.innu.logengine.entity.LogEntry;
import com.innu.logengine.enums.LogLevel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LogEntryRepository extends JpaRepository<LogEntry, Long> {

    List<LogEntry> findByLevel(LogLevel level);

    List<LogEntry> findByServiceName(String serviceName);
}
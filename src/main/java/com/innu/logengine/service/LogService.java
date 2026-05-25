package com.innu.logengine.service;

import com.innu.logengine.dto.LogRequest;
import com.innu.logengine.entity.LogEntry;
import com.innu.logengine.enums.LogLevel;
import com.innu.logengine.repository.LogEntryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LogService {

    private final LogEntryRepository repository;
    private final LogWebSocketService webSocketService;

    public LogService(LogEntryRepository repository,
                      LogWebSocketService webSocketService) {

        this.repository = repository;
        this.webSocketService = webSocketService;
    }

    // CREATE LOG
    public LogEntry ingestLog(LogRequest request) {

        LogEntry log = new LogEntry();

        log.setMessage(request.getMessage());
        log.setServiceName(request.getServiceName());
        log.setLevel(request.getLevel());
        log.setTimestamp(LocalDateTime.now());

        LogEntry saved = repository.save(log);

        webSocketService.sendLog(saved);

        return saved;
    }

    // PAGINATION
    public Page<LogEntry> getAllLogs(Pageable pageable) {
        return repository.findAll(pageable);
    }

    // FILTER BY LEVEL
    public List<LogEntry> getLogsByLevel(LogLevel level) {
        return repository.findByLevel(level);
    }

    // FILTER BY SERVICE
    public List<LogEntry> getLogsByService(String serviceName) {
        return repository.findByServiceName(serviceName);
    }

    // GET ALL LOGS
    public List<LogEntry> getAllLogs() {
        return repository.findAll();
    }

    // ANOMALIES
    public List<LogEntry> getAnomalies() {

        return repository.findAll()
                .stream()
                .filter(log ->
                        log.getLevel() == LogLevel.ERROR ||
                                log.getLevel() == LogLevel.FATAL
                )
                .toList();
    }
}
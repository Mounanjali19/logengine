package com.innu.logengine.controller;

import com.innu.logengine.dto.LogRequest;
import com.innu.logengine.entity.LogEntry;
import com.innu.logengine.enums.LogLevel;
import com.innu.logengine.service.LogService;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/logs")
public class LogController {

    private final LogService logService;

    public LogController(LogService logService) {
        this.logService = logService;
    }

    // CREATE LOG
    @PostMapping
    public ResponseEntity<LogEntry> ingestLog(
            @Valid @RequestBody LogRequest request) {

        return ResponseEntity.ok(
                logService.ingestLog(request)
        );
    }

    // GET ALL LOGS WITH PAGINATION
    @GetMapping
    public ResponseEntity<Page<LogEntry>> getLogs(Pageable pageable) {

        return ResponseEntity.ok(
                logService.getAllLogs(pageable)
        );
    }

    // GET ANOMALIES
    @GetMapping("/anomalies")
    public ResponseEntity<List<LogEntry>> getAnomalies() {

        return ResponseEntity.ok(
                logService.getAnomalies()
        );
    }

    // FILTER BY LEVEL
    @GetMapping("/level/{level}")
    public ResponseEntity<List<LogEntry>> getByLevel(
            @PathVariable LogLevel level) {

        return ResponseEntity.ok(
                logService.getLogsByLevel(level)
        );
    }

    // FILTER BY SERVICE
    @GetMapping("/service/{serviceName}")
    public ResponseEntity<List<LogEntry>> getByService(
            @PathVariable String serviceName) {

        return ResponseEntity.ok(
                logService.getLogsByService(serviceName)
        );
    }
}
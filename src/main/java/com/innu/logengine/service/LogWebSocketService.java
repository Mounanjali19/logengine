package com.innu.logengine.service;

import com.innu.logengine.entity.LogEntry;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class LogWebSocketService {

    private final SimpMessagingTemplate messagingTemplate;

    public LogWebSocketService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendLog(LogEntry log) {
        messagingTemplate.convertAndSend("/topic/logs", log);
    }
}
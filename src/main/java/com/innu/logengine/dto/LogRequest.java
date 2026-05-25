package com.innu.logengine.dto;

import com.innu.logengine.enums.LogLevel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LogRequest {

    @NotBlank(message = "Message is required")
    private String message;

    @NotBlank(message = "Service name is required")
    private String serviceName;

    @NotNull(message = "Level is required")
    private LogLevel level;
}
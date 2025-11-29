"use client";

import { useCallback, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";
import type { FormFileUploadFieldProps } from "./types";

/**
 * FormInput.FileUpload component - File upload field with React Hook Form integration
 * Supports drag and drop, file preview, and validation
 *
 * @example
 * ```tsx
 * <FormInput.FileUpload
 *   name="avatar"
 *   label="Profile Picture"
 *   accept="image/*"
 *   maxSize={5 * 1024 * 1024} // 5MB
 *   showPreview
 * />
 * ```
 */
export function FileUploadFieldComponent<TFieldValues extends FieldValues = FieldValues>({
  accept,
  buttonText = "Choose File",
  disabled = false,
  dropzoneText = "Drag and drop a file here, or click to select",
  errorMessage,
  helperText,
  label,
  maxSize,
  multiple = false,
  name,
  required = false,
  showPreview = true,
}: FormFileUploadFieldProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Math.round(bytes / Math.pow(k, i) * 100) / 100} ${sizes[i]}`;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const files = multiple ? (value || []) : (value ? [value] : []);

        const handleFileChange = (newFiles: FileList | null) => {
          if (!newFiles || newFiles.length === 0) return;

          const fileArray = Array.from(newFiles);
          
          if (multiple) {
            onChange([...files, ...fileArray]);
          } else {
            onChange(fileArray[0]);
          }
        };

        const handleDrop = (e: React.DragEvent) => {
          e.preventDefault();
          setIsDragging(false);
          handleFileChange(e.dataTransfer.files);
        };

        const handleRemoveFile = (index: number) => {
          if (multiple) {
            const newFiles = files.filter((_: File, i: number) => i !== index);
            onChange(newFiles.length > 0 ? newFiles : null);
          } else {
            onChange(null);
          }
        };

        return (
          <FormControl
            disabled={disabled}
            error={!!error}
            fullWidth
            required={required}
          >
            {label && (
              <Typography
                sx={{ mb: 1 }}
                variant="body2"
              >
                {label}
                {required && " *"}
              </Typography>
            )}

            <Box
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              sx={{
                alignItems: "center",
                bgcolor: isDragging ? "action.hover" : "background.paper",
                border: 2,
                borderColor: error ? "error.main" : "divider",
                borderRadius: 2,
                borderStyle: "dashed",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                justifyContent: "center",
                minHeight: 120,
                p: 3,
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "action.hover",
                  borderColor: "primary.main",
                },
              }}
            >
              <CloudUpload
                sx={{ color: "text.secondary", fontSize: 48 }}
              />

              <Typography
                align="center"
                color="text.secondary"
                variant="body2"
              >
                {dropzoneText}
              </Typography>

              <Button
                component="label"
                disabled={disabled}
                startIcon={<CloudUpload />}
                variant="outlined"
              >
                {buttonText}
                <input
                  accept={accept}
                  hidden
                  multiple={multiple}
                  onChange={(e) => handleFileChange(e.target.files)}
                  type="file"
                />
              </Button>

              {maxSize && (
                <Typography
                  color="text.secondary"
                  variant="caption"
                >
                  Max file size: {formatFileSize(maxSize)}
                </Typography>
              )}
            </Box>

            {showPreview && files.length > 0 && (
              <Stack
                spacing={1}
                sx={{ mt: 2 }}
              >
                {files.map((file: File, index: number) => (
                  <Box
                    key={`${file.name}-${index}`}
                    sx={{
                      alignItems: "center",
                      bgcolor: "background.paper",
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 1,
                      display: "flex",
                      justifyContent: "space-between",
                      p: 1.5,
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        noWrap
                        variant="body2"
                      >
                        {file.name}
                      </Typography>

                      <Typography
                        color="text.secondary"
                        variant="caption"
                      >
                        {formatFileSize(file.size)}
                      </Typography>
                    </Box>

                    <IconButton
                      color="error"
                      disabled={disabled}
                      onClick={() => handleRemoveFile(index)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
              </Stack>
            )}

            {(error?.message || errorMessage || helperText) && (
              <FormHelperText>
                {errorMessage || error?.message || helperText}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}

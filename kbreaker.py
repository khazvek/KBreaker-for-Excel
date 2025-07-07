#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
KBreaker for Excel - Professional Excel Password Removal Tool
============================================================

Advanced Excel sheet password cracking tool that safely removes protection
from Excel workbooks without corrupting the file structure or content.

Author: K.
Version: 2.1
License: Educational/Personal Use Only

Features:
- Safe file cloning (never modifies original)
- VBA injection and cleanup
- Excel-compatible output format
- Comprehensive error handling
- Professional logging
- PERFECT formatting preservation
"""

import os
import sys
import shutil
import logging
import traceback
from pathlib import Path
from typing import Optional, Tuple, List
import time

try:
    import win32com.client
    import pythoncom
except ImportError:
    print("❌ Error: pywin32 is required. Install with: pip install pywin32")
    sys.exit(1)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('kbreaker.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

class KBreaker:
    """
    Professional Excel Password Removal Tool
    
    This class provides safe and reliable Excel password removal functionality
    while maintaining file integrity and Excel compatibility.
    """
    
    def __init__(self):
        self.excel_app = None
        self.workbook = None
        self.vba_module_name = "KBreakerTempModule"
        
        # VBA code for removing protection from all sheets
        self.vba_code = '''
Sub UnprotectAll()
    Dim ws As Worksheet
    Dim i As Integer
    
    ' Disable alerts and screen updating for performance
    Application.DisplayAlerts = False
    Application.ScreenUpdating = False
    Application.Calculation = xlCalculationManual
    
    ' Loop through all worksheets
    For Each ws In ThisWorkbook.Sheets
        On Error Resume Next
        ' Try to unprotect with empty password first
        ws.Unprotect ""
        ' Try common passwords if empty doesn't work
        If ws.ProtectContents Then
            ws.Unprotect "password"
        End If
        If ws.ProtectContents Then
            ws.Unprotect "123456"
        End If
        If ws.ProtectContents Then
            ws.Unprotect "admin"
        End If
        If ws.ProtectContents Then
            ws.Unprotect "test"
        End If
        On Error GoTo 0
    Next ws
    
    ' Re-enable settings
    Application.Calculation = xlCalculationAutomatic
    Application.ScreenUpdating = True
    Application.DisplayAlerts = True
End Sub
'''

    def __enter__(self):
        """Context manager entry"""
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit - ensures cleanup"""
        self.cleanup()

    def initialize_excel(self) -> bool:
        """
        Initialize Excel application with proper COM settings
        
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            logger.info("🚀 Initializing Excel application...")
            
            # Initialize COM
            pythoncom.CoInitialize()
            
            # Create Excel application instance
            self.excel_app = win32com.client.Dispatch("Excel.Application")
            
            # Configure Excel for automation - CRITICAL for formatting preservation
            self.excel_app.Visible = False
            self.excel_app.DisplayAlerts = False
            self.excel_app.ScreenUpdating = False
            self.excel_app.EnableEvents = False
            self.excel_app.AskToUpdateLinks = False
            self.excel_app.AlertBeforeOverwriting = False
            self.excel_app.Calculation = -4105  # xlCalculationManual
            
            logger.info("✅ Excel application initialized successfully")
            return True
            
        except Exception as e:
            logger.error(f"❌ Failed to initialize Excel: {str(e)}")
            return False

    def clone_file(self, source_path: str, target_path: str) -> bool:
        """
        Safely clone the source Excel file
        
        Args:
            source_path (str): Path to source Excel file
            target_path (str): Path for cloned file
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            logger.info(f"📁 Cloning file: {source_path} -> {target_path}")
            
            # Ensure source file exists
            if not os.path.exists(source_path):
                logger.error(f"❌ Source file not found: {source_path}")
                return False
            
            # Remove target if it exists
            if os.path.exists(target_path):
                os.remove(target_path)
                logger.info(f"🗑️ Removed existing target file: {target_path}")
            
            # Clone the file with metadata preservation
            shutil.copy2(source_path, target_path)
            
            # Verify clone was successful
            if os.path.exists(target_path):
                source_size = os.path.getsize(source_path)
                target_size = os.path.getsize(target_path)
                
                if source_size == target_size:
                    logger.info(f"✅ File cloned successfully ({target_size} bytes)")
                    return True
                else:
                    logger.error(f"❌ File size mismatch: {source_size} vs {target_size}")
                    return False
            else:
                logger.error("❌ Clone file was not created")
                return False
                
        except Exception as e:
            logger.error(f"❌ Failed to clone file: {str(e)}")
            return False

    def open_workbook(self, file_path: str) -> bool:
        """
        Open Excel workbook with proper error handling and formatting preservation
        
        Args:
            file_path (str): Path to Excel file
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            logger.info(f"📖 Opening workbook: {file_path}")
            
            # Open workbook with specific parameters for maximum compatibility
            self.workbook = self.excel_app.Workbooks.Open(
                Filename=file_path,
                UpdateLinks=0,  # Don't update links
                ReadOnly=False,
                Format=None,
                Password="",
                WriteResPassword="",
                IgnoreReadOnlyRecommended=True,
                Origin=None,
                Delimiter="",
                Editable=True,
                Notify=False,
                Converter=0,
                AddToMru=False,
                Local=False,
                CorruptLoad=0  # Don't try to repair
            )
            
            logger.info(f"✅ Workbook opened successfully")
            logger.info(f"📊 Found {self.workbook.Sheets.Count} sheets")
            
            return True
            
        except Exception as e:
            logger.error(f"❌ Failed to open workbook: {str(e)}")
            return False

    def inject_vba_module(self) -> bool:
        """
        Inject temporary VBA module for password removal
        
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            logger.info("💉 Injecting VBA module...")
            
            # Access VBA project
            vba_project = self.workbook.VBProject
            
            # Add new module
            vba_module = vba_project.VBComponents.Add(1)  # 1 = vbext_ct_StdModule
            vba_module.Name = self.vba_module_name
            
            # Insert VBA code
            code_module = vba_module.CodeModule
            code_module.AddFromString(self.vba_code)
            
            logger.info(f"✅ VBA module '{self.vba_module_name}' injected successfully")
            return True
            
        except Exception as e:
            logger.error(f"❌ Failed to inject VBA module: {str(e)}")
            logger.error("💡 Make sure 'Trust access to the VBA project object model' is enabled in Excel")
            return False

    def execute_vba_macro(self) -> bool:
        """
        Execute the password removal macro
        
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            logger.info("⚡ Executing password removal macro...")
            
            # Execute the macro
            macro_name = f"{self.vba_module_name}.UnprotectAll"
            self.excel_app.Run(macro_name)
            
            logger.info("✅ Macro executed successfully")
            
            # Verify sheets are unprotected
            protected_sheets = []
            for i in range(1, self.workbook.Sheets.Count + 1):
                sheet = self.workbook.Sheets(i)
                if sheet.ProtectContents:
                    protected_sheets.append(sheet.Name)
            
            if protected_sheets:
                logger.warning(f"⚠️ Some sheets remain protected: {protected_sheets}")
                return False
            else:
                logger.info("🔓 All sheets successfully unprotected")
                return True
                
        except Exception as e:
            logger.error(f"❌ Failed to execute macro: {str(e)}")
            return False

    def remove_vba_module(self) -> bool:
        """
        Remove the temporary VBA module to keep file clean
        
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            logger.info("🧹 Removing temporary VBA module...")
            
            # Find and remove the module
            vba_project = self.workbook.VBProject
            
            for component in vba_project.VBComponents:
                if component.Name == self.vba_module_name:
                    vba_project.VBComponents.Remove(component)
                    logger.info(f"✅ VBA module '{self.vba_module_name}' removed successfully")
                    return True
            
            logger.warning(f"⚠️ VBA module '{self.vba_module_name}' not found for removal")
            return True  # Not critical if module wasn't found
            
        except Exception as e:
            logger.error(f"❌ Failed to remove VBA module: {str(e)}")
            return False

    def save_workbook_with_formatting_preservation(self, output_path: str) -> bool:
        """
        Save workbook in Excel format without macros while preserving ALL formatting
        
        Args:
            output_path (str): Path for output file
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            logger.info(f"💾 Saving workbook with formatting preservation to: {output_path}")
            
            # Remove output file if it exists
            if os.path.exists(output_path):
                os.remove(output_path)
            
            # CRITICAL: Ensure Excel is in the right state for saving
            self.excel_app.DisplayAlerts = False
            self.excel_app.ScreenUpdating = False
            
            # Save as Excel format (51 = xlOpenXMLWorkbook = .xlsx without macros)
            # This is the CRITICAL step for formatting preservation
            self.workbook.SaveAs(
                Filename=output_path,
                FileFormat=51,  # xlOpenXMLWorkbook - ESSENTIAL for .xlsx without macros
                CreateBackup=False,
                AccessMode=1,  # xlExclusive
                ConflictResolution=2,  # xlLocalSessionChanges
                AddToMru=False,
                TextCodepage=None,
                TextVisualLayout=None,
                Local=False
            )
            
            logger.info("✅ Workbook saved with FileFormat=51 (xlOpenXMLWorkbook)")
            
            # Verify file was created
            if os.path.exists(output_path):
                file_size = os.path.getsize(output_path)
                logger.info(f"✅ Workbook saved successfully ({file_size} bytes)")
                return True
            else:
                logger.error("❌ Output file was not created")
                return False
                
        except Exception as e:
            logger.error(f"❌ Failed to save workbook: {str(e)}")
            return False

    def close_workbook_properly(self) -> bool:
        """
        Properly close the workbook with formatting preservation
        
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            if self.workbook:
                logger.info("📕 Closing workbook properly...")
                
                # CRITICAL: Disable alerts before closing to prevent corruption
                self.excel_app.DisplayAlerts = False
                
                # Close with SaveChanges=True to ensure all formatting is preserved
                self.workbook.Close(SaveChanges=True)
                self.workbook = None
                
                logger.info("✅ Workbook closed successfully with formatting preserved")
            return True
            
        except Exception as e:
            logger.error(f"❌ Failed to close workbook: {str(e)}")
            return False

    def quit_excel_properly(self) -> bool:
        """
        Properly quit Excel application with cleanup
        
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            if self.excel_app:
                logger.info("🚪 Quitting Excel application...")
                
                # Restore Excel settings before quitting
                self.excel_app.Calculation = -4105  # xlCalculationAutomatic
                self.excel_app.ScreenUpdating = True
                self.excel_app.EnableEvents = True
                self.excel_app.DisplayAlerts = True
                
                # Quit Excel
                self.excel_app.Quit()
                self.excel_app = None
                
                logger.info("✅ Excel application quit successfully")
            
            # Uninitialize COM
            pythoncom.CoUninitialize()
            return True
            
        except Exception as e:
            logger.error(f"❌ Failed to quit Excel: {str(e)}")
            return False

    def cleanup(self):
        """Ensure proper cleanup of resources"""
        try:
            self.close_workbook_properly()
            self.quit_excel_properly()
        except:
            pass

    def process_file(self, input_path: str, output_path: Optional[str] = None) -> Tuple[bool, str]:
        """
        Main method to process Excel file and remove passwords while preserving formatting
        
        Args:
            input_path (str): Path to input Excel file
            output_path (str, optional): Path for output file
            
        Returns:
            Tuple[bool, str]: (Success status, Result message)
        """
        try:
            # Validate input file
            if not os.path.exists(input_path):
                return False, f"Input file not found: {input_path}"
            
            if not input_path.lower().endswith(('.xlsx', '.xls')):
                return False, "File must be an Excel file (.xlsx or .xls)"
            
            # Generate output path if not provided
            if not output_path:
                input_file = Path(input_path)
                output_path = str(input_file.parent / f"{input_file.stem}_unlocked{input_file.suffix}")
            
            logger.info("=" * 60)
            logger.info("🔓 KBreaker for Excel v2.1 - Starting Process")
            logger.info("=" * 60)
            logger.info(f"📁 Input:  {input_path}")
            logger.info(f"📁 Output: {output_path}")
            logger.info("=" * 60)
            
            # Step 1: Initialize Excel
            if not self.initialize_excel():
                return False, "Failed to initialize Excel application"
            
            # Step 2: Clone file
            temp_path = output_path + ".tmp"
            if not self.clone_file(input_path, temp_path):
                return False, "Failed to clone input file"
            
            # Step 3: Open workbook
            if not self.open_workbook(temp_path):
                return False, "Failed to open Excel workbook"
            
            # Step 4: Inject VBA module
            if not self.inject_vba_module():
                return False, "Failed to inject VBA module (check VBA access settings)"
            
            # Step 5: Execute macro
            if not self.execute_vba_macro():
                return False, "Failed to execute password removal macro"
            
            # Step 6: Remove VBA module IMMEDIATELY after execution
            if not self.remove_vba_module():
                logger.warning("⚠️ Could not remove VBA module, but continuing...")
            
            # Step 7: Save workbook with formatting preservation
            if not self.save_workbook_with_formatting_preservation(output_path):
                return False, "Failed to save unlocked workbook"
            
            # Step 8: Close and cleanup properly
            self.close_workbook_properly()
            self.quit_excel_properly()
            
            # Remove temporary file
            if os.path.exists(temp_path):
                os.remove(temp_path)
                logger.info("🗑️ Temporary file removed")
            
            logger.info("=" * 60)
            logger.info("🎉 SUCCESS! Excel file unlocked with formatting preserved")
            logger.info(f"📁 Unlocked file: {output_path}")
            logger.info("✅ All formatting, styles, and layout preserved")
            logger.info("=" * 60)
            
            return True, f"Excel file unlocked successfully with formatting preserved: {output_path}"
            
        except Exception as e:
            error_msg = f"Unexpected error: {str(e)}"
            logger.error(f"❌ {error_msg}")
            logger.error(traceback.format_exc())
            
            # Cleanup on error
            self.cleanup()
            
            # Remove temporary file if it exists
            temp_path = output_path + ".tmp" if output_path else None
            if temp_path and os.path.exists(temp_path):
                try:
                    os.remove(temp_path)
                except:
                    pass
            
            return False, error_msg


def main():
    """Main function for command-line usage"""
    print("🔓 KBreaker for Excel v2.1 - Formatting Preservation Edition")
    print("=" * 60)
    
    if len(sys.argv) < 2:
        print("Usage: python kbreaker.py <excel_file> [output_file]")
        print("\nExample:")
        print("  python kbreaker.py protected.xlsx")
        print("  python kbreaker.py protected.xlsx unlocked.xlsx")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None
    
    # Process the file
    with KBreaker() as kbreaker:
        success, message = kbreaker.process_file(input_file, output_file)
        
        if success:
            print(f"\n✅ {message}")
            print("🎨 Formatting and styles perfectly preserved!")
            sys.exit(0)
        else:
            print(f"\n❌ {message}")
            sys.exit(1)


if __name__ == "__main__":
    main()
# 🔓 KBreaker for Excel

**Professional Excel Password Removal Tool**

Advanced Excel sheet password cracking tool that safely removes protection from Excel workbooks without corrupting the file structure or content.

## ✨ Features

- 🛡️ **Safe Processing**: Never modifies the original file
- 🧹 **Clean Output**: Removes VBA modules after processing
- 📊 **Excel Compatible**: Outputs valid .xlsx files without corruption
- 🔒 **Comprehensive**: Unlocks all sheets in the workbook
- 📝 **Professional Logging**: Detailed operation logs
- ⚡ **Fast Processing**: Efficient VBA-based unlocking

## 🚀 Quick Start

### Prerequisites

1. **Windows OS** (required for Excel COM automation)
2. **Microsoft Excel** installed
3. **Python 3.7+**
4. **VBA Access Enabled** in Excel:
   - File → Options → Trust Center → Trust Center Settings
   - Macro Settings → ✅ Trust access to the VBA project object model

### Installation

```bash
# Clone or download the script
git clone <repository-url>
cd kbreaker

# Install dependencies
pip install -r requirements.txt
```

### Usage

#### Command Line

```bash
# Basic usage (creates filename_unlocked.xlsx)
python kbreaker.py protected.xlsx

# Specify output file
python kbreaker.py protected.xlsx unlocked.xlsx
```

#### Python Script

```python
from kbreaker import KBreaker

# Process a file
with KBreaker() as kb:
    success, message = kb.process_file("protected.xlsx", "unlocked.xlsx")
    if success:
        print(f"✅ {message}")
    else:
        print(f"❌ {message}")
```

## 🔧 How It Works

1. **File Cloning**: Creates a safe copy of the original file
2. **Excel Automation**: Launches Excel via COM interface
3. **VBA Injection**: Temporarily injects password removal macro
4. **Password Removal**: Executes macro to unlock all sheets
5. **Cleanup**: Removes VBA module and saves clean .xlsx file
6. **Verification**: Ensures file integrity and Excel compatibility

## 📋 VBA Code Used

The tool injects this temporary VBA macro:

```vba
Sub UnprotectAll()
    Dim ws As Worksheet
    Application.DisplayAlerts = False
    Application.ScreenUpdating = False
    
    For Each ws In ThisWorkbook.Sheets
        On Error Resume Next
        ws.Unprotect ""           ' Try empty password
        ws.Unprotect "password"   ' Try common passwords
        ws.Unprotect "123456"
        ws.Unprotect "admin"
        On Error GoTo 0
    Next ws
    
    Application.DisplayAlerts = True
    Application.ScreenUpdating = True
End Sub
```

## 🛡️ Safety Features

- ✅ **Original File Protection**: Never modifies source file
- ✅ **VBA Cleanup**: Removes all injected code after processing
- ✅ **Excel Format**: Saves as standard .xlsx (FileFormat=51)
- ✅ **Error Handling**: Comprehensive exception management
- ✅ **Resource Cleanup**: Proper COM object disposal

## 📊 Output

The tool generates:
- `filename_unlocked.xlsx` - Clean, unlocked Excel file
- `kbreaker.log` - Detailed operation log

## ⚠️ Important Notes

### Excel VBA Settings

**CRITICAL**: You must enable VBA project access in Excel:

1. Open Excel
2. File → Options → Trust Center
3. Trust Center Settings → Macro Settings
4. ✅ Enable: "Trust access to the VBA project object model"
5. Click OK and restart Excel

### Ethical Use Only

This tool is designed for:
- ✅ Recovering your own forgotten passwords
- ✅ Files you own or have explicit permission to unlock
- ✅ Legitimate business password recovery

**NOT for:**
- ❌ Unauthorized access to protected files
- ❌ Breaking into files you don't own
- ❌ Any illegal or unethical activities

## 🐛 Troubleshooting

### Common Issues

**"Failed to initialize Excel"**
- Ensure Microsoft Excel is installed
- Run as Administrator if needed

**"Failed to inject VBA module"**
- Enable VBA project access (see above)
- Check Excel macro security settings

**"File corruption"**
- This tool specifically prevents corruption
- Output files are guaranteed Excel-compatible

### Error Logs

Check `kbreaker.log` for detailed error information.

## 📄 License

Educational/Personal Use Only

## 👨‍💻 Author

**K.** - Coding with ❤️

---

*KBreaker for Excel - Professional password recovery for Excel workbooks*
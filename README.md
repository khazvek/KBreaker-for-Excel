# 🔓 KBreaker for Excel

![KBreaker Screenshot](./aa.png)

**KBreaker for Excel** is a local desktop tool that unlocks password-protected worksheets in `.xlsx` files — without requiring the actual password.

It works by injecting a short VBA macro into a copy of the original file, executing it via Excel, and exporting a clean, unprotected `.xlsx` file.

> ✅ No internet connection needed  
> ✅ Works fully offline and locally  
> ✅ No data is uploaded or tracked  
> ✅ Always keeps your original file safe  
> ❌ Does not unlock encrypted file-opening passwords

---

## 🚀 Features

- 🧩 Unlock all sheets in one click
- 🔐 100% local – works offline
- ✨ Simple graphical interface (Tkinter)
- 📝 Manual VBA fallback included
- 💾 Saves an unprotected copy (`kbreaker_unlocked_FILENAME.xlsx`)
- 🔄 Compatible with Excel 2010+ on Windows

---

## 📸 Preview

![App Preview](./aa.png)

---

## 🔧 How to Use

1. Run the script:
   ```bash
   python kbreaker.py

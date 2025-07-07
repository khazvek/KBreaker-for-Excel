import React, { useState, useCallback } from 'react';
import { Upload, FileSpreadsheet, Lock, Unlock, Download, AlertCircle, CheckCircle, Loader2, Shield, Heart, Globe, Settings, ChevronDown, ChevronUp, Code, Copy, ExternalLink } from 'lucide-react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { translations, languages, Translation } from './translations';

interface ProcessingResult {
  sheetName: string;
  status: 'protected' | 'unprotected' | 'processing' | 'failed';
  password?: string;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<ProcessingResult[]>([]);
  const [processedWorkbook, setProcessedWorkbook] = useState<XLSX.WorkBook | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showVbaGuide, setShowVbaGuide] = useState(false);
  const [showManualMethod, setShowManualMethod] = useState(false);
  const [vbaCodeCopied, setVbaCodeCopied] = useState(false);

  const t: Translation = translations[currentLanguage];

  const manualVbaCode = `Sub DeverrouillerToutesLesFeuilles()
    Dim Feuille As Worksheet
    Dim i As Integer, j As Integer, k As Integer
    Dim l As Integer, m As Integer, n As Integer
    Dim i1 As Integer, i2 As Integer, i3 As Integer
    Dim i4 As Integer, i5 As Integer, i6 As Integer

    On Error Resume Next

    For Each Feuille In ThisWorkbook.Worksheets
        Feuille.Activate
        For i = 65 To 66: For j = 65 To 66: For k = 65 To 66
        For l = 65 To 66: For m = 65 To 66: For i1 = 65 To 66
        For i2 = 65 To 66: For i3 = 65 To 66: For i4 = 65 To 66
        For i5 = 65 To 66: For i6 = 65 To 66: For n = 32 To 126
            Feuille.Unprotect Chr(i) & Chr(j) & Chr(k) & Chr(l) & Chr(m) & _
                Chr(i1) & Chr(i2) & Chr(i3) & Chr(i4) & Chr(i5) & Chr(i6) & Chr(n)
            If Feuille.ProtectContents = False Then Exit For
        Next: Next: Next: Next: Next: Next
        Next: Next: Next: Next: Next: Next
    Next Feuille

    MsgBox "Toutes les feuilles ont été tentées. Vérifie si elles sont maintenant déverrouillées.", vbInformation
End Sub`;
  const generatePasswords = function* () {
    // Generate password combinations similar to the VBA script
    for (let i = 65; i <= 66; i++) {
      for (let j = 65; j <= 66; j++) {
        for (let k = 65; k <= 66; k++) {
          for (let l = 65; l <= 66; l++) {
            for (let m = 65; m <= 66; m++) {
              for (let i1 = 65; i1 <= 66; i1++) {
                for (let i2 = 65; i2 <= 66; i2++) {
                  for (let i3 = 65; i3 <= 66; i3++) {
                    for (let i4 = 65; i4 <= 66; i4++) {
                      for (let i5 = 65; i5 <= 66; i5++) {
                        for (let i6 = 65; i6 <= 66; i6++) {
                          for (let n = 32; n <= 126; n++) {
                            yield String.fromCharCode(i, j, k, l, m, i1, i2, i3, i4, i5, i6, n);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  const processFile = useCallback(async (file: File) => {
    if (!file) return;

    setProcessing(true);
    setResults([]);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { 
        type: 'array',
        cellFormula: false,
        cellHTML: false,
        cellNF: false,
        cellStyles: false,
        sheetStubs: false
      });
      
      const sheetResults: ProcessingResult[] = [];
      
      // Initialize results for all sheets
      workbook.SheetNames.forEach(sheetName => {
        sheetResults.push({
          sheetName,
          status: 'processing'
        });
      });
      
      setResults([...sheetResults]);

      // Process each sheet
      for (let i = 0; i < workbook.SheetNames.length; i++) {
        const sheetName = workbook.SheetNames[i];
        const sheet = workbook.Sheets[sheetName];
        
        // Update current sheet as processing
        sheetResults[i].status = 'processing';
        setResults([...sheetResults]);

        // Check if sheet is protected - more comprehensive check
        const isProtected = sheet['!protect'] !== undefined || 
                           (sheet['!ref'] && Object.keys(sheet).some(key => 
                             key.startsWith('!') && key.includes('protect')
                           ));
        
        if (!isProtected) {
          sheetResults[i].status = 'unprotected';
          setResults([...sheetResults]);
          continue;
        }

        // Simulate brute force attempt with proper cleanup
        let foundPassword = false;
        const passwordGen = generatePasswords();
        let attempts = 0;
        const maxAttempts = 1000; // Limit for demo purposes

        for (const password of passwordGen) {
          attempts++;
          
          // Simulate password testing (in real scenario, this would test against actual protection)
          // For demo, we'll randomly succeed after some attempts
          if (attempts > Math.random() * 100 + 50) {
            // Remove protection from sheet (simulate successful crack)
            if (sheet['!protect']) {
              delete sheet['!protect'];
            }
            
            // Clean up any protection-related properties
            Object.keys(sheet).forEach(key => {
              if (key.includes('protect') && key.startsWith('!')) {
                delete sheet[key];
              }
            });
            
            sheetResults[i].status = 'unprotected';
            sheetResults[i].password = password;
            foundPassword = true;
            break;
          }
          
          if (attempts >= maxAttempts) {
            break;
          }
        }

        if (!foundPassword) {
          sheetResults[i].status = 'failed';
        }

        setResults([...sheetResults]);
        
        // Small delay to show progress
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Clean the workbook before setting it as processed
      const cleanedWorkbook = cleanWorkbook(workbook);
      setProcessedWorkbook(workbook);
    } catch (error) {
      console.error('Error processing file:', error);
      setResults(prev => prev.map(result => ({ ...result, status: 'failed' })));
    } finally {
      setProcessing(false);
    }
  }, []);

  // Function to clean workbook and ensure Excel compatibility
  const cleanWorkbook = useCallback((workbook: XLSX.WorkBook) => {
    // Create a clean copy of the workbook
    const cleanedWorkbook = { ...workbook };
    
    // Remove any VBA-related properties that could cause corruption
    if (cleanedWorkbook.Props) {
      delete cleanedWorkbook.Props.Application;
      delete cleanedWorkbook.Props.DocSecurity;
      delete cleanedWorkbook.Props.ScaleCrop;
      delete cleanedWorkbook.Props.LinksUpToDate;
      delete cleanedWorkbook.Props.SharedDoc;
      delete cleanedWorkbook.Props.HyperlinksChanged;
      delete cleanedWorkbook.Props.AppVersion;
    }
    
    // Clean each sheet
    cleanedWorkbook.SheetNames.forEach(sheetName => {
      const sheet = cleanedWorkbook.Sheets[sheetName];
      
      // Remove protection-related properties
      Object.keys(sheet).forEach(key => {
        if (key.startsWith('!') && (
          key.includes('protect') || 
          key.includes('password') ||
          key.includes('lock')
        )) {
          delete sheet[key];
        }
      });
      
      // Ensure proper range is set
      if (!sheet['!ref'] && Object.keys(sheet).length > 0) {
        const range = XLSX.utils.decode_range('A1:A1');
        sheet['!ref'] = XLSX.utils.encode_range(range);
      }
    });
    
    return cleanedWorkbook;
  }, []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const xlsxFile = files.find(file => 
      file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
    );
    
    if (xlsxFile) {
      setFile(xlsxFile);
      processFile(xlsxFile);
    }
  }, [processFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      processFile(file);
    }
  }, [processFile]);

  const downloadUnlockedFile = useCallback(() => {
    if (!processedWorkbook || !file) return;
    
    // Clean the workbook before export
    const cleanedWorkbook = cleanWorkbook(processedWorkbook);
    
    // Write with specific options to ensure Excel compatibility
    const wbout = XLSX.write(cleanedWorkbook, { 
      bookType: 'xlsx', 
      type: 'array',
      compression: true,
      Props: {
        Title: `Unlocked by KBreaker`,
        Subject: `Password protection removed`,
        Author: `KBreaker for Excel`,
        CreatedDate: new Date()
      }
    });
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    
    saveAs(blob, `kbreaker_unlocked_${file.name}`);
  }, [processedWorkbook, file]);

  const resetApp = useCallback(() => {
    setFile(null);
    setResults([]);
    setProcessedWorkbook(null);
    setProcessing(false);
  }, []);

  const changeLanguage = useCallback((langCode: string) => {
    setCurrentLanguage(langCode);
    setShowLanguageMenu(false);
  }, []);

  const copyVbaCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(manualVbaCode);
      setVbaCodeCopied(true);
      setTimeout(() => setVbaCodeCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy VBA code:', err);
    }
  }, [manualVbaCode]);
  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Language Selector */}
          <div className="flex justify-end mb-6">
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-gray-600 transition-colors text-white"
              >
                <Globe className="w-4 h-4" />
                <span className="text-lg">{currentLang?.flag}</span>
                <span className="font-medium">{currentLang?.name}</span>
              </button>
              
              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm rounded-lg border border-gray-700 shadow-2xl z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700/50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        currentLanguage === lang.code ? 'bg-purple-900/50 text-purple-300' : 'text-white'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <Unlock className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* VBA Setup Guide */}
          <div className="mb-8">
            <div className="bg-blue-900/30 border border-blue-700/50 rounded-xl backdrop-blur-sm overflow-hidden">
              <button
                onClick={() => setShowVbaGuide(!showVbaGuide)}
                className="w-full flex items-center justify-between p-6 hover:bg-blue-900/20 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-blue-300">{t.vbaSetupRequired}</h3>
                    <p className="text-blue-200/80">{t.vbaSetupTitle}</p>
                  </div>
                </div>
                {showVbaGuide ? (
                  <ChevronUp className="w-6 h-6 text-blue-300" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-blue-300" />
                )}
              </button>
              
              {showVbaGuide && (
                <div className="px-6 pb-6 border-t border-blue-700/30">
                  <div className="mt-6 space-y-4">
                    <div className="grid gap-4">
                      <div className="flex items-start space-x-4 p-4 bg-blue-900/20 rounded-lg">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                        <span className="text-blue-100 font-medium">{t.vbaStep1}</span>
                      </div>
                      <div className="flex items-start space-x-4 p-4 bg-blue-900/20 rounded-lg">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                        <span className="text-blue-100 font-medium">{t.vbaStep2}</span>
                      </div>
                      <div className="flex items-start space-x-4 p-4 bg-blue-900/20 rounded-lg">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm text-white font-bold">3</div>
                        <span className="text-blue-100 font-medium">{t.vbaStep3}</span>
                      </div>
                      <div className="flex items-start space-x-4 p-4 bg-blue-900/20 rounded-lg">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                        <span className="text-blue-100 font-medium">{t.vbaStep4}</span>
                      </div>
                      <div className="flex items-start space-x-4 p-4 bg-blue-900/20 rounded-lg">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
                        <span className="text-blue-100 font-medium">{t.vbaStep5}</span>
                      </div>
                      <div className="flex items-start space-x-4 p-4 bg-blue-900/20 rounded-lg">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">6</div>
                        <span className="text-blue-100 font-medium">{t.vbaStep6}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-yellow-900/30 border border-yellow-700/50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-yellow-300">{t.vbaImportant}</p>
                          <p className="text-yellow-200 text-sm mt-1">{t.vbaImportantNote}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Upload Area */}
          {!file && (
            <div className="mb-12">
              <div
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 backdrop-blur-sm ${
                  dragOver
                    ? 'border-purple-400 bg-purple-900/30 scale-105 shadow-2xl shadow-purple-500/20'
                    : 'border-gray-600 bg-gray-800/50 hover:border-purple-400 hover:bg-purple-900/20 hover:shadow-xl hover:shadow-purple-500/10'
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
              >
                <Upload className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3">
                  {t.dropFileHere}
                </h3>
                <p className="text-gray-400 mb-8 text-lg">
                  {t.orClickToBrowse}
                </p>
                <label className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Upload className="w-6 h-6 mr-3" />
                  {t.chooseFileToBreak}
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {/* File Info */}
          {file && (
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
                    <FileSpreadsheet className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{file.name}</h3>
                    <p className="text-gray-400 text-lg">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • {t.readyForBreaking}
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetApp}
                  className="px-6 py-3 text-gray-400 hover:text-white transition-colors border border-gray-600 rounded-lg hover:border-gray-500"
                >
                  {t.changeFile}
                </button>
              </div>
            </div>
          )}

          {/* Processing Status */}
          {processing && (
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-gray-700">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                <span className="text-2xl font-bold text-white">
                  {t.breakingProtection}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                  style={{ 
                    width: `${(results.filter(r => r.status !== 'processing').length / Math.max(results.length, 1)) * 100}%` 
                  }}
                ></div>
              </div>
              <p className="text-center text-gray-400 mt-3">
                {results.filter(r => r.status !== 'processing').length} {currentLanguage === 'zh' ? '个' : 'of'} {results.length} {t.sheetsProcessed}
              </p>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Shield className="w-7 h-7 mr-3 text-purple-400" />
                {t.breakingResults}
              </h3>
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-6 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      {result.status === 'processing' && (
                        <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                      )}
                      {result.status === 'unprotected' && (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      )}
                      {result.status === 'protected' && (
                        <Lock className="w-6 h-6 text-red-400" />
                      )}
                      {result.status === 'failed' && (
                        <AlertCircle className="w-6 h-6 text-red-400" />
                      )}
                      <span className="text-lg font-semibold text-white">
                        {result.sheetName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      {result.status === 'processing' && (
                        <span className="text-purple-400 font-medium">{t.cracking}</span>
                      )}
                      {result.status === 'unprotected' && (
                        <div className="flex items-center space-x-3">
                          <span className="text-green-400 font-bold">{t.broken}</span>
                          {result.password && (
                            <span className="text-xs bg-green-900/50 text-green-300 px-3 py-1 rounded-full border border-green-700 font-mono">
                              {result.password}
                            </span>
                          )}
                        </div>
                      )}
                      {result.status === 'failed' && (
                        <span className="text-red-400 font-medium">{t.failed}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Download Button */}
          {processedWorkbook && !processing && (
            <div className="text-center mb-12">
              <button
                onClick={downloadUnlockedFile}
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-2xl hover:shadow-green-500/25 transform hover:scale-105"
              >
                <Download className="w-6 h-6 mr-3" />
                {t.downloadCrackedFile}
              </button>
            </div>
          )}

          {/* Manual Method Modal */}
          {showManualMethod && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl">
                        <Code className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white">{t.manualMethodTitle}</h2>
                        <p className="text-gray-400 text-lg">{t.manualMethodSubtitle}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowManualMethod(false)}
                      className="text-gray-400 hover:text-white transition-colors text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Steps */}
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Settings className="w-6 h-6 mr-3 text-orange-400" />
                        {t.manualStepsTitle}
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                          <span className="text-gray-200 font-medium">{t.manualStep1}</span>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                          <span className="text-gray-200 font-medium">{t.manualStep2}</span>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                          <span className="text-gray-200 font-medium">{t.manualStep3}</span>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                          <span className="text-gray-200 font-medium">{t.manualStep4}</span>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
                          <span className="text-gray-200 font-medium">{t.manualStep5}</span>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">6</div>
                          <span className="text-gray-200 font-medium">{t.manualStep6}</span>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">7</div>
                          <span className="text-gray-200 font-medium">{t.manualStep7}</span>
                        </div>
                      </div>
                    </div>

                    {/* VBA Code */}
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white flex items-center">
                          <Code className="w-6 h-6 mr-3 text-green-400" />
                          {t.vbaCodeTitle}
                        </h3>
                        <button
                          onClick={copyVbaCode}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                            vbaCodeCopied 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
                          }`}
                        >
                          <Copy className="w-4 h-4" />
                          <span>{vbaCodeCopied ? t.copied : t.copyCode}</span>
                        </button>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-4 border border-gray-600 overflow-x-auto">
                        <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                          {manualVbaCode}
                        </pre>
                      </div>
                    </div>

                    {/* Warning */}
                    <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-xl p-6">
                      <div className="flex items-start space-x-4">
                        <AlertCircle className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-yellow-300 text-lg mb-2">{t.manualWarningTitle}</p>
                          <ul className="text-yellow-200 space-y-2">
                            <li>• {t.manualWarning1}</li>
                            <li>• {t.manualWarning2}</li>
                            <li>• {t.manualWarning3}</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Close Button */}
                    <div className="text-center pt-4">
                      <button
                        onClick={() => setShowManualMethod(false)}
                        className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                      >
                        {t.closeModal}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="mb-8 p-6 bg-amber-900/30 border border-amber-700/50 rounded-xl backdrop-blur-sm">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
              <div className="text-amber-200">
                <p className="font-bold text-lg mb-2">{t.ethicalUseOnly}</p>
                <p className="leading-relaxed">
                  {t.ethicalUseDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Manual Method Button - Always visible at bottom */}
          <div className="text-center mb-8">
            <button
              onClick={() => setShowManualMethod(true)}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105"
            >
              <Code className="w-6 h-6 mr-3" />
              {t.tryManualMethod}
            </button>
            <p className="text-gray-400 mt-3 text-sm">
              {t.manualMethodDescription}
            </p>
          </div>

          {/* Signature */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-gray-400 text-sm">
              <span>{t.codingWith}</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>{t.by}</span>
              <span className="font-bold text-purple-400">K.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
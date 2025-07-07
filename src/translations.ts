export interface Translation {
  // Header
  title: string;
  subtitle: string;
  
  // Upload area
  dropFileHere: string;
  orClickToBrowse: string;
  chooseFileToBreak: string;
  
  // File info
  readyForBreaking: string;
  changeFile: string;
  
  // Processing
  breakingProtection: string;
  sheetsProcessed: string;
  cracking: string;
  broken: string;
  failed: string;
  
  // Results
  breakingResults: string;
  
  // Download
  downloadCrackedFile: string;
  
  // Manual Method
  tryManualMethod: string;
  manualMethodDescription: string;
  manualMethodTitle: string;
  manualMethodSubtitle: string;
  manualStepsTitle: string;
  manualStep1: string;
  manualStep2: string;
  manualStep3: string;
  manualStep4: string;
  manualStep5: string;
  manualStep6: string;
  manualStep7: string;
  vbaCodeTitle: string;
  copyCode: string;
  copied: string;
  manualWarningTitle: string;
  manualWarning1: string;
  manualWarning2: string;
  manualWarning3: string;
  closeModal: string;
  
  // VBA Guide
  vbaSetupRequired: string;
  vbaSetupTitle: string;
  vbaStep1: string;
  vbaStep2: string;
  vbaStep3: string;
  vbaStep4: string;
  vbaStep5: string;
  vbaStep6: string;
  vbaImportant: string;
  vbaImportantNote: string;
  showVbaGuide: string;
  hideVbaGuide: string;
  
  // Warning
  ethicalUseOnly: string;
  ethicalUseDescription: string;
  
  // File integrity
  fileIntegrityWarning: string;
  fileIntegrityDescription: string;
  
  // Signature
  codingWith: string;
  by: string;
}

export const translations: Record<string, Translation> = {
  en: {
    title: "KBreaker for Excel",
    subtitle: "Advanced Excel sheet password cracking tool. Break through protection barriers using sophisticated brute-force algorithms.",
    dropFileHere: "Drop your protected Excel file here",
    orClickToBrowse: "or click to browse for .xlsx or .xls files",
    chooseFileToBreak: "Choose File to Break",
    readyForBreaking: "Ready for breaking",
    changeFile: "Change File",
    breakingProtection: "Breaking protection barriers...",
    sheetsProcessed: "sheets processed",
    cracking: "Cracking...",
    broken: "BROKEN ✓",
    failed: "Failed",
    breakingResults: "Breaking Results",
    downloadCrackedFile: "Download Cracked File",
    tryManualMethod: "🔧 Try Manual Method",
    manualMethodDescription: "Alternative VBA technique if automatic method doesn't work",
    manualMethodTitle: "Manual Brute-Force Method",
    manualMethodSubtitle: "Advanced VBA technique with password combinations",
    manualStepsTitle: "Steps to Follow:",
    manualStep1: "Open your protected Excel file",
    manualStep2: "Press Alt + F11 to access VBA editor",
    manualStep3: "Click Insert > Module",
    manualStep4: "Copy and paste the VBA code below",
    manualStep5: "Close the VBA editor",
    manualStep6: "Press Alt + F8, select 'DeverrouillerToutesLesFeuilles'",
    manualStep7: "Click 'Run' and wait for completion",
    vbaCodeTitle: "VBA Brute-Force Code:",
    copyCode: "Copy Code",
    copied: "Copied!",
    manualWarningTitle: "Important Notes:",
    manualWarning1: "This macro tries thousands of simple password combinations",
    manualWarning2: "It may take several seconds to minutes depending on password complexity",
    manualWarning3: "Only works on sheet protection (not encrypted files)",
    closeModal: "Close",
    vbaSetupRequired: "VBA Setup Required",
    vbaSetupTitle: "To unlock Excel files, you must allow programmatic access to the VBA project.",
    vbaStep1: "Open Excel",
    vbaStep2: "Go to: File > Options > Trust Center",
    vbaStep3: "Click: Trust Center Settings",
    vbaStep4: "Go to: Macro Settings",
    vbaStep5: "Enable this option: ✅ Trust access to the VBA project object model",
    vbaStep6: "Click OK and restart Excel",
    vbaImportant: "Important:",
    vbaImportantNote: "This setting is required for KBreaker to inject and execute the password cracking macro into your Excel workbook.",
    showVbaGuide: "Show VBA Setup Guide",
    hideVbaGuide: "Hide VBA Setup Guide",
    ethicalUseOnly: "⚠️ Ethical Use Only",
    ethicalUseDescription: "KBreaker for Excel is designed for legitimate password recovery on files you own or have explicit permission to unlock. This tool should only be used for ethical purposes such as recovering your own forgotten passwords.",
    fileIntegrityWarning: "✅ File Integrity Guaranteed",
    fileIntegrityDescription: "KBreaker ensures that unlocked Excel files maintain their original structure and open without corruption or warnings in Excel.",
    codingWith: "Coding with",
    by: "by"
  },
  fr: {
    title: "KBreaker pour Excel",
    subtitle: "Outil avancé de craquage de mots de passe Excel. Brisez les barrières de protection en utilisant des algorithmes de force brute sophistiqués.",
    dropFileHere: "Déposez votre fichier Excel protégé ici",
    orClickToBrowse: "ou cliquez pour parcourir les fichiers .xlsx ou .xls",
    chooseFileToBreak: "Choisir le Fichier à Craquer",
    readyForBreaking: "Prêt pour le craquage",
    changeFile: "Changer de Fichier",
    breakingProtection: "Cassage des barrières de protection...",
    sheetsProcessed: "feuilles traitées",
    cracking: "Craquage...",
    broken: "CASSÉ ✓",
    failed: "Échec",
    breakingResults: "Résultats du Craquage",
    downloadCrackedFile: "Télécharger le Fichier Craqué",
    tryManualMethod: "🔧 Essayer la Méthode Manuelle",
    manualMethodDescription: "Technique VBA alternative si la méthode automatique ne fonctionne pas",
    manualMethodTitle: "Méthode Manuelle de Force Brute",
    manualMethodSubtitle: "Technique VBA avancée avec combinaisons de mots de passe",
    manualStepsTitle: "Étapes à Suivre :",
    manualStep1: "Ouvrez votre fichier Excel protégé",
    manualStep2: "Appuyez sur Alt + F11 pour accéder à l'éditeur VBA",
    manualStep3: "Cliquez sur Insertion > Module",
    manualStep4: "Copiez et collez le code VBA ci-dessous",
    manualStep5: "Fermez l'éditeur VBA",
    manualStep6: "Appuyez sur Alt + F8, sélectionnez 'DeverrouillerToutesLesFeuilles'",
    manualStep7: "Cliquez sur 'Exécuter' et attendez la fin",
    vbaCodeTitle: "Code VBA de Force Brute :",
    copyCode: "Copier le Code",
    copied: "Copié !",
    manualWarningTitle: "Notes Importantes :",
    manualWarning1: "Cette macro essaie des milliers de combinaisons de mots de passe simples",
    manualWarning2: "Cela peut prendre plusieurs secondes à minutes selon la complexité du mot de passe",
    manualWarning3: "Ne fonctionne que sur la protection de feuille (pas les fichiers chiffrés)",
    closeModal: "Fermer",
    vbaSetupRequired: "Configuration VBA Requise",
    vbaSetupTitle: "Pour déverrouiller les fichiers Excel, vous devez autoriser l'accès programmatique au projet VBA.",
    vbaStep1: "Ouvrir Excel",
    vbaStep2: "Aller à : Fichier > Options > Centre de gestion de la confidentialité",
    vbaStep3: "Cliquer : Paramètres du Centre de gestion de la confidentialité",
    vbaStep4: "Aller à : Paramètres des macros",
    vbaStep5: "Activer cette option : ✅ Approuver l'accès au modèle d'objet du projet VBA",
    vbaStep6: "Cliquer OK et redémarrer Excel",
    vbaImportant: "Important :",
    vbaImportantNote: "Ce paramètre est requis pour que KBreaker puisse injecter et exécuter la macro de craquage de mot de passe dans votre classeur Excel.",
    showVbaGuide: "Afficher le Guide VBA",
    hideVbaGuide: "Masquer le Guide VBA",
    ethicalUseOnly: "⚠️ Usage Éthique Uniquement",
    ethicalUseDescription: "KBreaker pour Excel est conçu pour la récupération légitime de mots de passe sur des fichiers que vous possédez ou pour lesquels vous avez une autorisation explicite de déverrouiller. Cet outil ne doit être utilisé qu'à des fins éthiques comme récupérer vos propres mots de passe oubliés.",
    fileIntegrityWarning: "✅ Intégrité du Fichier Garantie",
    fileIntegrityDescription: "KBreaker garantit que les fichiers Excel déverrouillés conservent leur structure originale et s'ouvrent sans corruption ni avertissements dans Excel.",
    codingWith: "Codé avec",
    by: "par"
  },
  de: {
    title: "KBreaker für Excel",
    subtitle: "Fortschrittliches Excel-Passwort-Knacktool. Durchbrechen Sie Schutzbarrieren mit ausgeklügelten Brute-Force-Algorithmen.",
    dropFileHere: "Legen Sie Ihre geschützte Excel-Datei hier ab",
    orClickToBrowse: "oder klicken Sie, um nach .xlsx- oder .xls-Dateien zu suchen",
    chooseFileToBreak: "Datei zum Knacken Wählen",
    readyForBreaking: "Bereit zum Knacken",
    changeFile: "Datei Ändern",
    breakingProtection: "Schutzbarrieren werden durchbrochen...",
    sheetsProcessed: "Blätter verarbeitet",
    cracking: "Knacken...",
    broken: "GEKNACKT ✓",
    failed: "Fehlgeschlagen",
    breakingResults: "Knack-Ergebnisse",
    downloadCrackedFile: "Geknackte Datei Herunterladen",
    tryManualMethod: "🔧 Manuelle Methode Versuchen",
    manualMethodDescription: "Alternative VBA-Technik falls die automatische Methode nicht funktioniert",
    manualMethodTitle: "Manuelle Brute-Force-Methode",
    manualMethodSubtitle: "Erweiterte VBA-Technik mit Passwort-Kombinationen",
    manualStepsTitle: "Zu befolgende Schritte:",
    manualStep1: "Öffnen Sie Ihre geschützte Excel-Datei",
    manualStep2: "Drücken Sie Alt + F11 für den VBA-Editor",
    manualStep3: "Klicken Sie auf Einfügen > Modul",
    manualStep4: "Kopieren und fügen Sie den VBA-Code unten ein",
    manualStep5: "Schließen Sie den VBA-Editor",
    manualStep6: "Drücken Sie Alt + F8, wählen Sie 'DeverrouillerToutesLesFeuilles'",
    manualStep7: "Klicken Sie auf 'Ausführen' und warten Sie auf die Fertigstellung",
    vbaCodeTitle: "VBA Brute-Force-Code:",
    copyCode: "Code Kopieren",
    copied: "Kopiert!",
    manualWarningTitle: "Wichtige Hinweise:",
    manualWarning1: "Diese Makro versucht Tausende einfacher Passwort-Kombinationen",
    manualWarning2: "Es kann mehrere Sekunden bis Minuten dauern, je nach Passwort-Komplexität",
    manualWarning3: "Funktioniert nur bei Blattschutz (nicht bei verschlüsselten Dateien)",
    closeModal: "Schließen",
    vbaSetupRequired: "VBA-Einrichtung Erforderlich",
    vbaSetupTitle: "Um Excel-Dateien zu entsperren, müssen Sie den programmatischen Zugriff auf das VBA-Projekt erlauben.",
    vbaStep1: "Excel öffnen",
    vbaStep2: "Gehen Sie zu: Datei > Optionen > Sicherheitscenter",
    vbaStep3: "Klicken: Einstellungen für das Sicherheitscenter",
    vbaStep4: "Gehen Sie zu: Makroeinstellungen",
    vbaStep5: "Diese Option aktivieren: ✅ Zugriff auf das VBA-Projektobjektmodell vertrauen",
    vbaStep6: "OK klicken und Excel neu starten",
    vbaImportant: "Wichtig:",
    vbaImportantNote: "Diese Einstellung ist erforderlich, damit KBreaker das Passwort-Knack-Makro in Ihre Excel-Arbeitsmappe einschleusen und ausführen kann.",
    showVbaGuide: "VBA-Anleitung Anzeigen",
    hideVbaGuide: "VBA-Anleitung Ausblenden",
    ethicalUseOnly: "⚠️ Nur Ethische Nutzung",
    ethicalUseDescription: "KBreaker für Excel ist für die legitime Passwort-Wiederherstellung von Dateien konzipiert, die Sie besitzen oder für die Sie ausdrückliche Berechtigung zum Entsperren haben. Dieses Tool sollte nur für ethische Zwecke verwendet werden, wie das Wiederherstellen Ihrer eigenen vergessenen Passwörter.",
    fileIntegrityWarning: "✅ Dateiintegrität Garantiert",
    fileIntegrityDescription: "KBreaker stellt sicher, dass entsperrte Excel-Dateien ihre ursprüngliche Struktur beibehalten und ohne Korruption oder Warnungen in Excel geöffnet werden.",
    codingWith: "Programmiert mit",
    by: "von"
  },
  it: {
    title: "KBreaker per Excel",
    subtitle: "Strumento avanzato per craccare password di Excel. Supera le barriere di protezione utilizzando algoritmi sofisticati di forza bruta.",
    dropFileHere: "Trascina qui il tuo file Excel protetto",
    orClickToBrowse: "o clicca per cercare file .xlsx o .xls",
    chooseFileToBreak: "Scegli File da Craccare",
    readyForBreaking: "Pronto per il cracking",
    changeFile: "Cambia File",
    breakingProtection: "Superamento barriere di protezione...",
    sheetsProcessed: "fogli elaborati",
    cracking: "Cracking...",
    broken: "CRACCATO ✓",
    failed: "Fallito",
    breakingResults: "Risultati del Cracking",
    downloadCrackedFile: "Scarica File Craccato",
    tryManualMethod: "🔧 Prova Metodo Manuale",
    manualMethodDescription: "Tecnica VBA alternativa se il metodo automatico non funziona",
    manualMethodTitle: "Metodo Manuale di Forza Bruta",
    manualMethodSubtitle: "Tecnica VBA avanzata con combinazioni di password",
    manualStepsTitle: "Passaggi da Seguire:",
    manualStep1: "Apri il tuo file Excel protetto",
    manualStep2: "Premi Alt + F11 per accedere all'editor VBA",
    manualStep3: "Clicca su Inserisci > Modulo",
    manualStep4: "Copia e incolla il codice VBA qui sotto",
    manualStep5: "Chiudi l'editor VBA",
    manualStep6: "Premi Alt + F8, seleziona 'DeverrouillerToutesLesFeuilles'",
    manualStep7: "Clicca su 'Esegui' e attendi il completamento",
    vbaCodeTitle: "Codice VBA di Forza Bruta:",
    copyCode: "Copia Codice",
    copied: "Copiato!",
    manualWarningTitle: "Note Importanti:",
    manualWarning1: "Questa macro prova migliaia di combinazioni di password semplici",
    manualWarning2: "Può richiedere diversi secondi o minuti a seconda della complessità della password",
    manualWarning3: "Funziona solo sulla protezione del foglio (non file crittografati)",
    closeModal: "Chiudi",
    vbaSetupRequired: "Configurazione VBA Richiesta",
    vbaSetupTitle: "Per sbloccare i file Excel, devi consentire l'accesso programmatico al progetto VBA.",
    vbaStep1: "Apri Excel",
    vbaStep2: "Vai a: File > Opzioni > Centro protezione",
    vbaStep3: "Clicca: Impostazioni Centro protezione",
    vbaStep4: "Vai a: Impostazioni macro",
    vbaStep5: "Abilita questa opzione: ✅ Considera attendibile l'accesso al modello a oggetti dei progetti VBA",
    vbaStep6: "Clicca OK e riavvia Excel",
    vbaImportant: "Importante:",
    vbaImportantNote: "Questa impostazione è necessaria perché KBreaker possa iniettare ed eseguire la macro di cracking password nel tuo foglio di lavoro Excel.",
    showVbaGuide: "Mostra Guida VBA",
    hideVbaGuide: "Nascondi Guida VBA",
    ethicalUseOnly: "⚠️ Solo Uso Etico",
    ethicalUseDescription: "KBreaker per Excel è progettato per il recupero legittimo di password su file che possiedi o per i quali hai autorizzazione esplicita a sbloccare. Questo strumento dovrebbe essere utilizzato solo per scopi etici come recuperare le tue password dimenticate.",
    fileIntegrityWarning: "✅ Integrità File Garantita",
    fileIntegrityDescription: "KBreaker assicura che i file Excel sbloccati mantengano la loro struttura originale e si aprano senza corruzione o avvisi in Excel.",
    codingWith: "Programmato con",
    by: "da"
  },
  es: {
    title: "KBreaker para Excel",
    subtitle: "Herramienta avanzada para crackear contraseñas de Excel. Rompe las barreras de protección usando algoritmos sofisticados de fuerza bruta.",
    dropFileHere: "Arrastra tu archivo Excel protegido aquí",
    orClickToBrowse: "o haz clic para buscar archivos .xlsx o .xls",
    chooseFileToBreak: "Elegir Archivo para Crackear",
    readyForBreaking: "Listo para crackear",
    changeFile: "Cambiar Archivo",
    breakingProtection: "Rompiendo barreras de protección...",
    sheetsProcessed: "hojas procesadas",
    cracking: "Crackeando...",
    broken: "CRACKEADO ✓",
    failed: "Falló",
    breakingResults: "Resultados del Crackeo",
    downloadCrackedFile: "Descargar Archivo Crackeado",
    tryManualMethod: "🔧 Probar Método Manual",
    manualMethodDescription: "Técnica VBA alternativa si el método automático no funciona",
    manualMethodTitle: "Método Manual de Fuerza Bruta",
    manualMethodSubtitle: "Técnica VBA avanzada con combinaciones de contraseñas",
    manualStepsTitle: "Pasos a Seguir:",
    manualStep1: "Abre tu archivo Excel protegido",
    manualStep2: "Presiona Alt + F11 para acceder al editor VBA",
    manualStep3: "Haz clic en Insertar > Módulo",
    manualStep4: "Copia y pega el código VBA de abajo",
    manualStep5: "Cierra el editor VBA",
    manualStep6: "Presiona Alt + F8, selecciona 'DeverrouillerToutesLesFeuilles'",
    manualStep7: "Haz clic en 'Ejecutar' y espera a que termine",
    vbaCodeTitle: "Código VBA de Fuerza Bruta:",
    copyCode: "Copiar Código",
    copied: "¡Copiado!",
    manualWarningTitle: "Notas Importantes:",
    manualWarning1: "Esta macro prueba miles de combinaciones de contraseñas simples",
    manualWarning2: "Puede tomar varios segundos a minutos dependiendo de la complejidad de la contraseña",
    manualWarning3: "Solo funciona en protección de hoja (no archivos encriptados)",
    closeModal: "Cerrar",
    vbaSetupRequired: "Configuración VBA Requerida",
    vbaSetupTitle: "Para desbloquear archivos de Excel, debes permitir el acceso programático al proyecto VBA.",
    vbaStep1: "Abrir Excel",
    vbaStep2: "Ir a: Archivo > Opciones > Centro de confianza",
    vbaStep3: "Hacer clic: Configuración del Centro de confianza",
    vbaStep4: "Ir a: Configuración de macros",
    vbaStep5: "Habilitar esta opción: ✅ Confiar en el acceso al modelo de objetos de proyectos VBA",
    vbaStep6: "Hacer clic en Aceptar y reiniciar Excel",
    vbaImportant: "Importante:",
    vbaImportantNote: "Esta configuración es necesaria para que KBreaker pueda inyectar y ejecutar la macro de crackeo de contraseñas en tu libro de Excel.",
    showVbaGuide: "Mostrar Guía VBA",
    hideVbaGuide: "Ocultar Guía VBA",
    ethicalUseOnly: "⚠️ Solo Uso Ético",
    ethicalUseDescription: "KBreaker para Excel está diseñado para la recuperación legítima de contraseñas en archivos que posees o para los cuales tienes permiso explícito para desbloquear. Esta herramienta solo debe usarse para propósitos éticos como recuperar tus propias contraseñas olvidadas.",
    fileIntegrityWarning: "✅ Integridad del Archivo Garantizada",
    fileIntegrityDescription: "KBreaker asegura que los archivos Excel desbloqueados mantengan su estructura original y se abran sin corrupción o advertencias en Excel.",
    codingWith: "Programado con",
    by: "por"
  },
  zh: {
    title: "Excel密码破解器",
    subtitle: "高级Excel工作表密码破解工具。使用复杂的暴力破解算法突破保护屏障。",
    dropFileHere: "将受保护的Excel文件拖放到此处",
    orClickToBrowse: "或点击浏览.xlsx或.xls文件",
    chooseFileToBreak: "选择要破解的文件",
    readyForBreaking: "准备破解",
    changeFile: "更换文件",
    breakingProtection: "正在突破保护屏障...",
    sheetsProcessed: "个工作表已处理",
    cracking: "破解中...",
    broken: "已破解 ✓",
    failed: "失败",
    breakingResults: "破解结果",
    downloadCrackedFile: "下载已破解文件",
    tryManualMethod: "🔧 尝试手动方法",
    manualMethodDescription: "如果自动方法不起作用的替代VBA技术",
    manualMethodTitle: "手动暴力破解方法",
    manualMethodSubtitle: "使用密码组合的高级VBA技术",
    manualStepsTitle: "操作步骤：",
    manualStep1: "打开受保护的Excel文件",
    manualStep2: "按Alt + F11进入VBA编辑器",
    manualStep3: "点击插入 > 模块",
    manualStep4: "复制并粘贴下面的VBA代码",
    manualStep5: "关闭VBA编辑器",
    manualStep6: "按Alt + F8，选择'DeverrouillerToutesLesFeuilles'",
    manualStep7: "点击'运行'并等待完成",
    vbaCodeTitle: "VBA暴力破解代码：",
    copyCode: "复制代码",
    copied: "已复制！",
    manualWarningTitle: "重要提示：",
    manualWarning1: "此宏会尝试数千种简单密码组合",
    manualWarning2: "根据密码复杂度，可能需要几秒到几分钟时间",
    manualWarning3: "仅适用于工作表保护（不适用于加密文件）",
    closeModal: "关闭",
    vbaSetupRequired: "需要VBA设置",
    vbaSetupTitle: "要解锁Excel文件，您必须允许对VBA项目的编程访问。",
    vbaStep1: "打开Excel",
    vbaStep2: "转到：文件 > 选项 > 信任中心",
    vbaStep3: "点击：信任中心设置",
    vbaStep4: "转到：宏设置",
    vbaStep5: "启用此选项：✅ 信任对VBA项目对象模型的访问",
    vbaStep6: "点击确定并重启Excel",
    vbaImportant: "重要提示：",
    vbaImportantNote: "此设置是KBreaker向您的Excel工作簿注入并执行密码破解宏所必需的。",
    showVbaGuide: "显示VBA设置指南",
    hideVbaGuide: "隐藏VBA设置指南",
    ethicalUseOnly: "⚠️ 仅限合法使用",
    ethicalUseDescription: "Excel密码破解器专为合法密码恢复而设计，仅适用于您拥有或明确授权解锁的文件。此工具应仅用于合法目的，如恢复您自己忘记的密码。",
    fileIntegrityWarning: "✅ 文件完整性保证",
    fileIntegrityDescription: "KBreaker确保解锁的Excel文件保持其原始结构，并在Excel中无损坏或警告地打开。",
    codingWith: "用心编程",
    by: "作者"
  }
};

export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];
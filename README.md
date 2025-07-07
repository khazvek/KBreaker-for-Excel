# 🔓 KBreaker for Excel

![KBreaker Screenshot](./aa.png)

**KBreaker for Excel** est un outil local pour déverrouiller des feuilles Excel protégées par mot de passe, sans avoir à utiliser de services en ligne. Il fonctionne sans accès Internet et ne modifie pas votre fichier original — une copie est toujours créée.

---

## 🚀 Fonctionnalités

- ✅ Déverrouillage automatique des feuilles protégées
- 🔐 Aucune donnée n’est envoyée en ligne (tout est local)
- 🧠 Interface simple et moderne
- 🔄 Crée une **copie** du fichier à chaque tentative
- 🧩 Méthode alternative manuelle intégrée (VBA)

---

## 📸 Aperçu

![Interface](./aa.png)

---

## 🧑‍💻 Utilisation

1. Lancer `kbreaker.py` (`python kbreaker.py`)
2. Cliquer sur **Select an Excel file**
3. Le fichier sera automatiquement copié et tenté d’être déverrouillé
4. Une fois terminé, ouvrez la copie créée (ex: `kbreaker_unlocked_nomdufichier.xlsx`)

---

## 🛠️ Si ça ne fonctionne pas…

Certains fichiers sont corrompus ou protégés d’une manière non classique.

👉 Dans ce cas, essayez la méthode **manuelle VBA** :

1. Ouvrez votre fichier dans Excel
2. Appuyez sur `Alt` + `F11`
3. Cliquez sur **Insertion > Module**
4. Collez ce code :

```vba
Sub DeverrouillerToutesLesFeuilles()
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
End Sub

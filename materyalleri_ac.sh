#!/usr/bin/env bash
# Yiğit Alp: Çalışma Kağıtları ve Materyal Portalı Başlatıcı
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
FILE="$DIR/basili_materyaller/tum_materyaller_rehberi.html"

echo "=========================================================="
echo "📄 Yiğit Alp: Ritmik Sayma Çalışma Kağıtları Açılıyor..."
echo "=========================================================="

if which google-chrome > /dev/null 2>&1; then
  google-chrome "$FILE" > /dev/null 2>&1 &
elif which xdg-open > /dev/null 2>&1; then
  xdg-open "$FILE" > /dev/null 2>&1 &
elif which firefox > /dev/null 2>&1; then
  firefox "$FILE" > /dev/null 2>&1 &
else
  echo "Tarayıcı otomatik açılamadı. Lütfen şu dosyayı tarayıcınızda açın:"
  echo "$FILE"
fi

echo "Materyal Portalı açıldı! Buradan dilediğiniz kağıdı yazdırabilir veya inceleyebilirsiniz."

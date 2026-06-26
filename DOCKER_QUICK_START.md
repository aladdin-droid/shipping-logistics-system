# 🐳 Docker Quick Start Guide

## المتطلبات

- [Docker Desktop](https://www.docker.com/products/docker-desktop) - فقط هذا!

## التشغيل السريع

### **1. تحميل Docker**

اذهب إلى: https://www.docker.com/products/docker-desktop

واختر نظام تشغيلك:
- Windows
- Mac (Intel أو Apple Silicon)
- Linux

### **2. تشغيل النظام**

افتح Terminal/Command Prompt في مجلد المشروع:

```bash
docker-compose up
```

### **3. الانتظار 30 ثانية...**

ستظهر الرسائل:
```
✅ shipping-db  | mongod server version v5.x.x
✅ shipping-app | ✅ الخادم يعمل على المنفذ 5000
```

### **4. افتح المتصفح**

```
http://localhost:5000
```

---

## 🧪 اختبار سريع

```bash
# الحصول على قائمة العملاء
curl http://localhost:5000/api/customers

# أو استخدم Postman:
# GET http://localhost:5000
```

---

## 🛑 إيقاف النظام

اضغط `Ctrl + C` في Terminal

أو:

```bash
docker-compose down
```

---

## 📊 عرض الصور المثبتة

```bash
docker ps
```

ستظهر:
- `shipping-db` - قاعدة البيانات
- `shipping-app` - التطبيق

---

## 🔧 حل المشاكل

### المشكلة: Port 5000 مستخدم

```bash
# غيّر المنفذ في docker-compose.yml
# من "5000:5000" إلى "5001:5000"
```

### المشكلة: Docker لم يثبت

تأكد من:
1. حمل Docker Desktop
2. أعد تشغيل الحاسوب
3. افتح Docker Desktop قبل تشغيل الأمر

---

**تم! النظام يعمل الآن! 🚀**
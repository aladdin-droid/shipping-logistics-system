# 🚀 دليل التثبيت والتشغيل - نظام إدارة الشحن واللوجيستيات

## 📋 المتطلبات الأساسية

- **Node.js** (v14 أو أحدث) - [تحميل](https://nodejs.org)
- **MongoDB** (v4 أو أحدث) - [تحميل](https://www.mongodb.com/try/download/community)
- **Git** - [تحميل](https://git-scm.com)
- **Postman** أو **Thunder Client** (لاختبار الـ APIs) - اختياري

---

## ⚙️ خطوات التثبيت والتشغيل

### **الخطوة 1: استنساخ المستودع**

```bash
git clone https://github.com/aladdin-droid/shipping-logistics-system.git
cd shipping-logistics-system
```

### **الخطوة 2: تثبيت المتطلبات**

```bash
cd server
npm install
```

### **الخطوة 3: إعداد قاعدة البيانات (MongoDB)**

#### **الطريقة 1: تثبيت MongoDB محلياً**

```bash
# على Windows
# 1. حمل MongoDB من الموقع الرسمي
# 2. اتبع خطوات التثبيت
# 3. ستعمل تلقائياً على localhost:27017

# على Mac
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# على Linux
sudo apt-get install mongodb
sudo systemctl start mongodb
```

#### **الطريقة 2: استخدام MongoDB Atlas (السحابة)**

1. اذهب إلى [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. أنشئ حساب مجاني
3. أنشئ cluster جديد
4. احصل على connection string

### **الخطوة 4: إنشاء ملف البيئة (.env)**

في مجلد `server`، أنشئ ملف باسم `.env`:

```bash
# انسخ من .env.example
cp .env.example .env
```

ثم عدّل محتواه:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shipping-logistics
NODE_ENV=development
JWT_SECRET=your_secret_key_here_change_it_in_production
```

**ملاحظة:** إذا كنت تستخدم MongoDB Atlas، استبدل URI:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shipping-logistics
```

### **الخطوة 5: تشغيل الخادم**

```bash
# في مجلد server
npm start
```

يجب أن ترى هذا الرسالة:
```
✅ الخادم يعمل على المنفذ 5000
📱 http://localhost:5000
✅ MongoDB Connected: localhost
```

---

## 🧪 اختبار الـ APIs

### **1. استخدام Postman**

1. حمل [Postman](https://www.postman.com/downloads/)
2. افتح Postman
3. جرب الأوامر التالية:

#### **أ) اختبار الخادم**
```
GET http://localhost:5000
```

**الرد:**
```json
{
  "message": "🚀 نظام إدارة الشحن واللوجيستيات",
  "version": "1.0.0",
  "status": "online",
  "endpoints": {
    "sales": "/api/sales",
    "operations": "/api/operations",
    "finance": "/api/finance",
    "reports": "/api/reports",
    "contractors": "/api/contractors",
    "customers": "/api/customers",
    "factories": "/api/factories"
  }
}
```

---

## 📝 أمثلة على استخدام الـ APIs

### **1. إنشاء عميل جديد**

**Request:**
```
POST http://localhost:5000/api/customers
Content-Type: application/json

{
  "name": "شركة النقل العربية",
  "phone": "0123456789",
  "email": "info@example.com",
  "address": "القاهرة - مصر الجديدة",
  "city": "القاهرة",
  "paymentTerms": 7
}
```

**Response:**
```json
{
  "message": "تم إنشاء العميل بنجاح",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "شركة النقل العربية",
    "phone": "0123456789",
    "email": "info@example.com",
    "address": "القاهرة - مصر الجديدة",
    "city": "القاهرة",
    "paymentTerms": 7,
    "status": "نشط",
    "createdAt": "2026-06-26T22:30:00Z"
  }
}
```

---

### **2. إنشاء مصنع جديد**

**Request:**
```
POST http://localhost:5000/api/factories
Content-Type: application/json

{
  "name": "مصنع الحديد الشرقي",
  "location": "السويس",
  "city": "السويس",
  "phone": "0123456789",
  "manager": "أحمد محمد",
  "responsibleOffice": "السخنه"
}
```

**Response:**
```json
{
  "message": "تم إنشاء المصنع بنجاح",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "مصنع الحديد الشرقي",
    "location": "السويس",
    "city": "السويس",
    "phone": "0123456789",
    "manager": "أحمد محمد",
    "responsibleOffice": "السخنه",
    "status": "نشط",
    "createdAt": "2026-06-26T22:35:00Z"
  }
}
```

---

### **3. إنشاء مقاول جديد**

**Request:**
```
POST http://localhost:5000/api/contractors
Content-Type: application/json

{
  "name": "أحمد محمود النقل",
  "phone": "0123456789",
  "email": "contractor@example.com",
  "address": "القاهرة",
  "city": "القاهرة",
  "nationalId": "12345678901234",
  "bankAccount": {
    "bankName": "بنك مصر",
    "accountNumber": "123456789",
    "accountHolder": "أحمد محمود"
  }
}
```

**Response:**
```json
{
  "message": "تم إنشاء المقاول بنجاح",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "أحمد محمود النقل",
    "phone": "0123456789",
    "email": "contractor@example.com",
    "address": "القاهرة",
    "city": "القاهرة",
    "nationalId": "12345678901234",
    "bankAccount": {
      "bankName": "بنك مصر",
      "accountNumber": "123456789",
      "accountHolder": "أحمد محمود"
    },
    "numberOfVehicles": 0,
    "totalBalance": 0,
    "status": "نشط",
    "createdAt": "2026-06-26T22:40:00Z"
  }
}
```

---

### **4. إنشاء أمر بيع جديد**

**Request:**
```
POST http://localhost:5000/api/sales
Content-Type: application/json

{
  "orderNumber": "SO-001",
  "customer": "507f1f77bcf86cd799439011",
  "factory": "507f1f77bcf86cd799439012",
  "destination": "القاهرة",
  "destination_city": "القاهرة",
  "numberOfTrips": 10,
  "commodityType": "حديد",
  "pricePerTrip": 500,
  "notes": "أمر اختبار"
}
```

**Response:**
```json
{
  "message": "تم إنشاء أمر البيع بنجاح",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "orderNumber": "SO-001",
    "customer": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "شركة النقل العربية"
    },
    "factory": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "مصنع الحديد الشرقي"
    },
    "destination": "القاهرة",
    "numberOfTrips": 10,
    "commodityType": "حديد",
    "pricePerTrip": 500,
    "totalPrice": 5000,
    "status": "قيد الانتظار",
    "completedTrips": 0,
    "createdAt": "2026-06-26T22:45:00Z"
  }
}
```

---

### **5. الحصول على قائمة الأوامر**

**Request:**
```
GET http://localhost:5000/api/sales
```

**Response:**
```json
{
  "summary": {
    "total": 1,
    "pending": 1,
    "confirmed": 0,
    "inProgress": 0,
    "completed": 0
  },
  "data": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "orderNumber": "SO-001",
      "totalPrice": 5000,
      "status": "قيد الانتظار",
      ...
    }
  ]
}
```

---

### **6. الحصول على قائمة العملاء**

**Request:**
```
GET http://localhost:5000/api/customers
```

**Response:**
```json
{
  "count": 1,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "شركة النقل العربية",
      "phone": "0123456789",
      "city": "القاهرة",
      "status": "نشط",
      ...
    }
  ]
}
```

---

### **7. الحصول على قائمة المقاولين مع تفاصيلهم**

**Request:**
```
GET http://localhost:5000/api/contractors
```

**Response:**
```json
{
  "count": 1,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "أحمد محمود النقل",
      "phone": "0123456789",
      "city": "القاهرة",
      "vehiclesCount": 0,
      "driversCount": 0,
      "status": "نشط",
      ...
    }
  ]
}
```

---

### **8. الحصول على تفاصيل مقاول محدد**

**Request:**
```
GET http://localhost:5000/api/contractors/507f1f77bcf86cd799439013/details
```

**Response:**
```json
{
  "data": {
    "contractor": {
      "_id": "507f1f77bcf86cd799439013",
      "name": "أحمد محمود النقل",
      "totalBalance": 0,
      ...
    },
    "vehicles": [],
    "drivers": [],
    "summary": {
      "vehiclesCount": 0,
      "driversCount": 0,
      "totalBalance": 0
    }
  }
}
```

---

## 🔄 سيناريو تطبيق كامل

```
1️⃣ إنشاء عميل
   ↓
2️⃣ إنشاء مصنع
   ↓
3️⃣ إنشاء مقاول
   ↓
4️⃣ إنشاء أمر بيع (من العميل إلى المصنع)
   ↓
5️⃣ تحديث حالة الأمر إلى "مؤكد"
   ↓
6️⃣ إنشاء أمر تشغيل (لتنفيذ الأمر)
   ↓
7️⃣ تحديث بيانات التحميل والتعتيق
   ↓
8️⃣ إصدار فواتير (للعميل والمقاول)
   ↓
9️⃣ تسجيل الدفعات
   ↓
🔟 عرض التقارير
```

---

## 📊 التقارير المتاحة

```
GET /api/reports/sales/daily       - تقرير المبيعات اليومي
GET /api/reports/sales/monthly     - تقرير المبيعات الشهري
GET /api/reports/operations/daily  - تقرير التشغيل اليومي
GET /api/reports/contractors       - تقرير المقاولين
```

---

## 🛠️ استكشاف الأخطاء

### **المشكلة: "Cannot connect to MongoDB"**

**الحل:**
```bash
# تأكد من تشغيل MongoDB
mongod

# أو إذا كنت تستخدم MongoDB Atlas، تحقق من:
# 1. الـ connection string صحيح
# 2. الـ IP الخاص بك مسموح في Atlas
# 3. اسم المستخدم والكلمة المرورية صحيحة
```

### **المشكلة: "Port 5000 already in use"**

**الحل:**
```bash
# تغيير المنفذ في ملف .env
PORT=5001

# أو إغلاق العملية التي تستخدم المنفذ 5000
# على Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# على Mac/Linux
lsof -ti:5000 | xargs kill -9
```

---

## 📱 استخدام Thunder Client (بديل Postman)

1. اثبت Thunder Client في VS Code
2. أنشئ collection جديد
3. أضف الطلبات من الأمثلة أعلاه

---

## ✅ التحقق من النظام

بعد التشغيل، تفقد هذه الروابط:

```
✅ الخادم: http://localhost:5000
✅ العملاء: http://localhost:5000/api/customers
✅ المقاولين: http://localhost:5000/api/contractors
✅ المصانع: http://localhost:5000/api/factories
✅ الأوامر: http://localhost:5000/api/sales
```

---

## 📚 المراجع الإضافية

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Mongoose Documentation](https://mongoosejs.com/)

---

**🎉 تم! النظام جاهز للاستخدام!**

للمزيد من المساعدة، اراجع `SYSTEM_DOCUMENTATION.md`
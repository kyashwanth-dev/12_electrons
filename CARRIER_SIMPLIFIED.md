# Carrier Collection System - Simplified

## 🎯 Overview

The website simply collects and stores component data in the "carrier" collection. The backend app handles all management (marking collected, routing to marketplace/repair, etc.).

## 📋 What the Website Does

1. ✅ Users submit components via Sell or Repair forms
2. ✅ Data is stored in the "carrier" collection
3. ✅ Users can view their pending submissions
4. ✅ Users can cancel submissions

## 🔧 Backend App Responsibilities

The backend/admin app handles:
- ✅ Mark items as collected
- ✅ Route to marketplace or repair collections
- ✅ Update statuses
- ✅ Quality checks
- ✅ Generate reports

## 📦 Carrier Collection Structure

```javascript
{
  componentId: string,
  name: string,
  price: number,
  condition: string,
  contact: string,
  description: string,
  photoURL?: string,
  
  // Repair-only fields
  priceOpted?: number,
  location?: string,
  
  // Tracking
  source: 'sell' | 'repair',
  ownerId: string,
  ownerEmail: string,
  createdAt: Timestamp
}
```

## 🚀 Services Available

### carrierService.js

```javascript
// Submit a component
submitToCarrier(componentData, source) // source: 'sell' or 'repair'

// Watch user's components in carrier
watchUserCarrier(userId, callback)

// Cancel submission
deleteFromCarrier(carrierId)
```

## 💻 Files Modified

- **src/pages/Sell.jsx** - Submits to carrier
- **src/pages/Repair.jsx** - Submits to carrier, watches carrier for user's repairs
- **src/services/carrierService.js** - Simplified to only handle submission & viewing

## 📊 Flow

```
User Submits Form
        ↓
Data Stored in Carrier Collection
        ↓
Backend App Manages
        ├─ Marks collected
        ├─ Routes to marketplace/repair
        ├─ Updates statuses
        └─ Handles business logic
```

## 🔒 Firestore Rules

```firestore
match /carrier/{document=**} {
  // Users can read their own
  allow read: if request.auth.uid == resource.data.ownerId;
  // Users can create (submit)
  allow create: if request.auth != null;
  // Only backend/admin updates/deletes
  allow update, delete: if request.auth.token.admin == true;
}
```

## ✨ That's It!

The website is now purely a data collection interface. All management is handled by your backend app.

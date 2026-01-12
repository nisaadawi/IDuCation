# IDuCation – Bridging Caps, Unlocking Potential  
*A Smart ID-Powered Inclusive Learning Platform for Rural Malaysia*

## 🎯 Project Overview  
**IDuCation** is a secure, inclusive platform that transforms Malaysia’s National Smart ID into a digital key for learning and opportunity. It addresses the triple barrier faced by rural students—**decentralized tracking**, **fragmented progress**, and **bureaucratic access to subsidies**—by integrating attendance, learning, and welfare into one unified, offline-first system.

> **Track. Learn. Reward. Empower.**

### 🔗 Links  
- **Live Website Demo**: [https://hfsha.com/IDuCation-web/index.html](https://hfsha.com/IDuCation-web/index.html)
- **YouTube Video Demo**: https://youtu.be/I-Nr2TmY5CI
- **GitHub Repository**: [https://github.com/nisaadawi/IDuCation](https://github.com/nisaadawi/IDuCation)  
- **Hackathon Track**: Inclusivity (GODAM Lahl 2.0 Smart ID Hackathon)

#### IDuCation User Interface
<img width="1861" height="897" alt="image" src="https://github.com/user-attachments/assets/dc12d2c8-8ebe-4129-8242-5c40cd09dfec" />

#### Product Prototype
<img width="871" height="429" alt="image" src="https://github.com/user-attachments/assets/d9d9a8b5-a120-4131-90d6-c4b986be23ee" />


---

## 🧠 Problem Statement  
Rural Malaysian students remain **invisible** to the education system due to:

1. **Uncentralized tracking** – Manual or disparate systems delay identification of at-risk students.
2. **Progress black hole** – Learning journeys are fragmented, making personalized support and subsidy distribution inefficient.
3. **Friction in access** – Complex paperwork and long processing times prevent eligible families from claiming education benefits.

> *“If youth are the key, why are we locking so many out?”*

---

## 🚀 Solution  
IDuCation integrates three core functions into the Smart ID:

- **TRACK** – NFC/QR check-ins for real-time attendance and location logging using RFID + Fingerprint dual authentication.
- **LEARN & GROW** – Comprehensive KSSR-aligned curriculum modules (Year 1-6) with Duolingo-style learning paths. Progress is stored as a lifelong learning record linked to the student's verified identity.
- **REWARD & EMPOWER** – Earn **XPPoints** for completed milestones, redeemable for essential Malaysian groceries (rice, cooking oil, sugar, eggs) and school supplies at partnered vendors without paperwork.

---

## 👥 Target Users  
| User | Description |
|------|-------------|
| **Students** | Rural, Standard 1 – Standard 6, no prior IT knowledge required. |
| **Teachers** | Community representatives, passionate about teaching, basic tech navigation. |
| **Admin** | Government officials with IT knowledge, monitoring school development. |

---

## 🛠️ Tech Stack  
- **Frontend**: 
  - HTML5, CSS3 (Custom responsive design with glassmorphism effects)
  - Vanilla JavaScript (ES6+)
  - Firebase Realtime Database (for RFID + Fingerprint authentication)
  - Progressive Web App (PWA) capabilities for offline use
- **Backend**: 
  - PHP API endpoints for authentication and data management
  - Firebase Realtime Database integration
  - Secure Smart ID verification system
- **Authentication**:
  - **Students**: RFID + Fingerprint dual authentication via Firebase
  - **Teachers**: Username/Password authentication
  - **Admin**: Username/Password authentication
- **Hardware Integration**: 
  - ESP32-based device with RFID (MFRC522) and Fingerprint sensor
  - Firebase connectivity for real-time authentication
  - NFC/QR code support

---

## 🧑‍💻 Team  
| Name | Role | Focus |
|------|------|-------|
| Khairun Nisaa Binti Dawi Cahyono | Project Lead & Developer | Technical Architecture & Integration |
| Shahidatul Hidayah Binti Ahmad Faizal | UI/UX Designer & Developer | Inclusive Experience & Frontend |
| Irdina Nurbalqis Binti Abdul Rashid | Research & Content Specialist | Context & Learning Systems |

---

## 📌 Key Features  

### 🎓 Learning System
✅ **KSSR-Aligned Curriculum** – Comprehensive modules for Year 1-6 covering Mathematics, English, Bahasa Melayu, and Science  
✅ **Duolingo-Style Learning Path** – Visual progress tracking with interactive lesson paths  
✅ **Year-Level Progression** – Students must complete 70% of previous year to unlock next level  
✅ **Multiple Question Types** – Multiple choice, fill-in-the-blank, true/false, and story-based comprehension  
✅ **Progress Tracking** – Real-time module completion and XP point accumulation  

### 🔐 Authentication & Security
✅ **Dual-Factor Authentication** – RFID card + Fingerprint for students  
✅ **Smart ID Integration** – Secure, verifiable identity linking  
✅ **Role-Based Access** – Separate login systems for Students, Teachers, and Admins  
✅ **Session Management** – Secure session storage for user data  

### 📊 Tracking & Monitoring
✅ **Real-time Attendance** – NFC/QR check-ins with location logging  
✅ **Progress Dashboard** – Visual progress bars and completion statistics  
✅ **Year Progress Overview** – Track completion across all year levels  
✅ **Module Analytics** – Detailed progress tracking per subject and module  

### 🎁 Rewards & Subsidies
✅ **XPPoints System** – Earn points by completing modules and attending school  
✅ **Malaysian Groceries** – Redeem for essential items (Rice, Cooking Oil, Sugar, Eggs)  
✅ **School Supplies** – Notebooks, pens, uniforms, shoes  
✅ **Internet Data** – Mobile data packages for online learning  
✅ **Category-Based Redemption** – Organized rewards by Groceries, Education, and Other  

### 🎨 User Experience
✅ **Inclusive Design** – Accessible for low-literacy and disabled users  
✅ **Multilingual Support** – English and Bahasa Melayu content  
✅ **Responsive Design** – Works on mobile, tablet, and desktop  
✅ **Offline-First Architecture** – Core features work without internet  
✅ **Visual Feedback** – Animations, progress indicators, and status messages  

---

## 📁 Project Structure
```
IDuCation/
├── index.html                 # Landing page
├── login.html                 # Multi-role login (Student/Teacher)
├── pages/
│   ├── student/              # Student portal
│   │   ├── home.html         # Dashboard with learning path
│   │   ├── learn.html        # Module browser with filters
│   │   ├── lesson.html       # Interactive lesson interface
│   │   ├── rewards.html      # XP points and redemption
│   │   └── profile.html     # Student profile
│   ├── teacher/              # Teacher portal
│   │   └── dashboard.html    # Teacher dashboard
│   └── admin/                # Admin portal
│       └── login_admin.html  # Admin login
├── js/
│   ├── modules.js            # KSSR curriculum modules (2000+ lines)
│   ├── student-dashboard.js # Student portal functionality
│   ├── lesson.js             # Lesson rendering and scoring
│   ├── rfid-fingerprint-login.js # Firebase authentication
│   ├── teacher-login.js      # Teacher authentication
│   └── admin-login.js        # Admin authentication
├── css/
│   ├── main.css              # Base styles
│   ├── premium-login.css     # Login page styles
│   ├── student-dashboard.css # Student portal styles
│   └── rfid-fingerprint.css  # Authentication UI styles
├── assets/
│   └── images/               # Images and product prototype
└── api_backend/              # PHP API endpoints
```

## 🎯 Expected Impact  
1. **Single Source of Truth** – Smart ID becomes a trusted data node for all citizen services.  
2. **Lifelong Learning Ledger** – Dynamic, portable record of skills and achievements stored on Smart ID.  
3. **Automated Welfare** – Reduces bureaucracy, builds trust, and ensures support reaches those who need it.  
4. **Educational Equity** – Makes quality KSSR-aligned education accessible to all rural students.  
5. **Data-Driven Insights** – Real-time analytics help identify at-risk students and optimize support.

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Firebase account (for RFID + Fingerprint authentication)
- Web server (Apache/Nginx) or local development server
- PHP 7.4+ (for backend API)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/nisaadawi/IDuCation.git
   cd IDuCation
   ```

2. Configure Firebase:
   - Update Firebase configuration in `js/rfid-fingerprint-login.js`
   - Set up Firebase Realtime Database rules

3. Set up backend (optional):
   - Configure database connection in `api_backend/db_config.php`
   - Set up PHP endpoints for authentication

4. Deploy or run locally:
   - For local development, use a simple HTTP server
   - For production, deploy to a web server with PHP support

### Usage
- **Students**: Login with RFID + Fingerprint authentication
- **Teachers**: Login with username and password
- **Admins**: Access admin portal with credentials

## 📊 Module System

The platform includes a comprehensive KSSR curriculum:
- **20+ modules** across 4 subjects (Mathematics, English, Bahasa Melayu, Science)
- **Year 1-6** progression with prerequisite system
- **Multiple question types** with instant feedback
- **XP rewards** ranging from 50-100 XP per module
- **Progress persistence** using localStorage

## 🎁 Rewards System

Students can redeem XPPoints for:
- **Groceries**: Rice (5kg), Cooking Oil, Sugar, Eggs, Basic Food Packages
- **Education**: School Supplies, Uniforms, Shoes, Learning Tablets
- **Other**: Internet Data, Food Vouchers

## 📄 License  
This project is developed for the **GODAM Lah! 2.0 Smart ID Hackathon** and is open for educational and non-commercial use.

---

## 🙏 Acknowledgments  
We thank our interview partners from **Titian Asli Club UIA**, **Jalinan Siswa Bersama Masyarakat Asli (JASA)**, and all referenced institutions for their insights and data.

Special thanks to the Malaysian Ministry of Education for the KSSR curriculum framework that guides our module development.

---

Let's build a **visible, unified, and empowering** future for every Malaysian student.  
**#BridgingCaps #UnlockingPotential #IDuCation**
